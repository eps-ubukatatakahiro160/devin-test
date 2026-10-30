const test = require("node:test");
const assert = require("node:assert");
const { QUESTIONS } = require("../js/questions.js");
const { isCorrect, calculateScore, getScoreMessage } = require("../js/quiz.js");

test("問題は10問で、WSL と Git が5問ずつ", () => {
  assert.strictEqual(QUESTIONS.length, 10);
  assert.strictEqual(QUESTIONS.filter((q) => q.category === "WSL").length, 5);
  assert.strictEqual(QUESTIONS.filter((q) => q.category === "Git").length, 5);
});

test("各問題は4択で、正解インデックスが範囲内、選択肢に重複がない", () => {
  QUESTIONS.forEach((q) => {
    assert.strictEqual(q.choices.length, 4);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length);
    assert.strictEqual(new Set(q.choices).size, q.choices.length);
    assert.ok(q.question && q.explanation);
  });
});

test("isCorrect は正解インデックスのときだけ true", () => {
  const q = { choices: ["a", "b", "c", "d"], answer: 2 };
  assert.strictEqual(isCorrect(q, 2), true);
  assert.strictEqual(isCorrect(q, 0), false);
});

test("calculateScore は正解数を数える", () => {
  assert.strictEqual(calculateScore([]), 0);
  assert.strictEqual(calculateScore([{ correct: true }, { correct: false }, { correct: true }]), 2);
});

test("全問正解・全問不正解のスコア", () => {
  const all = QUESTIONS.map((q) => ({ correct: isCorrect(q, q.answer) }));
  const none = QUESTIONS.map((q) => ({ correct: isCorrect(q, (q.answer + 1) % 4) }));
  assert.strictEqual(calculateScore(all), 10);
  assert.strictEqual(calculateScore(none), 0);
});

test("getScoreMessage はスコア帯に応じたメッセージを返す", () => {
  assert.match(getScoreMessage(10, 10), /全問正解/);
  assert.match(getScoreMessage(7, 10), /よくできました/);
  assert.match(getScoreMessage(4, 10), /まずまず/);
  assert.match(getScoreMessage(0, 10), /もう一度/);
});
