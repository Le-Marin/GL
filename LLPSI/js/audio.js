(function() {
  'use strict';

  const audioNode = document.getElementById('audio');

  if (!audioNode) return;

  const audioPath = atob('aHR0cHM6Ly9sZS1tYXJpbi5naXRodWIuaW8vR0wvTExQU0kvYXVkaW8v');
  const audioName = location.pathname.match(/cap-(\d{2})/)[1];
  const audio = new Audio(audioPath + audioName + '.mp3');
  audio.volume = 0.65;

  audioNode.innerHTML = /*html*/`
    <button class="audio-btn audio-play" data-action="playpause"></button>
    <div class="audio-time"><span>00:00</span> / <span>00:00</span></div>
    <div class="audio-track" tabindex="0"></div>
    <button class="audio-btn audio-vol" data-action="mute"></button>
    <button class="audio-btn audio-x2" data-action="toggleRates"></button>
    <div class="audio-rates" hidden>
      <a href="#" class="audio-rate _active" data-action="setRate">1</a>
      <a href="#" class="audio-rate" data-action="setRate">1.25</a>
      <a href="#" class="audio-rate" data-action="setRate">1.5</a>
      <a href="#" class="audio-rate" data-action="setRate">1.75</a>
      <a href="#" class="audio-rate" data-action="setRate">2</a>
    </div>
  `;

  const [btnPlay, times, track] = audioNode.children;
  const curTimeNode = times.firstElementChild.firstChild;
  const endTimeNode = times.lastElementChild.firstChild;
  const elRates = audioNode.lastElementChild;

  let isTouched = false;
  const format = (n) => n > 9 ? n : `0${n}`;
  const setTrackCSS = track.style.setProperty.bind(track.style);

  audio.onplay = onPlayStateChange;
  audio.onpause = onPlayStateChange;
  audio.ontimeupdate = onTimeUpdate;
  audio.oncanplay = onCanPlay;

  audioNode.addEventListener('click', onAudioClick);
  track.addEventListener('mousedown', onTrackTouch);
  track.addEventListener('touchstart', onTrackTouch);
  track.addEventListener('keydown', onTrackInput);

  function onTimeUpdate() {
    if (isTouched) return;
    const time = this.currentTime;
    const perc = +(time / this.duration * 100).toFixed(3) || 0;
    setTrackCSS('--fill', `${perc}%`);
    curTimeNode.data = getMinSec(time);
  }

  function onPlayStateChange() {
    return btnPlay.classList.toggle('__paused', !this.paused);
  }

  function onCanPlay() {
    this.oncanplay = null;
    endTimeNode.data = getMinSec(this.duration);
  }

  function onAudioClick(e) {
    const trg = e.target;
    const {action} = trg.dataset;

    if (action === 'playpause') {
      return audio.paused ? audio.play() : audio.pause();
    }

    if (action === 'mute') {
      audio.muted ^= 1;
      return trg.classList.toggle('__muted', audio.muted);
    }

    if (action === 'toggleRates') {
      if (elRates.hidden ^= 1) return;
      e.stopPropagation();
      return document.addEventListener('click', function handler(e) {
        this.removeEventListener(e.type, handler);
        elRates.hidden = 1;
      });
    }

    if (action === 'setRate') {
      e.preventDefault();
      e.stopPropagation();
      [...elRates.children].forEach(el => el.classList.remove('_active'));
      trg.classList.add('_active');
      audio.playbackRate = Math.max(1, Math.min(2, +trg.textContent || 1));
    }
  }

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

  function onTrackTouch(e) {
    const isMouseEvent = e.type === 'mousedown';

    if (!isMouseEvent) extendEvent(e);
    else if (e.button) return;

    isTouched = true;
    let curTime = 0;

    const left = track.getBoundingClientRect().x >> 0;
    const max = track.offsetWidth;
    fill(e);

    const evTypeMove = isMouseEvent ? 'mousemove' : 'touchmove';
    const evTypeEnd = isMouseEvent ? 'mouseup' : 'touchend';
    const evMoveOptions = isMouseEvent ? false : { passive: false };

    document.addEventListener(evTypeMove, onTouchMove, evMoveOptions);
    document.addEventListener(evTypeEnd, onTouchEnd);

    function onTouchMove(e) {
      if (isMouseEvent) return fill(e);
      e.preventDefault();
      extendEvent(e);
      fill(e);
    }

    function onTouchEnd(e) {
      this.removeEventListener(evTypeMove, onTouchMove, evMoveOptions);
      this.removeEventListener(evTypeEnd, onTouchEnd);
      audio.currentTime = curTime;
      isTouched = false;
    }

    function fill(e) {
      const val = Math.min(Math.max(0, e.x - left), max);
      const perc = +(val / max * 100).toFixed(3);
      setTrackCSS('--fill', `${perc}%`);

      curTime = audio.duration * perc / 100;
      curTimeNode.data = getMinSec(curTime);
    }
  }

  function extendEvent(e) {
    if (typeof e.x === 'number') return;
    const touches = e.changedTouches || e.targetTouches || e.touches || [];
    e.x = (touches[0] || {}).clientX || 0;
  }

  function getMinSec(val) {
    const m = (val / 60 >> 0) % 60;
    const s = ~~val % 60;
    return `${format(m)}:${format(s)}`;
  }
})();