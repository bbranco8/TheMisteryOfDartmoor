document.addEventListener('DOMContentLoaded', function() {
  let clues = JSON.parse(localStorage.getItem('clues')) || [];
  let container = document.getElementById('clues_container');

  if (clues.length === 0) {
    container.innerHTML = '<p>No clue found yet</p>';
  } else {
    clues.forEach(clue => {
      let clueDiv = document.createElement('div');
      clueDiv.className = 'clue';

      console.log('Pista encontrada:', clue);

      if (clue.imgSrc) {
        let imgSrc = clue.imgSrc;

        clueDiv.innerHTML = `
          <img src="${imgSrc}" alt="pista">
          <p>${clue.description || ''}</p>
        `;
      } else {
        clueDiv.innerHTML = `<p>Erro ao carregar a pista.</p>`;
      }

      container.appendChild(clueDiv);
    });
  }
});
