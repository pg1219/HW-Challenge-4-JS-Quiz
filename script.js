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

  currentQuestion.choices.forEach(function (choice, i) {
    var choices = document.createElement("button");
    choices.setAttribute("class", "choice");
    choices.setAttribute("value", choice);

    choices.textContent = i + 1 + ". " + choice;

    choices.onclick = questionClick;

    choicesEl.appendChild(choices);
  });
}

function questionClick(event) {
  var buttonEl = event.target;

  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
  }

  currentQuestionIndex++;

  if (time <= 0 || currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

function endQuiz() {
  clearInterval(timerId);

  questionsEl.setAttribute("class", "hide");

  var endScreen = document.getElementById("end-screen");
  endScreen.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

function saveHighScore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);

    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "scores.html";
  }
}
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighScore();
  }
}

function publishHighScores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    var liEl = document.createElement("li");
    liEl.textContent = score.initials + score.score;

    var olEL = document.getElementById("highscores");
    olEL.appendChild(liEl);
  });
}

publishHighScores();

startBtn.addEventListener("click", function () {
  startQuiz();
});

submitBtn.addEventListener("click", function () {
  saveHighScore();
});

initialsEl.onkeyup = checkForEnter;
