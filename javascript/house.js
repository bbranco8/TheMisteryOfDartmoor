function addClue(id, imgSrc, description) {
    let clues = JSON.parse(localStorage.getItem('clues')) || [];

    // Verifica se a pista já existe (para não duplicar)
    if (!clues.some(clue => clue.id === id)) {
        // Adiciona os dados corretos da pista
        clues.push({ id, imgSrc, description });
        localStorage.setItem('clues', JSON.stringify(clues)); // Guarda as pistas no localStorage
        console.log('Pista adicionada ao localStorage:', { id, imgSrc }); // Verifica os dados
    }
}