(function() {
  'use strict';

  const thisScript = document.currentScript || [...document.scripts].pop();
  const src = (thisScript || {src: ''}).src;
  const ver = (src.match(/[?&]v=([^&]+)/) || [Date.now()])[1];
  const basePath = atob('aHR0cHM6Ly9sZS1tYXJpbi5naXRodWIuaW8vR0wvTExQU0kvanMv');

  loadScript(basePath + 'tip.js');
  loadScript(basePath + 'pdf.js');
  loadScript(basePath + 'audio.js');
  loadScript(basePath + 'quiz.js');

  if (location.protocol === 'file:') {
    loadScript('_edit.js');
  } else {
    loadScript(basePath + 'hyphenate.js');
    loadScript(basePath.slice(0, 30) + 'abc/prevent.js');
  }

  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src + '?v=' + ver;
    document.head.appendChild(script).remove();
  }

  // ====================

  const switcher = document.getElementById('refs-switcher');

  if (!switcher) return;

  const extraMenu = switcher.parentNode.nextElementSibling;

  switcher.addEventListener('click', (e) => {
    e.preventDefault();
    extraMenu.classList.toggle('__shown');
  });
})();