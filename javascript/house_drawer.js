function activate_photo() {
    let text_photo = document.querySelector('#text_photo');
    let sherlock_photo = document.querySelector('#sherlock_photo');

    text_photo.style.display = 'block';
    sherlock_photo.style.display = 'block';
}

function deactivate_photo() {
    let text_photo = document.querySelector('#text_photo');
    let sherlock_photo = document.querySelector('#sherlock_photo');

    text_photo.style.display = 'none';
    sherlock_photo.style.display = 'none';
}