document.addEventListener('DOMContentLoaded', function () {
    // VARIÁVEIS GLOBAIS
    let overlay = document.querySelector('#dark_overlay');
    let lights = document.getElementById('lights');
    let light_on = false;
    let exit_clicked = false;
    let pc_accessed = false;
    let sound_1 = document.querySelector("#sound_1");
    let sound_2 = document.querySelector("#sound_2");
    let play = document.querySelector("#play");
    let sound_on = false;

    // ELEMENTOS SHERLOCK
    const sherlockElements = {
        out: ['#text_out', '#sherlock_out'],
        lights: ['#text_lights', '#sherlock_lights'],
        drug: ['#text_drug', '#sherlock_drug']
    };

    function showElements(selectors) {
        selectors.forEach(sel => document.querySelector(sel).style.display = 'block');
    }

    function hideElements(selectors) {
        selectors.forEach(sel => document.querySelector(sel).style.display = 'none');
    }

    function deactivate_all_sherlocks() {
        Object.values(sherlockElements).forEach(hideElements);
    }

    function checkSherlockInterventions() {
        deactivate_all_sherlocks();

        if (!exit_clicked && !pc_accessed && !light_on) {
            showElements(sherlockElements.out);
        } else if (exit_clicked && !light_on) {
            showElements(sherlockElements.lights);
        } else if (light_on) {
            setTimeout(() => {
                showElements(sherlockElements.drug);
                setTimeout(() => {
                    hideElements(sherlockElements.drug);
                }, 5000);
            }, 1000);
        }
    }

    // INICIAR COM SHERLOCK OUT
    window.addEventListener('load', () => {
        setTimeout(checkSherlockInterventions, 3500);
    });

    // OVERLAY
    document.addEventListener('mousemove', function (e) {
        overlay.style.setProperty('--x', `${e.clientX}px`);
        overlay.style.setProperty('--y', `${e.clientY}px`);
    });

    // BOTÃO LUZES
    lights.addEventListener('click', () => {
        light_on = !light_on;

        lights.src = light_on
            ? 'images/baskerville/second/lights_on.png'
            : 'images/baskerville/second/lights_off.png';

        overlay.style.opacity = light_on ? '0' : '1';

        if (sound_on) {
            light_on ? sound_2.pause() : sound_2.play();
        }

        checkSherlockInterventions();
    });

    // BOTÃO SOM
    play.addEventListener("click", () => {
        sound_on = !sound_on;

        if (sound_on) {
            sound_1.play(); sound_1.volume = 0.01;
            if (!light_on) sound_2.play();
            sound_2.volume = 0.5;
            play.src = "images/nav/sound.png";
            play.classList.remove("pulse");
        } else {
            sound_1.pause(); sound_2.pause();
            play.src = "images/nav/no_sound.png";
            play.classList.add("pulse");
        }
    });

    // EXIT
    let image_exit = document.querySelector('#exit');
    let image_exit_overlay = document.querySelector('#image_exit_overlay');
    let close_exit_image = document.querySelector('#close_image_exit');

    if (image_exit && image_exit_overlay && close_exit_image) {
        image_exit.addEventListener('click', function (e) {
            if (light_on) {
                // Se as luzes estiverem ligadas, redireciona para o mapa
                window.location.href = 'map.html';
            } else {
                image_exit_overlay.classList.remove('hidden');
                exit_clicked = true;
                checkSherlockInterventions();
            }
        });

        close_exit_image.addEventListener('click', function () {
            image_exit_overlay.classList.add('hidden');
            checkSherlockInterventions();
        });
    }

    // COMPUTADOR
    let image_pc = document.querySelector('#pc');
    let image_pc_overlay = document.querySelector('#image_pc_overlay');
    let close_pc_image = document.querySelector('#close_image_pc');

    if (image_pc && image_pc_overlay && close_pc_image) {
        image_pc.addEventListener('click', function () {
            image_pc_overlay.classList.remove('hidden');
            pc_accessed = true;
            localStorage.setItem('pc_accessed', 'true');
            checkSherlockInterventions();
        });

        close_pc_image.addEventListener('click', function () {
            image_pc_overlay.classList.add('hidden');
        });
    }

    // CORTINAS
    let curtains = [];
    for (let i = 0; i < 6; i++) curtains.push(`images/baskerville/second/curtains_${i}.png`);
    createImageAnimation('curtains', curtains);

    function createImageAnimation(elementId, imageArray) {
        let element = document.getElementById(elementId);
        let currentIndex = 0;
        let forwardIntervalId = null;
        let reverseIntervalId = null;

        function changeImageForward() {
            if (++currentIndex >= imageArray.length) {
                clearInterval(forwardIntervalId);
                return;
            }
            element.src = imageArray[currentIndex];
        }

        function changeImageBackward() {
            if (--currentIndex < 0) {
                clearInterval(reverseIntervalId);
                return;
            }
            element.src = imageArray[currentIndex];
        }

        element.addEventListener('mouseenter', () => {
            clearInterval(reverseIntervalId);
            currentIndex = 0;
            element.src = imageArray[0];
            forwardIntervalId = setInterval(changeImageForward, 270);
        });

        element.addEventListener('mouseleave', () => {
            clearInterval(forwardIntervalId);
            reverseIntervalId = setInterval(changeImageBackward, 270);
        });
    }

    // CLUES
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

    // BLOQUEAR MAPA SE NÃO COMPLETO
    let map = document.querySelector('#map');
    map.addEventListener('click', function (e) {
        if (!light_on) {
            e.preventDefault(); 
        }
    });

    // ANIMAÇÃO DOCUMENTOS NO PC
    const imagens = [
        "images/baskerville/second/doc_1.png",
        "images/baskerville/second/doc_2.png",
        "images/baskerville/second/doc_3.png"
    ];
    let indice_atual = 0;

    document.querySelector("#play_pc").addEventListener("click", function () {
        indice_atual = (indice_atual + 1) % imagens.length;
        document.getElementById("doc").src = imagens[indice_atual];
    });
});
