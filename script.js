const questions = [
    {
      text: "What is the highest heading?",
      choices: ["<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>"],
      answer: "<h1>"
    },
    {
      text: "What is the lowest heading?",
      choices: ["<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>"],
      answer: "<h6>"
    },
    {
      text: "What type of element is a div?",
      choices: ["inline-block", "block", "inline-table", "table"],
      answer: "block"
    },
    {
      text: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "High Technology Markup Language", "Hyperloop Technology Markup Language", "High Traffic Markup Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      text: "What is the correct HTML element for inserting a line break?",
      choices: ["<br>", "<lb>", "<break>", "<newline>"],
      answer: "<br>"
    }
  ];
  
  let questionIndex = 0;
  let score = 0;
  const quizEl = document.querySelector(".quiz");
  const endEl = document.querySelector(".end");
  const startButton = document.getElementById("start-btn");
  const timerEl = document.getElementById("timer");
  
  function askQuestion() {
    const currentQuestion = questions[questionIndex];
    const questionText = document.querySelector(".question-text");
    questionText.textContent = currentQuestion.text;
    const buttonBox = document.querySelector(".button-box");
    buttonBox.innerHTML = "";
  
    currentQuestion.choices.forEach(function (choice) {
      const button = document.createElement("button");
      button.textContent = choice;
      button.setAttribute("value", choice);
      button.classList.add("choice-btn");
      button.addEventListener("click", function (event) {
        const userAnswer = this.value;
        if (userAnswer === currentQuestion.answer) {
          score++;
        }
        questionIndex++;
        if (questionIndex < questions.length) {
          askQuestion();
        } else {
          endQuiz();
        }
      });
      buttonBox.appendChild(button);
    });
  }
  
  function startQuiz() {
    startButton.style.display = "none";
    quizEl.classList.remove("hide");
    quizEl.classList.add("show");
    askQuestion();
    startTimer();
  }
  
  function startTimer() {
    let timeLeft = 60;
    timerEl.textContent = "Time: " + timeLeft;
  
    const timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = "Time: " + timeLeft;
  
      if (timeLeft === 0 || questionIndex === questions.length) {
        clearInterval(timeInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  function endQuiz() {
    quizEl.classList.add("hide");
    endEl.classList.remove("hide");
    endEl.classList.add("show");
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score + " out of " + questions.length;
  }
  
  startButton.addEventListener("click", startQuiz);
  
