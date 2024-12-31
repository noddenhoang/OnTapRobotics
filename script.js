const apiUrl = "https://script.google.com/macros/s/AKfycbzVrdaBGAlLcCcBYChadL60FHJkk9NvheazcdFIgncgDJPcKdi3GOPHMpipDmYHQsJn/exec"; // URL API của bạn

let data = [];
let currentQuestion = null;

document.addEventListener("DOMContentLoaded", () => {
  fetch(apiUrl)
    .then(response => response.json())
    .then(json => {
      data = json;
      showQuestionList();
    })
    .catch(err => console.error("Error fetching data:", err));
});

function showQuestionList() {
  document.getElementById("question-list").classList.remove("hidden");
  document.getElementById("quiz").classList.add("hidden");

  const questionsList = document.getElementById("questions");
  questionsList.innerHTML = "";

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = item.cau_hoi.replace(/\\n/g, '<br>');
    li.addEventListener("click", () => startQuiz(index));
    questionsList.appendChild(li);
  });
}

function startQuiz(index) {
  currentQuestion = data[index];
  document.getElementById("question-list").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  document.getElementById("question-title").innerHTML = currentQuestion.cau_hoi.replace(/\\n/g, '<br>');
  document.getElementById("answer-input").value = "";
  document.getElementById("result").classList.add("hidden");
}

document.getElementById("submit-btn").addEventListener("click", () => {
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");

  const answerDisplay = document.getElementById("answer-display");
  answerDisplay.innerHTML = currentQuestion.dap_an.replace(/\\n/g, '<br>');
});

document.getElementById("continue-btn").addEventListener("click", () => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * data.length);
  } while (data[randomIndex] === currentQuestion);
  startQuiz(randomIndex);
});

document.getElementById("back-btn").addEventListener("click", showQuestionList);