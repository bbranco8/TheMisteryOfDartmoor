
document.addEventListener('DOMContentLoaded', function () {
  let clues = JSON.parse(localStorage.getItem('clues')) || [];
  let container = document.getElementById('clues_container');
  let placedClues = [];

  function isOverlapping(x, y, width, height) {
    return placedClues.some(clue => {
      return (
        x < clue.x + clue.width &&
        x + width > clue.x &&
        y < clue.y + clue.height &&
        y + height > clue.y
      );
    });
  }

  if (clues.length === 0) {
    container.innerHTML = '<p>No clue found yet</p>';
  } else {
    clues.forEach(clue => {
      let clueDiv = document.createElement('div');
      clueDiv.className = 'clue';

      if (clue.imgSrc) {
        clueDiv.innerHTML = `
            <img src="${clue.imgSrc}" alt="pista">
            <p>${clue.description || ''}</p>
          `;
      } else {
        clueDiv.innerHTML = `<p>Erro ao carregar a pista.</p>`;
      }

      container.appendChild(clueDiv);

      // Aguarda imagem carregar para medir
      clueDiv.querySelector('img').onload = function () {
        let width = clueDiv.offsetWidth;
        let height = clueDiv.offsetHeight;

        let maxX = container.offsetWidth - width;
        let maxY = container.offsetHeight - height;

        let x, y, attempts = 0, maxAttempts = 100;

        do {
          x = Math.floor(Math.random() * maxX);
          y = Math.floor(Math.random() * maxY);
          attempts++;
        } while (isOverlapping(x, y, width, height) && attempts < maxAttempts);

        clueDiv.style.left = `${x}px`;
        clueDiv.style.top = `${y}px`;

        placedClues.push({ x, y, width, height });
      };
    });
  }
});