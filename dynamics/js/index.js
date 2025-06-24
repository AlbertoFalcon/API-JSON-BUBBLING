let player;
let currentVideo = null;
let playerReady = false;

function crearTarjeta(video) {
    const canal = data.canales[video.id_canal-1];

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-video";
    tarjeta.setAttribute("data-id", video.id);

    tarjeta.innerHTML = `
    <div class="thumb">
      <img src="${video.link_img}" alt="Miniatura">
    </div>
    <div class="info">
      <h3>${video.nombre}</h3>
      <p>${canal.nombre} • ${video.duracion}</p>
    </div>
    <div class="like-container">
      <span class="like-count">0</span>
      <span class="dislike-count">0</span>
    </div>`;

    tarjeta.addEventListener("click", ()=>{
        //console.log(video)
        reproducirVideo(video);
    });

    
    let div = document.createElement("div");
    div.classList.add("acciones");
    div.innerHTML= `
        <button data-id="${video.id}" data-accion="pin"><i class="fa-solid fa-thumbtack"></i></button>
        <button data-id="${video.id}" data-accion="guardar"><i class="fa-solid fa-bookmark"></i></button>
        <button data-id="${video.id}" data-accion="like"><i class="fa-solid fa-heart"></i></button>
        <button data-id="${video.id}" data-accion="dislike"><i class="fa-solid fa-heart-crack"></i></button>
        <button data-id="${video.id}" data-accion="eliminar"><i class="fa-solid fa-trash"></i></button>
        <button data-id="${video.id}" data-accion="ocultar"><i class="fa-solid fa-eye-slash"></i></button>
        `;
    div.addEventListener("click", (e) => {
        
        let accion = e.target.tagName;
        
        
        if(accion == "I") accion = e.target.parentElement.dataset.accion;
        else accion = e.target.dataset.accion;
        

        const tarjeta = e.target.closest(".tarjeta-video");
        

        if (!tarjeta) return;
        
        //console.log(tarjeta.dataset.id);

        const videoId = parseInt(tarjeta.dataset.id);
        const video = data.videos[videoId-1];

        // Botones especiales
        if (accion) {
            e.stopPropagation();
            switch (accion) {
                case "pin":
                    tarjeta.parentElement.prepend(tarjeta);
                    break;
                case "guardar":
                    e.target.closest("button").classList.toggle("activo");
                    break;
                case "like":
                    const like = tarjeta.querySelector(".like-count");
                    console.log(like)
                    const actual = parseInt(like.textContent);
                    console.log(actual)
                    like.textContent = `${actual + 1}`;
                    break;
                case "dislike":
                    const dislike = tarjeta.querySelector(".dislike-count");
                    const act = parseInt(dislike.textContent);
                    dislike.textContent = `${act + 1}`;
                    break;
                case "eliminar":
                    tarjeta.remove();
                    break;
                case "ocultar":
                    tarjeta.style.opacity = 0.3;
                    break;
            }
        } else {
            reproducirVideo(video);
        }
    });
    tarjeta.appendChild(div);

    return tarjeta;
}

function cargarVideos() {
    const contenedor = document.getElementById("contenedorVideos");
    contenedor.innerHTML = "";

    data.videos.forEach((video) => {
        const tarjeta = crearTarjeta(video);
        contenedor.appendChild(tarjeta);
    });
}

const contVideos = document.getElementById("contenedorVideos");
const sugeridos = document.getElementById("sugeridos");
const playView = document.getElementById("playerView");
const tituloVideo = document.getElementById("tituloVideo");
const descVideo = document.getElementById("descripcionVideo");
function reproducirVideo(video) {
    contVideos.style.display = "none";
    sugeridos.style.display = "none";
    playView.style.display = "flex";

    tituloVideo.innerText = video.nombre;
    descVideo.innerText = video.descripcion;

    currentVideo = video;

    if (playerReady && player) {
        player.loadVideoById(video.link);
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("reproductor", {
        // height: "100%",
        // width: "100%",
        videoId: "",
        playerVars: {
            controls: 1,
        },
        events: {
            onReady: (event) => {
                playerReady = true;
                if (currentVideo) {
                    player.loadVideoById(currentVideo.link);
                }
            },
        },
    });
}

// Delegación de eventos


cargarVideos();
