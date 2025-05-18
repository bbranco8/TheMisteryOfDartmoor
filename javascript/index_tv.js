const imagens = [
    "images/index/tv_on_1.png",
    "images/index/tv_on_2.png",
    "images/index/tv_on_3.png"
];
let indice_atual = 0;

document.getElementById("play").addEventListener("click", function () {
    indice_atual = (indice_atual + 1) % imagens.length; // incrementa e volta ao início quando passar do último
    document.getElementById("tv_on").src = imagens[indice_atual];
});
