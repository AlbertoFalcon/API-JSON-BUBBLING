




let player;
let duration = 0;
let lastVolume;
let previousVolume = 0;
let updateInterval;

const seekBar = document.getElementById("seekBar");
const volumeSlider = document.getElementById("volumeSlider");
const playPauseBtn = document.getElementById("playPauseBtn");

function onPlayerReady(event){
    duration = player.getDuration();
    player.playVideo();

    seekBar.max = duration;
    volumeSlider.value = player.getVolume();
    updateInterval = setInterval(()=>{
        if(player && player.getPlayerState() === YT.PlayerState.PLAYING){
            seekBar.value = player.getCurrentTime();
            let currentVolume = player.getVolume();
            if(currentVolume !== previousVolume ){
                volumeSlider.value = currentVolume;
                previousVolume = currentVolume;
            }
        }
    }, 100)

}

//const canciones = [, "T8TtE-enslS"];
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player", {
        videoId: "T8TtE-enslA",
        playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            autoplay: 1
        },
        events:{
            onReady: onPlayerReady,
        },

        
    });
}


//Play/Pause
playPauseBtn.addEventListener("click", ()=>{
    let state = player.getPlayerState(); // Devuelve el estado del player
    console.log("CAMBIOO!")
    if(state === YT.PlayerState.PLAYING){
        player.pauseVideo();

    } else {
        player.playVideo();
    }
});

//Volumen
volumeSlider.addEventListener('input', function(){
    let volume = parseInt(volumeSlider.value, 10);
    player.setVolume(volume);
    if (player.isMuted() && volume > 0){
        player.unMute();
    }
    lastVolume = volume;
    previousVolume = volume;
});


//Mute
const muteBtn = document.getElementById("muteBtn");
muteBtn.addEventListener('click', function(){
    if(player.isMuted()){
        player.unMute();
        muteBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`
        volumeSlider.value = lastVolume;
    } else {
        player.mute();
        muteBtn.innerHTML = `<i class="fa-solid fa-volume-off"></i>`
    }
})


//duracion
seekBar.addEventListener('input', function(){
    let seekTo = seekBar.value;
    player.seekTo(seekTo, true);
})