document.addEventListener('DOMContentLoaded', function () {
    // OVERLAY
    let overlay = document.querySelector('#dark_overlay');

    document.addEventListener('mousemove', function (e) {
        let x = e.clientX;
        let y = e.clientY;
        overlay.style.setProperty('--x', `${x}px`);
        overlay.style.setProperty('--y', `${y}px`);
    });


    // LIGAR LUZES
    let lights = document.getElementById('lights');
    let isOn = false;

    lights.addEventListener('click', () => {
        isOn = !isOn;

        lights.src = isOn
            ? 'images/baskerville/second/lights_on.png'
            : 'images/baskerville/second/lights_off.png';

        overlay.style.opacity = isOn ? '0' : '1';
    });

    //ABRIR EXIT
    let open = document.querySelector('#open_clues');
    let close = document.querySelector('#close_clues');
    let clues_overlay = document.querySelector('#clues_overlay');

    if (open && close && clues_overlay) {
        open.addEventListener('click', function (e) {
            e.preventDefault();
            clues_overlay.classList.remove('hidden');
            renderClues();
        });

        close.addEventListener('click', function () {
            clues_overlay.classList.add('hidden');
        });
    }

    let image = document.querySelector('#exit');
    let imageOverlay = document.querySelector('#image_overlay');
    let closeImage = document.querySelector('#close_image');

    if (image && imageOverlay && closeImage) {
        image.addEventListener('click', function () {
            imageOverlay.classList.remove('hidden');
        });

        closeImage.addEventListener('click', function () {
            imageOverlay.classList.add('hidden');
        });
    }

    // CRIAR ANIMACAO CURTAINS
    let curtains = [];
    for (let i = 0; i < 6; i++) {
        curtains.push(`images/baskerville/second/curtains_${i}.png`);
    }

    function createImageAnimation(elementId, imageArray) {
        let currentIndex = 0;
        let element = document.getElementById(elementId);
        let forwardIntervalId = null;
        let reverseIntervalId = null;

        // Animação para frente
        function changeImageForward() {
            currentIndex++;
            if (currentIndex >= imageArray.length) {
                clearInterval(forwardIntervalId);
                forwardIntervalId = null;
                return;
            }
            element.src = imageArray[currentIndex];
        }

        // Animação reversa
        function changeImageBackward() {
            currentIndex--;
            if (currentIndex < 0) {
                clearInterval(reverseIntervalId);
                reverseIntervalId = null;
                return;
            }
            element.src = imageArray[currentIndex];
        }

        // Mouse entra: inicia animação para frente
        element.addEventListener('mouseenter', function () {
            clearInterval(reverseIntervalId);
            reverseIntervalId = null;

            currentIndex = 0;
            element.src = imageArray[currentIndex];
            forwardIntervalId = setInterval(changeImageForward, 270);
        });

        // Mouse sai: inicia animação reversa
        element.addEventListener('mouseleave', function () {
            clearInterval(forwardIntervalId);
            forwardIntervalId = null;

            reverseIntervalId = setInterval(changeImageBackward, 270);
        });
    }

    createImageAnimation('curtains', curtains);
});
