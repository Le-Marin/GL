(function() {
  'use strict';

  if (document.currentScript) document.currentScript.remove();

  const elem = document.getElementById('x-select');
  const nodes = [...elem.parentNode.children];

  elem.addEventListener('click', function handler(e) {
    const trg = e.target.closest('.set-btn');

    if (!trg) return;

    this.removeEventListener(e.type, handler);

    if (trg.textContent.trim() === 'Declinator') {
      [2, 5].forEach((x) => nodes[x].remove());
      return load.call(this, 'declinatio');
    }

    [1, 4, 7].forEach((x) => nodes[x].remove());
    load.call(this, 'coniugatio');
  });

  function load(path) {
    const s = document.createElement('script');
    s.type = 'module';
    s.src = `${path}/script.js?v=2c`;
    s.onload = this.remove.bind(this);
    document.head.appendChild(s).remove();
  }
})();