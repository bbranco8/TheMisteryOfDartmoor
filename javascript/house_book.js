function activate_hound() {
    let text_hound = document.querySelector('#text_hound');
    let sherlock_hound = document.querySelector('#sherlock_hound');

    text_hound.style.display = 'block';
    sherlock_hound.style.display = 'block';
}

function deactivate_hound() {
    let text_hound = document.querySelector('#text_hound');
    let sherlock_hound = document.querySelector('#sherlock_hound');

    text_hound.style.display = 'none';
    sherlock_hound.style.display = 'none';
}