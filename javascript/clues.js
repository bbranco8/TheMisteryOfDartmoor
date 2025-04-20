document.addEventListener('DOMContentLoaded', function() {
    let clues = JSON.parse(localStorage.getItem('clues')) || [];
    let container = document.getElementById('clues_container');

    if (clues.length === 0) {
      container.innerHTML = '<p>Nenhuma pista encontrada ainda.</p>';
    } else {
      clues.forEach(clue => {
        let clueDiv = document.createElement('div');
        clueDiv.className = 'clue';

        // Verifica a pista no console
        console.log('Pista encontrada:', clue);

        // Alterar para usar a chave correta "img_src"
        if (clue.img_src && clue.description) {
          clueDiv.innerHTML = `
            <img src="${clue.img_src}" alt="pista">
          `;
        } else {
          clueDiv.innerHTML = `<p>Erro ao carregar a pista.</p>`;
        }

        container.appendChild(clueDiv);
      });
    }
  });