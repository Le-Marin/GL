(async function() {
  'use strict';

  const frameElem = document.getElementById('lexicon');
  const frameView = frameElem && frameElem.contentWindow;

  if (!String(frameView).endsWith('Window]')) return;

  await new Promise(resolve => {
    const timerId = setTimeout(resolve, 4e3);
    frameView.onload = function() {
      clearTimeout(timerId);
      resolve();
    };
  });

  frameView.onload = null;

  const frameDoc = frameView.document;

  if (!frameDoc) return;

  const style = frameDoc.createElement('style');

  style.textContent = /*css*/`
    :root { scrollbar-width: thin; }
    #root { padding: 0; }
    #root > *:not(#content) { display: none; }
    #content { border-top: none; }
    big { visibility: hidden; display: block; margin-bottom: -3em; }
  `;

  frameDoc.head.appendChild(style);

  let isFrameShown = 0;
  const fakeKeyupEvent = { type: 'keyup', key: 'Escape' };

  document.addEventListener('click', function(e) {
    const elem = e.target.closest('.word._lex');

    if (elem) showResult(elem.__word);
    else if (isFrameShown) close(fakeKeyupEvent);
  });

  window.addEventListener('hashchange', function(e) {
    if (!isFrameShown) return;
    close(fakeKeyupEvent);
  });

  function showResult(word) {
    const state = { word };
    const event = new frameView.PopStateEvent('popstate', { state });
    frameView.dispatchEvent(event);
    frameElem.classList.add('_shown');
    isFrameShown = 1;
    document.addEventListener('keyup', close);
  }

  function close(e) {
    if (e.key !== 'Escape') return;
    document.removeEventListener(e.type, close);
    frameElem.classList.remove('_shown');
    isFrameShown = 0;
  }
})();