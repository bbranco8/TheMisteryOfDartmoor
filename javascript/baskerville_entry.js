document.addEventListener('DOMContentLoaded', () => {
  let letter_spots = document.querySelectorAll('.letter_spot');
  let submit = document.querySelector('#submit');
  let result_message = document.querySelector('#result_message');
  let text_pass = document.querySelector('#text_pass');
  let sherlock_pass = document.querySelector('#sherlock_pass');

  let current_input = '';
  let failedAttempts = 0;

  document.addEventListener('keydown', (e) => {
    if (/^[a-zA-Z ]$/.test(e.key) && current_input.length < 10) {
      current_input += e.key.toUpperCase();
      update_letters();
    } else if (e.key === 'Backspace') {
      current_input = current_input.slice(0, -1);
      update_letters();
    }
  });

  function update_letters() {
    const chars = current_input.padEnd(10, ' ').split('');
    letter_spots.forEach((spot, i) => {
      spot.textContent = chars[i];
    });
  }

  submit.addEventListener('click', () => {
    const attempt = current_input.trim().toUpperCase();
    if (attempt === 'LIBERTY IN') {
      result_message.textContent = 'ACCESS GRANTED';
      result_message.style.color = '#4f736d';

      setTimeout(() => {
        window.location.href = 'baskerville_first.html'; 
      }, 2000);
    } else {
      failedAttempts++;
      result_message.textContent = 'ACCESS DENIED';
      result_message.style.color = 'red';

      current_input = '';
      update_letters();

      if (failedAttempts === 3) {
        text_pass.style.display = 'block';
        sherlock_pass.style.display = 'block';
      }
    }
  });
});
