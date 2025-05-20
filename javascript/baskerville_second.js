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

    // OVERLAY
    document.addEventListener('mousemove', function (e) {
        let x = e.clientX;
        let y = e.clientY;
        overlay.style.setProperty('--x', `${x}px`);
        overlay.style.setProperty('--y', `${y}px`);
    });

    // LIGAR/DESLIGAR LUZES
    lights.addEventListener('click', () => {
        light_on = !light_on;

        lights.src = light_on
            ? 'images/baskerville/second/lights_on.png'
            : 'images/baskerville/second/lights_off.png';

        overlay.style.opacity = light_on ? '0' : '1';

        // Controle do som_2 com base na luz e som_on
        if (sound_on) {
            if (light_on) {
                sound_2.pause();
            } else {
                sound_2.play();
            }
        }

        // Esconde os elementos de Sherlock das luzes ao ligar a luz
        if (light_on) {
            document.querySelector('#text_lights').style.display = 'none';
            document.querySelector('#sherlock_lights').style.display = 'none';

            setTimeout(() => {
                document.querySelector('#text_drug').style.display = 'block';
                document.querySelector('#sherlock_drug').style.display = 'block';

                // Aguarda mais 3 segundos para esconder novamente
                setTimeout(() => {
                    document.querySelector('#text_drug').style.display = 'none';
                    document.querySelector('#sherlock_drug').style.display = 'none';
                }, 3500); // tempo visível
            }, 1500); // tempo até aparecer
        } else {
            // Esconde se as luzes forem desligadas
            document.querySelector('#text_drug').style.display = 'none';
            document.querySelector('#sherlock_drug').style.display = 'none';
        }
    });

    // BOTÃO PLAY/STOP
    play.addEventListener("click", () => {
        sound_on = !sound_on;

        if (sound_on) {
            sound_1.play();
            sound_1.volume = 0.01;

            if (!light_on) {
                sound_2.play();
            }

            sound_2.volume = 0.5;
            play.src = "images/nav/sound.png";
            play.classList.remove("pulse"); // REMOVE animação
        } else {
            sound_1.pause();
            sound_2.pause();
            play.src = "images/nav/no_sound.png";
            play.classList.add("pulse"); // ADICIONA animação
        }
    });

    // ABRIR E FECHAR CLUES
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

    // ABRIR IMAGEM DE EXIT
    let image_exit = document.querySelector('#exit');
    let image_exit_overlay = document.querySelector('#image_exit_overlay');
    let close_exit_image = document.querySelector('#close_image_exit');

    if (image_exit && image_exit_overlay && close_exit_image) {
        image_exit.addEventListener('click', function () {
            image_exit_overlay.classList.remove('hidden');
            exit_clicked = true;
        });

        close_exit_image.addEventListener('click', function () {
            image_exit_overlay.classList.add('hidden');

            if (!light_on) {
                setTimeout(() => {
                    document.querySelector('#text_lights').style.display = 'block';
                    document.querySelector('#sherlock_lights').style.display = 'block';
                }, 2500);
            }
        });
    }

    // ABRIR IMAGEM DE COMPUTADOR
    let image_pc = document.querySelector('#pc');
    let image_pc_overlay = document.querySelector('#image_pc_overlay');
    let close_pc_image = document.querySelector('#close_image_pc');

    if (image_pc && image_pc_overlay && close_pc_image) {
        image_pc.addEventListener('click', function () {
            image_pc_overlay.classList.remove('hidden');
            exit_clicked = true;
        });

        close_pc_image.addEventListener('click', function () {
            image_pc_overlay.classList.add('hidden');
        });
    }

    // ANIMAÇÃO DAS CORTINAS
    let curtains = [];
    for (let i = 0; i < 6; i++) {
        curtains.push(`images/baskerville/second/curtains_${i}.png`);
    }

    function createImageAnimation(elementId, imageArray) {
        let currentIndex = 0;
        let element = document.getElementById(elementId);
        let forwardIntervalId = null;
        let reverseIntervalId = null;

        function changeImageForward() {
            currentIndex++;
            if (currentIndex >= imageArray.length) {
                clearInterval(forwardIntervalId);
                forwardIntervalId = null;
                return;
            }
            element.src = imageArray[currentIndex];
        }

        function changeImageBackward() {
            currentIndex--;
            if (currentIndex < 0) {
                clearInterval(reverseIntervalId);
                reverseIntervalId = null;
                return;
            }
            element.src = imageArray[currentIndex];
        }

        element.addEventListener('mouseenter', function () {
            clearInterval(reverseIntervalId);
            reverseIntervalId = null;

            currentIndex = 0;
            element.src = imageArray[currentIndex];
            forwardIntervalId = setInterval(changeImageForward, 270);
        });

        element.addEventListener('mouseleave', function () {
            clearInterval(forwardIntervalId);
            forwardIntervalId = null;

            reverseIntervalId = setInterval(changeImageBackward, 270);
        });
    }

    createImageAnimation('curtains', curtains);

    // VERIFICAR ACESSO AO PC
    if (localStorage.getItem('pc_accessed') === 'true') {
        pc_accessed = true;
    }

    let map = document.querySelector('#map');

    map.addEventListener('click', function (e) {
        deactivate_out();
        
        if (!(light_on && exit_clicked && pc_accessed)) {
            e.preventDefault();
        }
    });
});

// INTERVENÇÕES DO SHERLOCK
function activate_out() {
    let text_out = document.querySelector('#text_out');
    let sherlock_out = document.querySelector('#sherlock_out');

    text_out.style.display = 'block';
    sherlock_out.style.display = 'block';
}

function deactivate_out() {
    let text_out = document.querySelector('#text_out');
    let sherlock_out = document.querySelector('#sherlock_out');

    text_out.style.display = 'none';
    sherlock_out.style.display = 'none';
}

window.addEventListener('load', () => {
    setTimeout(activate_out, 3500);
});

document.querySelector('#exit').addEventListener('click', deactivate_out);


// ANIMAÇÃO COMPUTADOR
const imagens = [
    "images/baskerville/second/doc_1.png",
    "images/baskerville/second/doc_2.png",
    "images/baskerville/second/doc_3.png"
];
let indice_atual = 0;

document.querySelector("#play_pc").addEventListener("click", function () {
    indice_atual = (indice_atual + 1) % imagens.length; // incrementa e volta ao início quando passar do último
    document.getElementById("doc").src = imagens[indice_atual];
});