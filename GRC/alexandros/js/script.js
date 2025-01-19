(function() {
  'use strict';

  const thisScript = document.currentScript || [...document.scripts].pop();
  const src = (thisScript || {src: ''}).src;
  const ver = (src.match(/[?&]v=([^&]+)/) || [Date.now()])[1];

  if (location.protocol === 'file:') loadScript('_edit');
  if (!document.hasOwnProperty('_TIP_')) {
    let s = src.split('/').slice(0, -1).join('/');
    loadScript(s + '/tip');
  }

  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src + '.js?v=' + ver;
    document.head.appendChild(script).remove();
  }
})();