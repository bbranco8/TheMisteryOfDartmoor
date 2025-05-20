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
    } else {
        sound_1.pause();
        play.src = "images/nav/no_sound_1.png";
    }
});