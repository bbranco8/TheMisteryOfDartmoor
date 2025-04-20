let overlay = document.getElementById('dark_overlay');

document.addEventListener('mousemove', function (e) {
    let x = e.clientX;
    let y = e.clientY;
    overlay.style.setProperty('--x', `${x}px`);
    overlay.style.setProperty('--y', `${y}px`);
});

let dog = document.getElementById('dog');
let hideTimeout;

dog.addEventListener('mouseenter', () => {
    hideTimeout = setTimeout(() => {
        dog.style.opacity = '0';  // Torna invisível
        dog.style.pointerEvents = 'none'; // Impede interação
    }, 1000); // 1 segundo
});

dog.addEventListener('mouseleave', () => {
    clearTimeout(hideTimeout); // Se o rato sair antes dos 2s, cancela
});