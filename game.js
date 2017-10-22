$(document).ready(function() {



function initialScreen() {
  startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
  $(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
  event.preventDefault();  
  console.log("you clicked me")


  buildQuiz()
  

});



function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function buildQuiz() {
  const output = [];

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = shuffle(currentQuestion.answers).map(ans => {
      return `<label><input type="radio" name="question${questionNumber}" value="${ans.v}">${ans.v}</input></label>`
      ;
    });
    
    output.push(
      `<div class="question"> ${currentQuestion.question}</div>`,
      `<div class="answers"> ${answers.join("")} </div>`
    );
  });

  quizElement.innerHTML = output.join("");

  stop()
  run();
  timerWrapper();


}


function showResults() {
  const answerContainers = quizElement.querySelectorAll(".answers");

  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    console.log(userAnswer)
    const correctAns = currentQuestion.answers.find(x => x.correct).v;
    if (userAnswer === correctAns) {
      numCorrect++;
      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizElement = document.getElementById("quiz");
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById("submit");


// write a funcitons that says pull 10 quesitons from pool, with out repetaing questions that havent been seen. when all questions have been seen GAME OVER. HAMSTUDY. 
const myQuestions = [
  {
    question: "What does gamora say to Quill at the end of the movie when he asks her what?",
    answers: [
      {v: "  You should have learned"},
      {v: "  This was my opportunity to get away from Thanos."},
      {v: "  It's just some unspoken thing.", correct: true},
      {v: "  It's time we stand up for what is right."}
    ] 
  },
  {
    question: "What does Yandu use to control the whistle?",
    answers: [
      {v: "  His Head"},
      {v: "  His Finn"},
      {v: "  His Heart", correct: true},
      {v: "  His Feet"}
    ]
  },
  {
    question: "Who is Quill's father?",
    answers: [
      {v: "  Yandu"},
      {v: "  Papa Drax"},
      {v: "  Ego", correct: true},
      {v: "  TraserFace"}
    ]
  },
    {
    question: "Why is yandu in trouble with the ravagers?",
    answers: [
      {v: "  Didn't have controle over his crew"},
      {v: "  Drank to much."},
      {v: "  He dealt in children", correct: true},
      {v: "  Helped Quill."}
    ]
  },
    {
    question: "What does drax call the batteries?",
    answers: [
      {v: "  Sonnenschein"},
      {v: "  Trojan"},
      {v: "  Arbulary batteries", correct: true},
      {v: "  Yuasa"}
    ]
  },
  // {
  //   question: "How many jumps does rocket take to get to egos planet?",
  //   answers: [
  //     {v: "  500"},
  //     {v: "  900"},
  //     {v: "  700", correct: true},
  //     {v: "  400"}
  //   ] 
  // },
  // {
  //   question: "What is the name of egos companion?",
  //   answers: [
  //     {v: "  Moth"},
  //     {v: "  Mosquito"},
  //     {v: "  Mantis", correct: true},
  //     {v: "  Maggot"}
  //   ]
  // },
  // {
  //   question: "What is mantis?",
  //   answers: [
  //     {v: "  Telepath"},
  //     {v: "  Mind reader"},
  //     {v: "  An empath", correct: true},
  //     {v: "  Flyer"}
  //   ]
  // },
  //   {
  //   question: "What does ego cal quills mother?",
  //   answers: [
  //     {v: "  lily river"},
  //     {v: "  first lover"},
  //     {v: "  River lily", correct: true},
  //     {v: "  lily"}
  //   ]
  // },
  //   {
  //   question: "What is the song ego uses to try and get quill?",
  //   answers: [
  //     {v: "  Lake Shore Drive"},
  //     {v: "  Fox on the Run"},
  //     {v: "  Brandy you're a fine girl", correct: true},
  //     {v: "  Mr. Blue Sky's"}
  //   ]
  // },
];

submitButton.addEventListener("click", showResults);


function randomAnswerIdx() {
  const rand = Math.random() * v.length;
  return Math.floor(rand)
}

function randomQuestionIdx() {
  const rand = Math.random() * myQuestions.length;
  return Math.floor(rand);
}

const questionsSeen = {};
let randomIdx = randomQuestionIdx();
while (questionsSeen[randomIdx]) {
  randomIdx = randomQuestionIdx();
  // if (number === 0);
}


function generateLossDueToTimeOut() {
  unansweredTally++;
  $(".tallyArea").html(gameHTML);
  setTimeout(wait, 4000);  
}


function generateWin() {
  correctTally++;
  $(".tallyArea").html(gameHTML);
  setTimeout(wait, 4000);  
}

function generateLoss() {
  incorrectTally++;
  $(".tallyArea").html(gameHTML);
  setTimeout(wait, 4000);
}

var number;
setNumber();


var intervalId;

function run() {
  console.log("run");
    intervalId = setInterval(timerWrapper, 1000);
}

function timerWrapper() {
  console.log("tw");
  number--;
  if (number === -1){
    $("#showNumber").html("Out of Time")
    $(".start-button").html("<button>Play Again</button>")

    stop()  
  } else  {
    $("#showNumber").html("<h2>" + number + "</h2>");
  }
}



function stop() {
  console.log("stop");
    clearInterval(intervalId);
    setNumber();
}

function setNumber() {
  number = 30;
}
var startScreen;
var gameHTML;
var questionCounter = 0;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

});
