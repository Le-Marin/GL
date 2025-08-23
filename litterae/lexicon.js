(async function() {
  'use strict';

  const curScript = document.currentScript;
  const container = document.getElementById('lexicon');

  await initLexicon();

  async function initLexicon() {
    const v = 35475303;
    const url = new URL(curScript.src);
    const src = url.origin + url.pathname + '/../../lexicon';
    const html = await (await fetch(`${src}?v=${v}`)).text();
    const s = html.indexOf('<body>') + 6;
    const e = html.lastIndexOf('</body>');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src + '/style.css?v=' + v;

    const script = document.createElement('script');
    script.src = src + '/script.js?v=' + v;

    const shell = document.createElement('div');
    shell.innerHTML = html.slice(s, e);
    container.replaceChildren(shell.firstElementChild);
    document.head.append(script, link);
  }

  let isVisible = 0;
  const fakeKeyupEvent = { type: 'keyup', key: 'Escape' };

  container.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', function(e) {
    const elem = e.target.closest('.word._lex');

    if (elem) showResult(elem.__word);
    else if (isVisible) close(fakeKeyupEvent);
  });

  window.addEventListener('hashchange', function(e) {
    if (!isVisible) return;
    close(fakeKeyupEvent);
  });

  function showResult(word) {
    const detail = { word };
    const event = new CustomEvent('lexicon:search', { detail });
    document.addEventListener('keyup', close);
    document.dispatchEvent(event);
    container.classList.add('_shown');
    isVisible = 1;
  }

  function close(e) {
    if (e.key !== 'Escape') return;
    document.removeEventListener(e.type, close);
    container.classList.remove('_shown');
    isVisible = 0;
  }
})();