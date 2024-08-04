// Define the questions for the quiz
const quizData = [
    {
      question: "What is the capital of Nigeria?",
      answers: [
        { text: "Lagos", correct: false },
        { text: "Ibadan", correct: false },
        { text: "Abuja", correct: true },
        { text: "Uyo", correct: false },
      ],
    },
    {
      question: "Which planet is closest to the Sun?",
      answers: [
        { text: "Venus", correct: false },
        { text: "Mars", correct: false },
        { text: "Jupiter", correct: false },
        { text: "Mercury", correct: true },
      ],
    },
    {
      question: "Who is the current President of Nigeria?",
      answers: [
        { text: "Goodluck Jonathan", correct: false },
        { text: "Umar Yaradua", correct: false },
        { text: "Bola Tinubu", correct: true },
        { text: "Ernest Shonekan", correct: false },
      ],
    },
    {
        question: "Which is the largest ocean on Earth?",
        answers: [
          { text: "Artic Ocean", correct: false },
          { text: "Atlantic Ocean", correct: false },
          { text: "Pacific Ocean", correct: true },
          { text: "Indian Ocean", correct: false },
        ], 
    },
    {
        question: "Which animal is considered the King of the Jungle?",
      answers: [
        { text: "Tiger", correct: false },
        { text: "Lion", correct: true },
        { text: "Elephant", correct: false },
        { text: "Giraffe", correct: false },
      ],
    },
    {
        question: "What is the chemical symbol for silver?",
      answers: [
        { text: "Cu", correct: false },
        { text: "Ag", correct: true },
        { text: "Na", correct: false },
        { text: "Hg", correct: false },
      ],
    },
    {
        question: "How many colors are there in a rainbow?",
      answers: [
        { text: "6", correct: false },
        { text: "8", correct: false },
        { text: "9", correct: false },
        { text: "7", correct: true },
      ],
    },
    {
        question: "Who is the kings of the gods in Greek mythology?",
      answers: [
        { text: "Zeus", correct: true },
        { text: "Ares", correct: false },
        { text: "Apollo", correct: false },
        { text: "Aphrodite", correct: false },
      ],
    },
    {
        question: "What year was the very first model of the iPhone released?",
      answers: [
        { text: "2008 ", correct: false },
        { text: "2006", correct: false },
        { text: "2005", correct: false },
        { text: "2007", correct: true },
      ],
    },
    {
        question: "Which programming language is often used for <b>developing</b> Android applications?",
      answers: [
        { text: "HTML", correct: false },
        { text: "CSS", correct: false },
        { text: "REACT", correct: false },
        { text: "JAVA", correct: true },
      ],
    }
  ];

  // Function to shuffle the questions when refreshed
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Selecting the HTML elements
  const questionContainer = document.querySelector(".questions");
  const resultsContainer = document.querySelector(".results");
  const correctAnswerContainer = document.querySelector(".correct-answer");
  const restartButton = document.querySelector("#restart");
  const totalSpan = document.querySelector("#total");
  const correctSpan = document.querySelector("#correct");
  
  // Function to shuffle the answers within each question after the game
  function shuffleAnswers() {
    quizData.forEach((question) => {
      shuffleArray(question.answers);
    });
  }
  
  // Defining global variables
  let currentQuestionIndex = 0;
  let numCorrect = 0;
  
  // Function populating the HTML with question and answer options
  function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
          <p>${currentQuestion.question}</p>
          <ul>
              ${currentQuestion.answers
                .map(
                  (answer) => `
                      <li>
                          <button class="answer-btn">${answer.text}</button>
                      </li>
                  `
                )
                .join("")}
          </ul>
      `;
    const answerButtons = document.querySelectorAll(".answer-btn");
    answerButtons.forEach((button) => {
      button.addEventListener("click", checkAnswer);
    });
    questionContainer.style.display = "block";
    correctAnswerContainer.style.display = "none";
  }
  
  // Function to check the selected answer and update global variables accordingly
  function checkAnswer(e) {
    const selectedButton = e.target;
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = currentQuestion.answers.find(
      (answer) => answer.text === selectedButton.textContent
    ).correct;
  
    correctAnswerContainer.style.display = "block";
    correctAnswerContainer.innerHTML = isCorrect
      ? `<p style="color: green; font-weight: bold">Correct!</p>`
      : `<p style="color: red; font-weight: bold">Incorrect! The correct answer is "${
          currentQuestion.answers.find((answer) => answer.correct).text
        }".</p>`;
  
    if (isCorrect) {
      numCorrect++;
    }
  
    currentQuestionIndex++;
    questionContainer.style.display = "none";
  
    // Wait for 2 seconds before showing the next question
    setTimeout(() => {
      if (currentQuestionIndex === quizData.length) {
        showResults();
      } else {
        showQuestion();
      }
    }, 2000); 
  }
  
  // Function to display the final game results
function showResults() {
    questionContainer.style.display = "none";
    resultsContainer.style.display = "block";
    resultsContainer.innerHTML = `
      <h2 style="color: blue; font-weight: bold;">Results</h2>
      <p style="color: blue; font-weight: bold;">
        You got <span id="correct">${numCorrect}</span> out of
        <span id="total">${quizData.length}</span> correct!
      </p>
      <button id="restart" style="background-color: blue; font-weight: bold;">Restart Quiz</button>
    `;
  
    // Adding event listener to restart the game
    document.querySelector("#restart").addEventListener("click", () => {
      currentQuestionIndex = 0;
      numCorrect = 0;
      questionContainer.style.display = "block";
      resultsContainer.style.display = "none";
      shuffleAnswers();
      shuffleArray(quizData);
      showQuestion();
    });
  }
  
  // Initializing the game by showing the first question
  shuffleAnswers(); 
  shuffleArray(quizData);
  showQuestion();
  