const startDOM = document.querySelector('.start');
const mainDOM = document.querySelector('.main');
const restartDOM = document.querySelector('.restart');
let countTime = 60;
let num1 = 0;
let num2 = 0;
let operator = '';
let score = 0;
let gaming = false;
const startCount = () => {
  const timeDOM = document.querySelector('.time');
  const finalScore = document.querySelector('.finalScore-num');
  gaming = true;
  const interval = setInterval(() => {
    countTime -= 1;
    if (countTime < 10) {
      timeDOM.textContent = `00 : 0${countTime}`;
    } else {
      timeDOM.textContent = `00 : ${countTime}`;
    }
    if (countTime === 0) {
      mainDOM.classList.add('hidden');
      restartDOM.classList.remove('hidden');
      gaming = false;
      clearInterval(interval);
      finalScore.textContent = score;
    }
  }, 1000);
};
const getRandomInt = (min, max) => {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + min;
};
const getRandomOperator = () => {
  const int = getRandomInt(1, 4);
  if (int === 1) return '+';
  if (int === 2) return '-';
  if (int === 3) return '×';
  if (int === 4) return '÷';
  return undefined;
};
const calc = () => {
  if (operator === '+') return num1 + num2;
  if (operator === '-') return num1 - num2;
  if (operator === '×') return num1 * num2;
  if (operator === '÷') return num1 / num2;
  return undefined;
};

const showNumber = () => {
  document.querySelector('.answer').value = '';
  const question = document.querySelector('.question');
  if (countTime <= 20) {
    num1 = getRandomInt(100, 999);
    num2 = getRandomInt(100, 999);
  } else if (countTime <= 40) {
    num1 = getRandomInt(10, 99);
    num2 = getRandomInt(10, 99);
  } else if (countTime <= 60) {
    num1 = getRandomInt(0, 9);
    num2 = getRandomInt(0, 9);
  }
  operator = getRandomOperator();
  const checkNum = calc();
  if (checkNum % 1 !== 0) return showNumber();
  question.innerHTML = `
  ${num1}<font> ${operator} </font>${num2}<font> = </font>`;
  return undefined;
};
const showScore = () => {
  const scoreDOM = document.querySelector('.score-num');
  let num = '';
  if (score < 10) {
    num = `00${score}`;
  } else if (score < 100) {
    num = `0${score}`;
  } else {
    num = `${score}`;
  }
  scoreDOM.textContent = num;
  return undefined;
};
const checkAnswer = () => {
  const answer = Number(document.querySelector('.answer').value);
  let plusNum = 1;
  const answerNum = calc();
  if (countTime < 20) plusNum = 5;
  console.log(answerNum);
  console.log(answer);
  if (answerNum === answer) {
    score += plusNum;
  } else if (answerNum !== answer && score > 0) {
    score -= 1;
  } else {
    score = 0;
  }
  showScore();
  showNumber();
};
document.body.addEventListener('keydown', (e) => {
  if (e.keyCode === 13 && gaming) checkAnswer();
});
document.querySelector('.restart button').addEventListener('click', () => {
  restartDOM.classList.add('hidden');
  mainDOM.classList.remove('hidden');
  countTime = 60;
  num1 = 0;
  num2 = 0;
  operator = '';
  score = 0;
  startCount();
  showNumber();
});
document.querySelector('.start button').addEventListener('click', () => {
  startDOM.classList.add('hidden');
  mainDOM.classList.remove('hidden');
  startCount();
  showNumber();
});
