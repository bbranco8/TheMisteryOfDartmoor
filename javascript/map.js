document.addEventListener('DOMContentLoaded', function () {
  let baskerville = document.getElementById('baskerville');

  if (baskerville) {
    baskerville.addEventListener('click', function () {
      const baskervilleFirst = sessionStorage.getItem('baskervilleFirstVisited');
      const dewers = sessionStorage.getItem('dewersVisited');

      if (baskervilleFirst && dewers) {
        // Já visitou baskerville_first e dewers.html
        window.location.href = 'baskerville_second.html';
      } else {
        // Primeira vez ou ainda não visitou ambas as páginas necessárias
        sessionStorage.setItem('baskervilleVisited', 'true');
        window.location.href = 'baskerville_entry.html';
      }
    });
  }
});