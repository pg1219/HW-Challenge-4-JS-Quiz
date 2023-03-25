var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  
  questionsEl.removeAttribute("class");
  
  timerId = setInterval(clockTick, 1000);
  
  timerEl.textContent = time;
  
  getQuestion();
}



function getQuestion() {
  
  
  var currentQuestion = questions[currentQuestionIndex];
  
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  
  choicesEl.innerHTML = "";
  console.log(choices.innerHTML)
  
  currentQuestion.choices.forEach(function (choice, i) {
    
    var choices = document.createElement("button");
    choices.setAttribute("class", "choice");
    choices.setAttribute("value", choice);
    
    choices.textContent = i + 1 + ". " + choice;
    // console.log(choices.textContent)
    choices.onclick = questionClick;
    // console.log(choices.onclick)
    
    choicesEl.appendChild(choices);
    // console.log(choicesEl.appendChild(choices))
  });
}



function questionClick(event) {
  var buttonEl = event.target;
  
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    
    time -= 10;
    
    if (time < 0) {
      time = 0;
    }
  }
  currentQuestionIndex++;

  if (time <= 0 || currentQuestionIndex === questions.length) {
  
    quizEnd();
  } else {
  
    getQuestion();
  }
}
