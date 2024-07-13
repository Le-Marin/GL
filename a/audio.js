const audioNode = document.getElementById('audio') || document.head;
const audioPath = 'https://misc-lang.github.io/eng_phonetics/songs/';
const audio = new Audio;
audio.volume = 0.5;

const [btnPlay, timeShell, nameEl, textEl] = audioNode.children;
const [authorEl, titleEl] = nameEl.children;
const [curTimeEl, track, endTimeEl] = timeShell.children;
const curTimeNode = curTimeEl.firstChild;

let isTouched = false;
const format = (n) => n > 9 ? n : `0${n}`;
const setTrackCSS = track.style.setProperty.bind(track.style);

audio.onplay = onPlayStateChange;
audio.onpause = onPlayStateChange;
audio.ontimeupdate = onTrackTimeUpdate;

audio._init = function(src) {
  this.pause();
  onPlayStateChange.call({ paused: 1 });
  this.src = audioPath + src + '.mp3';
  this.currentTime = 0;
  this.oncanplay = onCanPlay;
};

audio._setName = function(author, title) {
  authorEl.textContent = author;
  titleEl.textContent = title;
};

audio._setText = function(text) {
  textEl.innerHTML = text;
};

audioNode.addEventListener('click', onAudioClick);
track.addEventListener('mousedown', onTrackTouch);
track.addEventListener('touchstart', onTrackTouch);
track.addEventListener('keydown', onTrackInput);

export default audio;

function onTrackInput(e) {
  if (isTouched) return;

  const {key} = e;
  const val = audio.currentTime;
  const max = audio.duration;

  if (key === 'ArrowUp' || key === 'ArrowRight') {
    e.preventDefault();
    return audio.currentTime = Math.min(val + 5, max);
  }

  if (key === 'PageUp') {
    e.preventDefault();
    return audio.currentTime = Math.min(val + 50, max);
  }

  if (key === 'End') {
    e.preventDefault();
    return audio.currentTime = max;
  }

  if (key === 'ArrowDown' || key === 'ArrowLeft') {
    e.preventDefault();
    return audio.currentTime = Math.max(0, val - 5);
  }

  if (key === 'PageDown') {
    e.preventDefault();
    return audio.currentTime = Math.max(0, val - 50);
  }

  if (key === 'Home') {
    e.preventDefault();
    return audio.currentTime = 0;
  }
}

function onTrackTimeUpdate() {
  if (isTouched) return;

  const val = this.currentTime;
  const perc = +(val / this.duration * 100).toFixed(3) || 0;
  setTrackCSS('--fill', `${perc}%`);
  curTimeNode.data = getMinSec(val);
}

function onPlayStateChange() {
  return btnPlay.classList.toggle('__paused', !this.paused);
}

function onCanPlay() {
  this.oncanplay = null;
  endTimeEl.textContent = getMinSec(this.duration);
}

function onAudioClick(e) {
  const trg = e.target;
  const {action} = trg.dataset;

  if (action === 'playpause') {
    return audio.paused ? audio.play() : audio.pause();
  }
}

function onTrackTouch(e) {
  const isMouseEvent = e.type === 'mousedown';

  if (!isMouseEvent) extendEvent(e);
  else if (e.button) return;

  isTouched = true;
  let curTime = 0;

  const left = track.getBoundingClientRect().x >> 0;
  const max = track.offsetWidth;
  fill(e.x);

  const evTypeMove = isMouseEvent ? 'mousemove' : 'touchmove';
  const evTypeEnd = isMouseEvent ? 'mouseup' : 'touchend';
  const evMoveOptions = isMouseEvent ? false : { passive: false };

  document.addEventListener(evTypeMove, onTrackTouchMove, evMoveOptions);
  document.addEventListener(evTypeEnd, onTrackTouchEnd);

  function onTrackTouchMove(e) {
    if (isMouseEvent) return fill(e.x);
    extendEvent(e);
    e.preventDefault();
    fill(e.x);
  }

  function onTrackTouchEnd(e) {
    this.removeEventListener(evTypeMove, onTrackTouchMove, evMoveOptions);
    this.removeEventListener(evTypeEnd, onTrackTouchEnd);
    audio.currentTime = curTime;
    isTouched = false;
  }

  function fill(x) {
    const val = Math.min(Math.max(0, x - left), max);
    const perc = +(val / max * 100).toFixed(3);
    setTrackCSS('--fill', `${perc}%`);

    curTime = audio.duration * perc / 100;
    curTimeNode.data = getMinSec(curTime);
  }
}

function extendEvent(e) {
  const touches = e.changedTouches || e.targetTouches || e.touches || [];
  e.x = e.x || (touches[0] || {}).clientX || 0;
}

function getMinSec(val) {
  const min = (val / 60 >> 0) % 60;
  const sec = ~~val % 60;
  return `${format(min)}:${format(sec)}`;
}