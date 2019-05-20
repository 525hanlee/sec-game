const startDOM = document.querySelector('.start');
const mainDOM = document.querySelector('.main');
const gameStart = () => {

};

document.querySelector('.start button').addEventListener('click', () => {
  startDOM.classList.add('hidden');
  mainDOM.classList.remove('hidden');
  gameStart();
});
