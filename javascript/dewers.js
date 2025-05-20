sessionStorage.setItem('dewersVisited', 'true');


let sound_1 = document.querySelector("#sound_1");
let sound_2 = document.querySelector("#sound_2");
let play = document.querySelector("#play");

document.addEventListener('DOMContentLoaded', () => {
  let sound_on = false;
  play.addEventListener("click", () => {
    if (sound_on) {
      sound_1.pause();
      sound_2.pause();
      play.src = "images/nav/no_sound.png";
      play.classList.remove("pulse"); // REMOVE animação
    } else {
      sound_1.play();
      sound_2.play();
      play.src = "images/nav/sound.png";
      play.classList.add("pulse"); // ADICIONA animação
    }

    sound_on = !sound_on;
  });
});


document.addEventListener('DOMContentLoaded', () => {
  let overlay = document.querySelector('#dark_overlay');

  document.addEventListener('mousemove', function (e) {
    let x = e.clientX;
    let y = e.clientY;
    overlay.style.setProperty('--x', `${x}px`);
    overlay.style.setProperty('--y', `${y}px`);
  });

  // Referências aos elementos
  let dog_box = document.querySelector('#dog_box');
  let dog = document.querySelector('#dog');
  let text_hound = document.querySelector('#text_hound');
  let sherlock_hound = document.querySelector('#sherlock_hound');

  let dog_disappeared = false;

  dog_box.addEventListener('mouseenter', () => {
    if (dog_disappeared) return;

    hideTimeout = setTimeout(() => {
      dog.style.opacity = '0';
      dog.style.pointerEvents = 'none';

      text_hound.style.display = 'block';
      sherlock_hound.style.display = 'block';

      dog_disappeared = true;

      // Reaparece após 7 segundos 
      setTimeout(() => {
        dog.style.opacity = '1';
        dog.style.pointerEvents = 'auto';
        dog_disappeared = false;

        text_hound.style.display = 'none';
        sherlock_hound.style.display = 'none';
      }, 7000);

    }, 1500);
  });

  dog_box.addEventListener('mouseleave', () => {
    clearTimeout(hideTimeout);

    if (!dog_disappeared) {
      dog.style.opacity = '1';
      dog.style.pointerEvents = 'auto';
    }

    text_hound.style.display = 'none';
    sherlock_hound.style.display = 'none';
  });
});

function activate_warning() {
  document.querySelector('#text_warning').style.display = 'block';
  document.querySelector('#sherlock_warning').style.display = 'block';
}

function deactivate_warning() {
  document.querySelector('#text_warning').style.display = 'none';
  document.querySelector('#sherlock_warning').style.display = 'none';
}