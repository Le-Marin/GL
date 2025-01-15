(function() {
  'use strict';

  const thisScript = document.currentScript || [...document.scripts].pop();
  const src = (thisScript || {src: ''}).src;
  const ver = (src.match(/[?&]v=([^&]+)/) || [Date.now()])[1];
  const basePath = atob('aHR0cHM6Ly9sZS1tYXJpbi5naXRodWIuaW8vR0wvTExQU0kvanMv');

  loadScript(basePath + 'tip.js');

  if (location.protocol === 'file:') {
    loadScript('_edit.js');
  }

  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src + '?v=' + ver;
    document.head.appendChild(script).remove();
  }
})();