function activate_word() {
    let text_word = document.querySelector('#text_word');
    let sherlock_word = document.querySelector('#sherlock_word');

    text_word.style.display = 'block';
    sherlock_word.style.display = 'block';
}

function deactivate_word() {
    let text_word = document.querySelector('#text_word');
    let sherlock_word = document.querySelector('#sherlock_word');

    text_word.style.display = 'none';
    sherlock_word.style.display = 'none';
}