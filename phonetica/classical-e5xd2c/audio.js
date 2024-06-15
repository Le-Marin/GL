let basePath = '.';
let lastAudio = null;

function getAudio(elem) {
  if (elem.hasOwnProperty('__audio')) return elem.__audio;

  const name = elem.dataset.name || getDefaultAudioName(elem);
  const path = `${basePath}/audio/${name}.mp3`;

  return elem.__audio = Object.assign(new Audio(path), {
    __elem: elem,
    volume: 0.85,
    onplay: onPlayStateChange,
    onpause: onPlayStateChange
  });
}

function onPlayStateChange() {
  return this.__elem.classList.toggle('__active', !this.paused);
}

function getDefaultAudioName(elem) {
  const text = elem.parentNode.previousElementSibling.textContent;
  return text.match(/[a-z]+/)[0];
}

const audio = {
  __init__(src) {
    document.addEventListener('click', (e) => {
      const trg = e.target;

      if (!trg.matches('button.play')) return;

      const audioFile = getAudio(trg);

      if (lastAudio && !lastAudio.paused) {
        lastAudio.pause();
        if (audioFile === lastAudio) return;
      }

      lastAudio = audioFile;
      audioFile.currentTime = 0;
      audioFile.play();
    });

    if (location.pathname.includes('/phonetica/')) return;

    const {dir} = document.querySelector('main.container').dataset;
    basePath = src.match(/.+?phonetica/)[0] + '/' + dir;
  }
};

export default audio;