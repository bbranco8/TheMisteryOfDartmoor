const imagens = [
    "images/baskerville/second/doc_1.png",
    "images/baskerville/second/doc_2.png",
    "images/baskerville/second/doc_3.png"
];
let indice_atual = 0;

document.getElementById("play").addEventListener("click", function () {
    indice_atual = (indice_atual + 1) % imagens.length; // incrementa e volta ao início quando passar do último
    document.getElementById("doc").src = imagens[indice_atual];
});
