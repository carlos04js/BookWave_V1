console.log("script.js carregado");

// Seleção de elementos
const inputAudio = document.getElementById("audio-files");
const inputCapa = document.getElementById("cover-image");
const botaoGerarPlayer = document.getElementById("generate-player");
const containerPlayer = document.getElementById("secao-player");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximaFaixa = document.getElementById("next-track");
const botaoFaixaAnterior = document.getElementById("prev-track");
const audioElement = document.getElementById("audio-player");
const tituloFaixa = document.getElementById("track-title");


console.log("Elementos selecionados:", inputAudio, inputCapa, botaoGerarPlayer, containerPlayer, botaoPlayPause, botaoProximaFaixa, botaoFaixaAnterior, audioElement, tituloFaixa);

// Lista de faixas e controle
let listaDeAudios = [];
let faixaAtual = 0;

// Carregar áudios e criar player
botaoGerarPlayer.addEventListener("click", () => {
    const arquivosAudio = inputAudio.files;
    const capa = inputCapa.files[0];
    console.log("Botão 'Gerar Player' clicado");
    console.log("Arquivos de áudio selecionados:", arquivosAudio);
    console.log("Capa selecionada:", capa);

    if (arquivosAudio.length === 0) {
        alert("Por favor, selecione pelo menos um arquivo de áudio.");
        return;
    }
    listaDeAudios = Array.from(arquivosAudio);
    console.log("Lista de áudios:", listaDeAudios);
    criarPlayer(capa);
});

// Função para criar o player
function criarPlayer(capa) {
    console.log("Criando player...");
    containerPlayer.classList.remove("d-none");

    // Exibir capa, se existir
const imgCapaContainer = document.getElementById("book-cover");
const imgCapa = imgCapaContainer.querySelector("img"); // Seleciona o <img> dentro do #book-cover

if (capa) {
    const urlCapa = URL.createObjectURL(capa);
    imgCapa.src = urlCapa; // Define a URL da imagem
    imgCapa.alt = "Capa do livro"; // Define o texto alternativo
    imgCapaContainer.style.display = "flex"; // Garante que o contêiner seja exibido
    console.log("Capa do livro exibida:", urlCapa);
} else {
    imgCapaContainer.style.display = "none"; // Esconde o contêiner, caso não exista capa
    console.log("Nenhuma capa selecionada");
}


    // Configurar áudio inicial
    audioElement.src = URL.createObjectURL(listaDeAudios[0]);
    tituloFaixa.innerText = listaDeAudios[0].name;
    console.log("Player configurado com o primeiro áudio:", listaDeAudios[0].name);
}

// Função para tocar/pausar o áudio
botaoPlayPause.addEventListener("click", () => {
    if (audioElement.paused) {
        audioElement.play();
        botaoPlayPause.innerText = "Pause";
        console.log("Áudio tocando");
    } else {
        audioElement.pause();
        botaoPlayPause.innerText = "Play";
        console.log("Áudio pausado");
    }
});

// Função para tocar a próxima faixa
botaoProximaFaixa.addEventListener("click", () => {
    if (faixaAtual < listaDeAudios.length - 1) {
        faixaAtual++;
        audioElement.src = URL.createObjectURL(listaDeAudios[faixaAtual]);
        tituloFaixa.innerText = listaDeAudios[faixaAtual].name;
        audioElement.play();
        botaoPlayPause.innerText = "Pause";
        console.log("Tocando próxima faixa:", listaDeAudios[faixaAtual].name);
    } else {
        console.log("Última faixa já está tocando");
    }
});

// Função para tocar a faixa anterior
botaoFaixaAnterior.addEventListener("click", () => {
    if (faixaAtual > 0) {
        faixaAtual--;
        audioElement.src = URL.createObjectURL(listaDeAudios[faixaAtual]);
        tituloFaixa.innerText = listaDeAudios[faixaAtual].name;
        audioElement.play();
        botaoPlayPause.innerText = "Pause";
        console.log("Tocando faixa anterior:", listaDeAudios[faixaAtual].name);
    } else {
        console.log("Primeira faixa já está tocando");
    }
});