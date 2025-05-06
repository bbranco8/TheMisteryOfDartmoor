let overlay = document.querySelector('#dark_overlay');

document.addEventListener('mousemove', function (e) {
    let x = e.clientX;
    let y = e.clientY;
    overlay.style.setProperty('--x', `${x}px`);
    overlay.style.setProperty('--y', `${y}px`);
});

let dog = document.querySelector('#dog');
let hideTimeout;

dog.addEventListener('mouseenter', () => {
    hideTimeout = setTimeout(() => {
        dog.style.opacity = '0';  // Torna invisível
        dog.style.pointerEvents = 'none'; // Impede interação

        // Mostra o texto e a imagem do Sherlock só depois do cão desaparecer
        document.querySelector('#text_hound').style.display = 'block';
        document.querySelector('#sherlock_hound').style.display = 'block';
    }, 1000); // 1 segundo
});

dog.addEventListener('mouseleave', () => {
    clearTimeout(hideTimeout); // Se o rato sair antes dos 2s, cancela
});

function activate_warning() {
    let text_warning = document.querySelector('#text_warning');
    let sherlock_warning = document.querySelector('#sherlock_warning');

    text_warning.style.display = 'block';
    sherlock_warning.style.display = 'block';
}

function deactivate_warning() {
    let text_warning = document.querySelector('#text_warning');
    let sherlock_warning = document.querySelector('#sherlock_warning');

    text_warning.style.display = 'none';
    sherlock_warning.style.display = 'none';
}