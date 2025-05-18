sessionStorage.setItem('dewersVisited', 'true');

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
    }, 1000);
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