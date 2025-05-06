document.addEventListener('DOMContentLoaded', function () {
  // Limpa pistas no início da sessão
  if (!sessionStorage.getItem('sessionStarted')) {
    localStorage.removeItem('clues');
    sessionStorage.setItem('sessionStarted', 'true');
  }

  const clues = JSON.parse(localStorage.getItem('clues')) || [];
  const container = document.getElementById('clues_container');
  const placedClues = [];

  function isOverlapping(x, y, width, height) {
    return placedClues.some(c =>
      x < c.x + c.width &&
      x + width > c.x &&
      y < c.y + c.height &&
      y + height > c.y
    );
  }

  if (clues.length === 0) {
    container.innerHTML = '<p>No clue found yet</p>';
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
        const width = clueDiv.offsetWidth;
        const height = clueDiv.offsetHeight;
        const maxX = container.offsetWidth - width;
        const maxY = container.offsetHeight - height;
        let x, y, attempts = 0;

        do {
          x = Math.floor(Math.random() * maxX);
          y = Math.floor(Math.random() * maxY);
          attempts++;
        } while (isOverlapping(x, y, width, height) && attempts < 100);

        clueDiv.style.position = 'absolute';
        clueDiv.style.left = x + 'px';
        clueDiv.style.top = y + 'px';
        placedClues.push({ x, y, width, height });
      };
    } else {
      clueDiv.innerHTML = '<p>Erro ao carregar a pista.</p>';
    }

    container.appendChild(clueDiv);
  });
});