document.addEventListener('DOMContentLoaded', function () {
    const open = document.querySelector('#answer');
    const close = document.querySelector('#close_answer');
    const overlay = document.querySelector('#answer_overlay');
    const submit = document.querySelector('#submit_culprit');

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

    // Submissão do culpado
    if (submit) {
        submit.addEventListener('click', function () {
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
});