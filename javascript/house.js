// BOTÃO PLAY/STOP
let sound_1 = document.querySelector("#sound_1");
let play = document.querySelector("#play");
let sound_on = false;

play.addEventListener("click", () => {
    sound_on = !sound_on;

    if (sound_on) {
        sound_1.play();
        sound_1.volume = 0.1;

        play.src = "images/nav/sound_1.png";
        play.classList.remove("pulse"); // REMOVE animação
    } else {
        sound_1.pause();
        play.src = "images/nav/no_sound_1.png";
        play.classList.add("pulse"); // ADICIONA animação
    }
});



function activate_tv() {
    let text_tv = document.querySelector('#text_tv');
    let sherlock_tv= document.querySelector('#sherlock_tv');

    text_tv.style.display = 'block';
    sherlock_tv.style.display = 'block';
}

function deactivate_tv() {
    let text_tv = document.querySelector('#text_tv');
    let sherlock_tv = document.querySelector('#sherlock_tv');

    text_tv.style.display = 'none';
    sherlock_tv.style.display = 'none';
}