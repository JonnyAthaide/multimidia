function getVideo() {
    return document.getElementById("video");
}

function play() {
    var video = getVideo();
    video.play();
}

function pause() {
    var video = getVideo();
    video.pause();
}

function stop() {
    var video = getVideo();

    // Método 1
    // video.pause();
    // video.currentTime = 0;

    var objVideo = getStorage("video");
    objVideo.desc.push("video Parado");
    objVideo.time.push(getVideo().currentTime);
    objVideo.volume.push(getVideo().volume);
    setStorage("video", objVideo);

    video.load();
    video.pause(); // para evitar o autoplay

}

function volume() {
    var video       = getVideo();
    var volume      = document.getElementById("volume").value;
    volume          = parseFloat(volume/100);
    video.volume    = volume;
}

function muted() {
    var video   = getVideo();
    var mute    = document.getElementById('muted');
    if(video.muted){
        video.muted                 = false;
        mute.style.textDecoration   = "none";
    }else{
        video.muted                 = true;
        mute.style.textDecoration   = "line-through";
        mute.style.backgroundColor  = "red";
        mute.style.color            = "white";
    }
}

function full() {
    var video   = getVideo();
    video.webkitEnterFullScreen();
}


// EVENTS

function objVideo(msg){
    var objVideo = getStorage("video");
    objVideo.desc.push(msg);
    objVideo.time.push(getVideo().currentTime);
    objVideo.volume.push(getVideo().volume);
    setStorage("video", objVideo);
}


getVideo().oncanplay = function () {
    var list = getStorage("listVideo");
    setTable(list);
}

getVideo().onplay = function () {
    console.log("video iniciado");
    if(getVideo().currentTime === 0){
        var list = {desc:["video iniciado"], time:[0], volume:[getVideo().volume]};
        setStorage("video", list);
    }else{
        var objVideo = getStorage("video");
        objVideo.desc.push("video iniciado");
        objVideo.time.push(getVideo().currentTime);
        objVideo.volume.push(getVideo().volume);
        setStorage("video", objVideo);
    }
}

getVideo().onpause = function () {
    console.log("video pausado");
    var objVideo = getStorage("video");
    objVideo.desc.push("video pausado");
    objVideo.time.push(getVideo().currentTime);
    objVideo.volume.push(getVideo().volume);
    setStorage("video", objVideo);
}

getVideo().onabort = function () {
    console.log("video Parado");
    var objVideo = getStorage("video");    
    setStorage("video", {});

    var listVideo = getStorage("listVideo");
    if (!listVideo.length) {
        listVideo = [];
    }
    listVideo.push(objVideo);
    setStorage("listVideo", listVideo);
}

getVideo().onvolumechange = function () {
    console.log("Volume alterado");
    var objVideo = getStorage("video");
    objVideo.desc.push("Volume alterado");
    objVideo.time.push(getVideo().currentTime);
    objVideo.volume.push(getVideo().volume);
    setStorage("video", objVideo);
}


// localStorage
function setStorage(id, list) {
    localStorage.setItem(id,JSON.stringify(list));
}

function getStorage(id) {
    var storage = localStorage.getItem(id);
    if(storage){
        return JSON.parse(storage);
    }else{
        return {};
    }
}


// SetTable
function setTable(list) {
    var table = '<thead><tr><td>...</td><td>Desc</td><td>Time</td><td>Volume</td></tr></thead><tbody>';
    for( var k in list ){
        table += '<tr><td>'+k+'</td>';
        
        var desc = '';
        var time = '';
        var volume = '';
        for( var j in list[k].desc ){
            desc += '<p>'+ list[k].desc[j] +'</p>';
            time += '<p>'+ formatTime(list[k].time[j])  +'</p>';
            volume += '<p>'+ list[k].volume[j] +'</p>';
        }
        table += '<td>'+desc+'</td>';
        table += '<td>'+time+'</td>';
        table += '<td>'+volume+'</td>';

        table += '</tr></tbody>';

        document.getElementById("tableList").innerHTML = table;
    }
}

// Format

function formatTime(time) {
    var second = parseInt(time % 60);
    var minAux = time / 60;
    var minute = parseInt(minAux % 60);
    var hour = parseInt(minAux / 60);

    if (second < 10) {
        second = "0"+second;
    }
    if (minute < 10) {
        minute = "0"+minute;
    }
    if (hour < 10) {
        hour = "0"+hour;
    }

    return hour+':'+minute+':'+second;
}