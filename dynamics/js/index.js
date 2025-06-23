let player;
let currentVideo = null;
let playerReady = false;

function crearTarjeta(video) {
    // const canal = data.canales.find(c => c.id === video.id_canal);
    let canal = data.canales[video.id_canal - 1]

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-video";

    tarjeta.innerHTML = `
        <div class="thumb">
            <img src="${video.link_img}" alt="Miniatura de ${video.nombre}">
        </div>
        <div class="info">
            <h3>${video.nombre}</h3>
            <p>${canal.nombre} • ${video.duracion}</p>
        </div>
        <div class="like-container">
            <button class="btn-like">Like</button>
            <span class="like-count">0</span>
        </div>
    `;

    const btnLike = tarjeta.querySelector(".btn-like");
    const contador = tarjeta.querySelector(".like-count");

    btnLike.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita abrir el video al dar like
        contador.textContent = parseInt(contador.textContent) + 1;
    });

    tarjeta.addEventListener("click", () => reproducirVideo(video));

    return tarjeta;
}

function cargarVideos() {
    const contenedor = document.getElementById("contenedorVideos");
    contenedor.innerHTML = "";
    data.videos.forEach(video => {
        const tarjeta = crearTarjeta(video);
        contenedor.appendChild(tarjeta);
    });
}

const contVideos = document.getElementById("contenedorVideos");
//const sugeridos = document.getElementById("sugeridos").style.display = "flex";
const playerView = document.getElementById("playerView");
const tituloVid = document.getElementById("tituloVideo");
const descVid = document.getElementById("descripcionVideo");

function reproducirVideo(video) {
    contVideos.style.display = "none";    
    playerView.style.display = "flex";
    

    tituloVid.innerText = video.nombre;
    descVid.innerText = video.descripcion;

    currentVideo = video;

    if (playerReady && player) {
        player.loadVideoById(video.link);
    }

    //cargarSugerencias(video.id);
}
/*
function cargarSugerencias(idActual) {
    const sugeridos = document.getElementById("sugeridos");
    sugeridos.innerHTML = "";

    data.videos
        .filter(v => v.id !== idActual)
        .forEach(video => {
            const tarjeta = crearTarjeta(video);
            sugeridos.appendChild(tarjeta);
        });
}
        */

function onYouTubeIframeAPIReady() {
    player = new YT.Player("reproductor", {
        height: "100%",
        width: "100%",
        videoId: "",
        events: {
            onReady: (event) => {
                playerReady = true;
                if (currentVideo) {
                    player.loadVideoById(currentVideo.link);
                }
            }
        }
    });
}

cargarVideos();