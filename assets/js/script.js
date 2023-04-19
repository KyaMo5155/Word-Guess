//Start button section
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}



let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

//Start of question section 
const questions = [
    {
        //Start of question 1 
        question: "What symbol is used for a ID selector in CSS?",
        answers: [
            {text: "^", correct: false},
            {text: "%", correct: false},
            {text: "$", correct: false},
            {text: "#", correct: true},
        ]
    },
    //End of question 1 

     //start of question 2 
    {
        question: "how many types of functions are in javascript?",
        answers: [
            {text: "5", correct: false},
            {text: "4", correct: true},
            {text: "2", correct: false},
            {text: "7", correct: false},
        ] 
    },
     //End of question 2 

     //start of question 3 
    {
        question: "what are the 3 types errors",
        answers: [
            {text: "Syntax, Runtime and Logcial", correct: true},
            {text: "Logical, Runtime, and Flow ", correct: false},
            {text: "Array, Runtime and Flow", correct: false},
            {text: "Syntax, Logical and Array", correct: false},
        ]
    },
     //End of question 3 

     //start of question 4 
    {
        question: "what does CSS stand for", 
        answers: [
            {text: "coding screen style^", correct: false},
            {text: "common style sheet", correct: false},
            {text: "cascading style sheet", correct: true},
            {text: "creative screen style", correct: false},
        ]
    },
     //End of question 4 

      //start of question 5 
    {
        question: "What is a array in javascript?",
        answers: [
            {text: "a way to store mutiple varibles", correct: true},
            {text: "creates only nubmber variables ", correct: false},
            {text: "A storage format that defines the way data is stored", correct: false},
            {text: "a long string of words", correct: false},
        ]
    }
     //End of question 5 
     //End of question section
];

//Adding selecters 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//Adding variables 
let currentQuestionIndex = 0;
let score = 0;
//start of function section
function startQuiz(){
    currentQuestionIndex = 0;//makes sure the quiz starts at question1
    score = 0;// sets start score to 0
    nextButton.innerHTML = "Next";
    showQuestion();
    time_line = ("header .time_line");
    timeText = (".timer .time_left_txt");
    timeCount = (".timer .timer_sec");
}
//displays question with question number
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
//displays the answers 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

//hides the previous answer display
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
// displays if answer is correct or incorrect
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // disables other opitions after answer selected
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showsScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

//defining handle next button
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showsScore();
    }
}
//adding content to next button
nextButton.addEventListener("click", ()=>{
if(currentQuestionIndex < questions.length){
    handleNextButton();
}else{
    startQuiz();
}
})

startQuiz();