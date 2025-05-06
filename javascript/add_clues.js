function addClue(id, imgSrc) {
  let clues = JSON.parse(localStorage.getItem('clues')) || [];

  // Aqui, verificamos se a pista com o mesmo id ou imgSrc já existe
  // Mas devemos garantir que a pista seja adicionada corretamente na primeira vez
  if (!clues.some(clue => clue.id === id || clue.imgSrc === imgSrc)) {
      clues.push({ id, imgSrc });
      localStorage.setItem('clues', JSON.stringify(clues));
      console.log('Pista adicionada:', { id, imgSrc });
  } else {
      // Se a pista já existir, apenas mostramos uma mensagem, mas não impedimos a adição
      console.log('Pista já existente, não adicionada:', { id, imgSrc });
  }
}

// Disponibiliza a função globalmente
window.addClue = addClue;
