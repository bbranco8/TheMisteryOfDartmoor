// QUESTIONS AND ANSWERS FOR DR FRANKLAND
let hunter = document.querySelector('#hunter');
let questions = document.querySelector('#hunter_questions');
let question_images = document.querySelector('.question_images');
let answer_container = document.querySelector('#answer_container');
let answer_image = document.querySelector('#answer_image');
let question1 = document.querySelector('#question_1');
let question2 = document.querySelector('#question_2');
let question3 = document.querySelector('#question_3');

let selected_question = null; // To track which question was selected

let sound = document.querySelector("#sound");
let play = document.querySelector("#play");

document.addEventListener('DOMContentLoaded', () => {
  let sound_on = false;
  play.addEventListener("click", () => {
    if (sound_on) {
      sound.play();
      play.src = "images/nav/sound.png";
      play.classList.remove("pulse"); // REMOVE animação
    } else {
      sound.pause();
      play.src = "images/nav/no_sound.png";
      play.classList.add("pulse"); // ADICIONA animação
    }

    sound_on = !sound_on;
  });
});


// Toggle question box and show both questions (after clicking Dr. Frankland)
hunter.addEventListener('mouseover', (event) => {
    event.stopPropagation();

    // Only show questions if currently hidden
    if (questions.classList.contains('hidden')) {
        questions.classList.remove('hidden');

        // Reset view
        question1.classList.remove('disabled');
        question2.classList.remove('disabled');
        question3.classList.remove('disabled');
        question_images.classList.remove('hidden');
        answer_container.classList.add('hidden');
        answer_image.classList.add('hidden');
        answer_image.src = '';

        if (selected_question) {
            if (selected_question === 'q1') {
                question2.classList.add('disabled');
                question3.classList.add('disabled');
            } else if (selected_question === 'q2') {
                question1.classList.add('disabled');
                question3.classList.add('disabled');
            } else if (selected_question === 'q3') {
                question1.classList.add('disabled');
                question2.classList.add('disabled');
            }
        }
    }
});

// Close the questions and answers if clicking anywhere outside the question box
document.addEventListener('click', (event) => {
    if (!questions.contains(event.target) && !hunter.contains(event.target)) {
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
            answer_src = 'images/grimpen/questions/answer_hunter_1.png';
            break;
        case 'q2':
            answer_src = 'images/grimpen/questions/answer_hunter_2.png';
            break;
        case 'q3':
            answer_src = 'images/grimpen/questions/answer_hunter_3.png';
            break;
    }

    if (answer_src) {
        // Set the answer image and toggle views
        answer_image.src = answer_src;
        question_images.classList.add('hidden');
        answer_container.classList.remove('hidden');
        answer_image.classList.remove('hidden');

        // Save which question was selected
        selected_question = question_id;
    }
}



// --------------------------------------
// SHERLOCK'S REFLECTION OF DR STAPLETON
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