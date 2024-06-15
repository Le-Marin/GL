(function() {
  'use strict';

  const audioNode = document.getElementById('audio');

  if (!audioNode) return;

  const audioPath = atob('aHR0cHM6Ly9sZS1tYXJpbi5naXRodWIuaW8vR0wvTExQU0kvYXVkaW8v');
  const audioName = location.pathname.match(/cap-(\d{2})/)[1];
  const audio = new Audio(audioPath + audioName + '.mp3');
  audio.volume = 0.6;

  audioNode.innerHTML = /*html*/`
    <button class="audio-play audio-btn" data-action="playpause"></button>
    <div class="audio-time"><span>00:00</span> / <span>00:00</span></div>
    <div class="audio-track" tabindex="0"></div>
    <button class="audio-vol audio-btn" data-action="mute"></button>
  `;

  const [btnPlay, times, track] = audioNode.children;
  const curTimeNode = times.firstElementChild.firstChild;

  let isTouched = false;
  const format = (n) => n > 9 ? n : `0${n}`;
  const setTrackCSS = track.style.setProperty.bind(track.style);

  audio.onplay = onPlayStateChange;
  audio.onpause = onPlayStateChange;
  audio.ontimeupdate = onTrackTimeUpdate;
  audio.oncanplay = function() {
    this.oncanplay = null;
    const min = (this.duration / 60 >> 0) % 60;
    const sec = ~~this.duration % 60;
    times.lastElementChild.textContent = `${format(min)}:${format(sec)}`;
  };

  audioNode.addEventListener('click', onAudioClick);
  track.addEventListener('mousedown', onTrackTouch);
  track.addEventListener('touchstart', onTrackTouch);
  track.addEventListener('keydown', onTrackInput);

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
    const perc = val / this.duration * 100 >> 0;
    setTrackCSS('--fill', `${perc}%`);

    const min = (val / 60 >> 0) % 60;
    const sec = ~~val % 60;
    curTimeNode.data = `${format(min)}:${format(sec)}`;
  }

  function onPlayStateChange() {
    return btnPlay.classList.toggle('__paused', !this.paused);
  }

  function onAudioClick(e) {
    const trg = e.target;
    const {action} = trg.dataset;

    if (action === 'playpause') {
      return audio.paused ? audio.play() : audio.pause();
    }

    if (action === 'mute') {
      audio.muted ^= 1;
      trg.classList.toggle('__muted', audio.muted);
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

      const now = curTime = audio.duration * perc / 100;
      const min = (now / 60 >> 0) % 60;
      const sec = ~~now % 60;
      curTimeNode.data = `${format(min)}:${format(sec)}`;
    }
  }

  function extendEvent(e) {
    const touches = e.changedTouches || e.targetTouches || e.touches || [];
    e.x = e.x || (touches[0] || {}).clientX || 0;
  }
})();