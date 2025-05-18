// TIMER
let timer = document.querySelector("#timer");
let entry = document.querySelector("#exit");

// Set the initial time (in seconds)
let time_left = 5 * 60; // 5 minutes in seconds
let interval;

let sound_1 = document.querySelector("#sound_1");
let sound_2 = document.querySelector("#sound_2");
let sound_3 = document.querySelector("#sound_3");
let play = document.querySelector("#play");

document.addEventListener('DOMContentLoaded', () => {
  let sound_on = false;
  play.addEventListener("click", () => {
    if (sound_on) {
      sound_1.pause();
      sound_2.pause();
      sound_3.pause();
      play.src = "images/nav/no_sound.png";
    } else {
      sound_1.play();
      sound_2.play();
      sound_2.volume = 0.1;
      sound_3.play();
      sound_3.volume = 0.2;
      play.src = "images/nav/sound.png";
    }

    sound_on = !sound_on;
  });
});


function updateTimer() {
    let minutes = Math.floor(time_left / 60);
    let seconds = time_left % 60;

    // Format time as mm:ss
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    timer.textContent = minutes + ":" + seconds;

    // If time runs out
    if (time_left <= 0) {
        clearInterval(interval);
        redirect();
    }
    time_left--;
}

// Start the timer
interval = setInterval(updateTimer, 100);

// Show the entry image and redirect after a few seconds
function redirect() {
    sound.pause();
    sound.currentTime = 0;

    // Show entry image
    entry.style.display = "block";

    // Wait a few seconds before redirecting
    setTimeout(function () {
        window.location.href = "map.html";
    }, 5000); // 5000 milliseconds = 5 seconds
}



// --------------------------------------
// QUESTIONS AND ANSWERS FOR DR FRANKLAND
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
            answer_src = 'images/baskerville/first/questions/answer_frankland_1.png';
            break;
        case 'q2':
            answer_src = 'images/baskerville/first/questions/answer_frankland_2.png';
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