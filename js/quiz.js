function isCorrect(question, choiceIndex) {
  return question.answer === choiceIndex;
}

function calculateScore(history) {
  return history.filter((entry) => entry.correct).length;
}

function getScoreMessage(score, total) {
  const rate = total === 0 ? 0 : score / total;
  if (rate === 1) return "全問正解！完璧です。";
  if (rate >= 0.7) return "よくできました！あと少しで満点です。";
  if (rate >= 0.4) return "まずまずです。解説を見て復習しましょう。";
  return "もう一度チャレンジしてみましょう。";
}

function initQuizApp(questions) {
  const $ = (id) => document.getElementById(id);
  const screens = {
    start: $("start-screen"),
    quiz: $("quiz-screen"),
    result: $("result-screen"),
  };

  const state = { index: 0, answered: false, history: [] };

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      el.classList.toggle("hidden", key !== name);
    });
  }

  function startQuiz() {
    state.index = 0;
    state.answered = false;
    state.history = [];
    showScreen("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const q = questions[state.index];
    state.answered = false;

    $("progress").textContent = `第${state.index + 1}問 / ${questions.length}`;
    $("category").textContent = q.category;
    $("question").textContent = q.question;
    $("feedback").classList.add("hidden");
    $("next-btn").classList.add("hidden");

    const choicesEl = $("choices");
    choicesEl.innerHTML = "";
    q.choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.textContent = choice;
      btn.addEventListener("click", () => selectAnswer(i));
      choicesEl.appendChild(btn);
    });
  }

  function selectAnswer(choiceIndex) {
    if (state.answered) return;
    state.answered = true;

    const q = questions[state.index];
    const correct = isCorrect(q, choiceIndex);
    state.history.push({ question: q, selected: choiceIndex, correct });

    const buttons = $("choices").querySelectorAll(".choice");
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add("correct");
      else if (i === choiceIndex) btn.classList.add("incorrect");
    });

    const resultEl = $("feedback-result");
    resultEl.textContent = correct ? "正解！" : `不正解… 正解は「${q.choices[q.answer]}」です。`;
    resultEl.className = `feedback-result ${correct ? "correct" : "incorrect"}`;
    $("feedback-explanation").textContent = q.explanation;
    $("feedback").classList.remove("hidden");

    const nextBtn = $("next-btn");
    nextBtn.textContent = state.index === questions.length - 1 ? "結果を見る" : "次へ";
    nextBtn.classList.remove("hidden");
    nextBtn.focus();
  }

  function nextQuestion() {
    if (!state.answered) return;
    state.index += 1;
    if (state.index < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    const score = calculateScore(state.history);
    const total = questions.length;
    const percent = Math.round((score / total) * 100);

    $("score").textContent = `${score} / ${total} 問正解（${percent}%）`;
    $("score-message").textContent = getScoreMessage(score, total);

    const reviewEl = $("review");
    reviewEl.innerHTML = "";
    state.history.forEach(({ question, selected, correct }) => {
      const li = document.createElement("li");

      const mark = document.createElement("span");
      mark.className = correct ? "mark-correct" : "mark-incorrect";
      mark.textContent = correct ? "○ " : "× ";
      li.appendChild(mark);
      li.appendChild(document.createTextNode(question.question));

      const detail = document.createElement("div");
      detail.textContent = correct
        ? `あなたの回答: ${question.choices[selected]}`
        : `あなたの回答: ${question.choices[selected]} ／ 正解: ${question.choices[question.answer]}`;
      li.appendChild(detail);

      reviewEl.appendChild(li);
    });

    showScreen("result");
  }

  $("start-btn").addEventListener("click", startQuiz);
  $("next-btn").addEventListener("click", nextQuestion);
  $("restart-btn").addEventListener("click", startQuiz);
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => initQuizApp(QUESTIONS));
}

if (typeof module !== "undefined") {
  module.exports = { isCorrect, calculateScore, getScoreMessage };
}
