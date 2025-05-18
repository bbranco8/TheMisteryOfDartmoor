document.addEventListener('DOMContentLoaded', function () {
  // Get references to the open/close buttons and the overlay itself
  let open = document.querySelector('#open_clues');
  let close = document.querySelector('#close_clues');
  let overlay = document.querySelector('#clues_overlay');

  // Handle overlay open/close behavior if all elements exist
  if (open && close && overlay) {
    open.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default link behavior
      overlay.classList.remove('hidden'); // Show overlay
      renderClues(); // Load and display clues when overlay is opened
    });

    close.addEventListener('click', function () {
      overlay.classList.add('hidden'); // Hide overlay
    });
  }

  // Reset clues only once per browser session
  if (!sessionStorage.getItem('sessionStarted')) {
    localStorage.removeItem('clues'); // Clear previously saved clues
    sessionStorage.setItem('sessionStarted', 'true'); // Mark session as started
  }

  /**
   * This function loads clues from localStorage,
   * then creates and positions each clue randomly on the overlay
   */
  window.renderClues = function () {
    let container = document.querySelector('#clues_container');
    container.innerHTML = ''; // Clear previous clues before re-rendering
    let clues = JSON.parse(localStorage.getItem('clues')) || [];
    let placedClues = []; // Track positions to avoid overlaps

    // Helper function to check if two rectangles overlap
    function isOverlapping(x, y, width, height) {
      return placedClues.some(c =>
        x < c.x + c.width &&
        x + width > c.x &&
        y < c.y + c.height &&
        y + height > c.y
      );
    }

    // Show message if there are no clues
    if (clues.length === 0) {
      container.innerHTML = '<p>No clue found yet. </br> If you want to save any clue, just click on it!</p>';
      return;
    }

    // Loop through each clue object and render it
    clues.forEach(clue => {
      let clueDiv = document.createElement('div');
      clueDiv.className = 'clue';

      // If clue has an image source, create an <img> element
      if (clue.imgSrc) {
        let img = document.createElement('img');
        img.src = clue.imgSrc;
        clueDiv.appendChild(img);

        // Once image is loaded, randomly position it in the container
        img.onload = () => {
          // Append to the container FIRST so we can measure dimensions properly
          container.appendChild(clueDiv);

          // Use accurate dimensions after image is rendered
          const width = clueDiv.offsetWidth;
          const height = clueDiv.offsetHeight;

          // Calculate max positions that keep the clue fully inside the container
          const maxX = container.clientWidth - width;
          const maxY = container.clientHeight - height - 20;

          // Prevent negatives just in case
          const safeX = Math.max(0, maxX);
          const safeY = Math.max(0, maxY);

          let x, y, attempts = 0;

          // Try random positions until no overlap or max attempts reached
          do {
            x = Math.floor(Math.random() * safeX);
            y = Math.floor(Math.random() * safeY);
            attempts++;
          } while (isOverlapping(x, y, width, height) && attempts < 100);

          // Set the final position
          clueDiv.style.left = x + 'px';
          clueDiv.style.top = y + 'px';

          // Register this clue's position
          placedClues.push({ x, y, width, height });
        };



      } else {
        // Fallback in case image is missing or fails to load
        clueDiv.innerHTML = '<p>Error</p>';
      }

      // Add the clue to the overlay container
      container.appendChild(clueDiv);
    });
  };
});
