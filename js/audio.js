function getAudio() {
    return document.getElementById("audio");
}

// Events

getAudio().onplay = function () {
    console.log("Play");    
}
getAudio().onpause = function () {
    console.log("Pause");    
}
getAudio().onvolumechange = function () {
    console.log("Volume alterado");    
}