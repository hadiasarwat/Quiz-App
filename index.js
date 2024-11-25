var container = document.getElementById('container');
var questionBox = document.getElementById('question');
var choicesBox = document.getElementById('choices');
var nextBtn = document.getElementById('nextBtn');
var scoreCard = document.getElementById('scoreCard');
var alert = document.getElementById('alert');
var startBtn = document.getElementById('startBtn');
var timer = document.getElementById('timer');


// Make an array of objects that stores question, choices of question and answer
var quiz = [
    {
        question: "Q 1. Who is making the Web standards?",
        choices: ["Google", "Microsoft", "Mozilla", "The World Wide Web Consortium (W3C)"],
        answer: "The World Wide Web Consortium (W3C)"
    },
    {
        question: "Q 2. In Git, which command is used to view the history of commits?",
        choices: ["git commit", "git log", " git init", "git history"],
        answer: "git log"
    },
    {
        question: "Q 3. What is the correct way to declare a JavaScript variable?",
        choices: ["var myVariable", "let myVariable", "const myVariable", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Q 4.  Which of the following is not a valid CSS property?",
        choices: [" outline-radius", "margin", "padding", " border-radius"],
        answer: " outline-radius"
    },
    {
        question: "Q 5.  Which of the following is not a programming language?",
        choices: ["Python", "Java", "HTML", " C++"],
        answer: " HTML"
    }
];

// Making Variables
var currentQuestionIndex = 0;
var score = 0;
var quizOver = false;
var timeLeft = 15;
var timerID = null;



function showQuestions() {
    var questionDetails = quiz[currentQuestionIndex];
    questionBox.innerHTML = questionDetails.question;
    choicesBox.innerHTML = "";
    for (var i = 0; i < questionDetails.choices.length; i++) {
      var currentChoice = questionDetails.choices[i];
      var choiceDiv = document.createElement('div');
      choiceDiv.innerHTML = currentChoice;
      choiceDiv.className = 'choice';
      choicesBox.appendChild(choiceDiv);
      choiceDiv.onclick = function() {
        if (this.className.indexOf('selected') != -1) {
          this.className = this.className.replace('selected', '');
        } else {
          this.className += ' selected';
        }
      };
    }
    if (currentQuestionIndex < quiz.length) {
      startTimer();
    }
  }

// Function to check answers
function checkAnswer  (){
    var selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
 function showScore (){
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent =` You Scored ${score} out of ${quiz.length}! `;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
function displayAlert(msg){
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}


// Function to Show timer
function startTimer() {
    clearInterval(timerID);
    timer.textContent = timeLeft;
    var countDown = function() {
      timeLeft--;
      timer.textContent = timeLeft;
      if (timeLeft === 0) {
        var confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
        if (confirmUser) {
          timeLeft = 15;
          startQuiz();
        } else {
          startBtn.style.display = "block";
          container.style.display = "none";
          return;
        }
      }
    }
    timerID = setInterval(countDown, 1000);
  }

// Function to Stop Timer
function stopTimer (){
    clearInterval(timerID);
}

// Function to shuffle question
function shuffleQuestions (){
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
function startQuiz(){
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click',function() {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
} 
);




nextBtn.addEventListener('click', function() {
    var selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
}
);

