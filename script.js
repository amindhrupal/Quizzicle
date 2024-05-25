const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { Text: "Shark", correct: false },
            { Text: "Blue Whale", correct: true },
            { Text: "Elephant", correct: false },
            { Text: "Griraffe", correct: false },
        ]
    },

    {
        question: "What is the largest desert in the world?",
        answers: [
            { Text: "Sahara Desert", "correct": true },
            { Text: "Gobi Desert", "correct": false },
            { Text: "Australian Outback", "correct": false },
            { Text: "Arabian Desert", "correct": false }
        ]
    },

    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        answers: [
            { Text: "China", "correct": false },
            { Text: "India", "correct": false },
            { Text: "Japan", "correct": true },
            { Text: "South Korea", "correct": false }
        ]
    },

    {
        question: "What is the smallest unit of matter?",
        answers: [
            { Text: "Atom", "correct": true },
            { Text: "Molecule", "correct": false },
            { Text: "Cell", "correct": false },
            { Text: "Organ", "correct": false }
        ]
    },

    {
        question: "What is the process by which plants convert sunlight into energy?",
        answers: [
            { Text: "Photosynthesis", "correct": true },
            { Text: "Cellular respiration", "correct": false },
            { Text: "Evaporation", "correct": false },
            { Text: "Condensation", "correct": false }
        ]
    },
    {
        question: "On which continent is the Amazon rainforest located?",
        answers: [
            { Text: "Africa", "correct": false },
            { Text: "North America", "correct": false },
            { Text: "South America", "correct": true },
            { Text: "Australia", "correct": false }
        ]
    },

    {
        question: "What is the tallest mountain in the world?",
        answers: [
            { Text: "Mount Everest", "correct": true },
            { Text: "K2", "correct": false },
            { Text: "Mount Kilimanjaro", "correct": false },
            { Text: "Mount Fuji", "correct": false }
        ]
    },
    {
        question: "Which bird is known for its ability to mimic sounds?",
        answers: [
            { Text: "Parrot", "correct": true },
            { Text: "Eagle", "correct": false },
            { Text: "Penguin", "correct": false },
            { Text: "Ostrich", "correct": false }
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
