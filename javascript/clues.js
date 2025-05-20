document.addEventListener('DOMContentLoaded', function () {
  const open = document.querySelector('#open_clues');
  const close = document.querySelector('#close_clues');
  const overlay = document.querySelector('#clues_overlay');
  const submitBtn = document.querySelector('#submit_culprit');

  // Abrir/fechar overlay
  if (open && close && overlay) {
    open.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.classList.remove('hidden');
      renderClues();
    });

    close.addEventListener('click', function () {
      overlay.classList.add('hidden');
    });
  }

  // Reset de sessão
  if (!sessionStorage.getItem('sessionStarted')) {
    localStorage.removeItem('clues');
    sessionStorage.setItem('sessionStarted', 'true');
  }

  // Submissão do culpado
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      const input = document.querySelector('#culprit_input').value.trim();
      const result = document.querySelector('#culprit_result');
      const culpadosCorretos = ['Dr. Frankland', 'Frankland', 'Dr Frankland'];

      if (input) {
        const inputNormalizado = input.toLowerCase();
        const acertou = culpadosCorretos.some(nome => nome.toLowerCase() === inputNormalizado);

        result.textContent = acertou
          ? 'Correct! You found the culprit.'
          : 'Wrong! Try again';
        result.style.color = '#f0d3aa';
      }
    });
  }

  // Função para exibir as pistas
  window.renderClues = function () {
    const container = document.querySelector('#clues_container');
    const guessArea = document.querySelector('.guess_area');

    container.innerHTML = '';
    const clues = JSON.parse(localStorage.getItem('clues')) || [];
    const placedClues = [];

    if (!guessArea) return;

    // Calcular posição relativa da guess_area ao container
    const containerRect = container.getBoundingClientRect();
    const guessRect = guessArea.getBoundingClientRect();

    const guessAreaRelative = {
      x: guessRect.left - containerRect.left,
      y: guessRect.top - containerRect.top,
      width: guessRect.width,
      height: guessRect.height
    };

    // Verifica se duas caixas se sobrepõem
    function isOverlapping(x, y, width, height) {
      const overlapsOtherClues = placedClues.some(c =>
        x < c.x + c.width &&
        x + width > c.x &&
        y < c.y + c.height &&
        y + height > c.y
      );

      const overlapsGuessArea =
        x < guessAreaRelative.x + guessAreaRelative.width &&
        x + width > guessAreaRelative.x &&
        y < guessAreaRelative.y + guessAreaRelative.height &&
        y + height > guessAreaRelative.y;

      return overlapsOtherClues || overlapsGuessArea;
    }

    if (clues.length === 0) {
      container.innerHTML = '<p>No clue found yet. </br> If you want to save any clue, just click on it!</p>';
      return;
    }

    clues.forEach(clue => {
      const clueDiv = document.createElement('div');
      clueDiv.className = 'clue';

      if (clue.imgSrc) {
        const img = document.createElement('img');
        img.src = clue.imgSrc;
        clueDiv.appendChild(img);

        img.onload = () => {
          container.appendChild(clueDiv);
          const width = clueDiv.offsetWidth;
          const height = clueDiv.offsetHeight;

          const maxX = container.clientWidth - width;
          const maxY = container.clientHeight - height;

          const safeX = Math.max(0, maxX);
          const safeY = Math.max(0, maxY);
          let x, y, attempts = 0;

          do {
            x = Math.floor(Math.random() * safeX);
            y = Math.floor(Math.random() * safeY);
            attempts++;
          } while (isOverlapping(x, y, width, height) && attempts < 100);

          clueDiv.style.position = 'absolute';
          clueDiv.style.left = x + 'px';
          clueDiv.style.top = y + 'px';

          placedClues.push({ x, y, width, height });
        };
      } else {
        clueDiv.innerHTML = '<p>Error</p>';
        container.appendChild(clueDiv);
      }
    });
  };
});
