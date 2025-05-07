// questions and answers for frankland
let frankland = document.querySelector('#dr_frankland');
let questions = document.querySelector('#frankland_questions');
let question_images = document.querySelector('.question_images');
let answer_container = document.querySelector('#answer_container');
let answer_image = document.querySelector('#answer');
let question1 = document.querySelector('#question_1');
let question2 = document.querySelector('#question_2');

let selected_question = null; // To track which question was selected

// Toggle question box and show both questions (after clicking Dr. Frankland)
frankland.addEventListener('mouseover', (event) => {
    // Prevent click from propagating to the document
    event.stopPropagation();

    let hidden = questions.classList.contains('hidden');
    questions.classList.toggle('hidden', !hidden);

    // Reset view: show questions, hide answer, and make both questions available
    question1.classList.remove('disabled');
    question2.classList.remove('disabled');
    question_images.classList.remove('hidden');
    answer_container.classList.add('hidden');
    answer_image.classList.add('hidden');
    answer_image.src = '';

    // If a question was previously selected, make it available, and disable the other
    if (selected_question) {
        if (selected_question === 'q1') {
            question2.classList.add('disabled');
        } else if (selected_question === 'q2') {
            question1.classList.add('disabled');
        }
    }
});

// Close the questions and answers if clicking anywhere outside the question box
document.addEventListener('click', (event) => {
    if (!questions.contains(event.target) && !frankland.contains(event.target)) {
        questions.classList.add('hidden');
        answer_container.classList.add('hidden');
        answer_image.classList.add('hidden');
    }
});

// Prevent the click event from propagating to the document when clicking inside the question box
questions.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Hide questions/answers when clicking a question
function show_answer(question_id) {
    let answer_src = '';
    switch (question_id) {
        case 'q1':
            answer_src = 'images/baskerville/questions/answer_frankland_1.png';
            break;
        case 'q2':
            answer_src = 'images/baskerville/questions/answer_frankland_2.png';
            break;
    }

    if (answer_src) {
        // Set the answer image and toggle views
        answer_image.src = answer_src;
        question_images.classList.add('hidden');
        answer_container.classList.remove('hidden');
        answer_image.classList.remove('hidden');

        // Disable the other question once one is clicked
        if (question_id === 'q1') {
            question2.classList.add('disabled');
        } else if (question_id === 'q2') {
            question1.classList.add('disabled');
        }

        // Save which question was selected
        selected_question = question_id;
    }
}


// sherlock's reflection of dr stapleton
function activate_stapleton() { 
    let text_stapleton = document.querySelector('#text_stapleton');
    let sherlock_stapleton = document.querySelector('#sherlock_stapleton');

    text_stapleton.style.display = 'block';
    sherlock_stapleton.style.display = 'block';
}

function deactivate_stapleton() {
    let text_stapleton = document.querySelector('#text_stapleton');
    let sherlock_stapleton = document.querySelector('#sherlock_stapleton');

    text_stapleton.style.display = 'none';
    sherlock_stapleton.style.display = 'none';
}