document.addEventListener('DOMContentLoaded', () => {
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
            dog.style.pointerEvents = 'none';

            document.querySelector('#text_hound').style.display = 'block';
            document.querySelector('#sherlock_hound').style.display = 'block';
        }, 1000);
    });

    dog.addEventListener('mouseleave', () => {
        clearTimeout(hideTimeout);
    });

    window.activate_warning = function () {
        document.querySelector('#text_warning').style.display = 'block';
        document.querySelector('#sherlock_warning').style.display = 'block';
    }

    window.deactivate_warning = function () {
        document.querySelector('#text_warning').style.display = 'none';
        document.querySelector('#sherlock_warning').style.display = 'none';
    }
});
