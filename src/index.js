import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import './fonts/libre-baskerville-v5-latin-regular.woff';
import './fonts/libre-baskerville-v5-latin-regular.woff2';

import './index.html';
import './index.scss';
import './scripts/script';

OfflinePluginRuntime.install();

let circles = document.querySelectorAll('input[type="radio"]');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const container = document.getElementsByClassName('container')[0];
const scoreSpan = document.getElementById('score');
let timer, last;
let score = 0;

function generateRandom() {
  return Math.floor(Math.random() * 36);
}

const game = e => {
  if (!e.isTrusted) {
    score--;
    return;
  }
  if (e.srcElement && e.srcElement.attributes['data-circle']) {
    let temp = e.srcElement.attributes['data-circle'];
    if (temp.nodeValue == last.dataset.circle) {
      score++;
      last.checked = false;
      //      last = circles[generateRandom()];
      //      last.checked = true;
      //      console.log(score);
      scoreSpan.value = score;
    } else {
      score--;
      last.checked = true;
      scoreSpan.value = score;
      console.log(score);
    }
  }
};

play.addEventListener('click', e => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    let random = generateRandom();
    last = circles[random];
    last.checked = true;
  }, Math.floor(Math.random() * 3000));

  container.addEventListener('click', game);
});

stop.addEventListener('click', e => {
  last.checked = false;
  clearInterval(timer);
  alert(`Your final score is ${score}`);
  container.removeEventListener('click', game);
  score = 0;
  scoreSpan.value = score;
});
