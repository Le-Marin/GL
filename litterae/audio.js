const initAudio = (function() {
  'use strict';

  let audio = null;
  const audioNode = document.getElementById('audio');

  if (!audioNode) return Function.prototype;

  audioNode.innerHTML = /*html*/`
    <button class="audio-play audio-btn" data-action="playpause"></button>
    <div class="audio-time"><span>00:00</span> / <span>00:00</span></div>
    <div class="audio-track" tabindex="0"></div>
    <button class="audio-vol audio-btn" data-action="mute"></button>
  `;

  const [btnPlay, times, track, btnVolume] = audioNode.children;
  const curTimeNode = times.firstElementChild.firstChild;
  const endTimeNode = times.lastElementChild.firstChild;

  let isTouched = false;
  const format = (n) => n > 9 ? n : `0${n}`;
  const setTrackWidth = track.style.setProperty.bind(track.style, '--fill');

  audioNode.addEventListener('click', onAudioClick);
  track.addEventListener('mousedown', onTrackTouch);
  track.addEventListener('touchstart', onTrackTouch);
  track.addEventListener('keydown', onTrackInput);

  return function init(src) {
    if (audio instanceof Audio) clearAudio(audio);

    isTouched = false;
    curTimeNode.data = getMinSec(0);
    endTimeNode.data = getMinSec(0);
    btnPlay.classList.remove('__paused');
    btnVolume.classList.remove('__muted');
    setTrackWidth('0%');

    if (!src) {
      audio = null;
      audioNode.hidden = true;
      return;
    }

    audio = new Audio(src);
    audioNode.hidden = false;

    audio.volume = 0.85;
    audio.currentTime = 0;
    audio.onplay = onPlayStateChange;
    audio.onpause = onPlayStateChange;
    audio.ontimeupdate = onTimeUpdate;
    audio.oncanplay = onCanPlay;
  };

  function clearAudio(audio) {
    audio.muted = true;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.oncanplay = null;
    audio.pause();
  }

  function onTimeUpdate() {
    if (isTouched) return;

    const time = this.currentTime;
    curTimeNode.data = getMinSec(time);
    fillTrack(time, this.duration);
  }

  function onPlayStateChange() {
    return btnPlay.classList.toggle('__paused', !this.paused);
  }

  function onCanPlay() {
    this.oncanplay = null;
    endTimeNode.data = getMinSec(this.duration);
  }

  function onAudioClick(e) {
    if (!audio) return;

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

  function onTrackInput(e) {
    if (!audio || isTouched) return;

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
    if (!audio) return;

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
    const evMoveOptions = isMouseEvent ? false : { passive: true };

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
      const perc = fillTrack(val, max);
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
    const min = (val / 60 >> 0) % 60;
    const sec = ~~val % 60;
    return `${format(min)}:${format(sec)}`;
  }

  function fillTrack(val, max) {
    const perc = +(val / max * 100).toFixed(4) || 0;
    setTrackWidth(`${perc}%`);
    return perc;
  }
})();