




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

}
//const canciones = [, "T8TtE-enslS"];
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player", {
        videoId: "T8TtE-enslA",
        playerVars: {
            controls: 0
        },
        events:{
            onReady: onPlayerReady,
        },

        
    });
}


//Play/Pause
playPauseBtn.addEventListener("click", ()=>{
    let state = player.getPlayerState();
    if(state === YT.PlayerState.PLAYING){
        player.pauseVideo();

    } else {
        player.playVideo();
    }
});

//Volumen


//Mute


//duracion