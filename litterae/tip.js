(function() {
  'use strict';

  let timerId = 0;
  let lastElem = null;
  const handlerParams = { once: true, passive: true };
  const elem = document.createElement('div');
  const setCSS = elem.style.setProperty.bind(elem.style);
  const getClientWidth = () => document.documentElement.clientWidth;

  elem.id = 'tip';
  elem.hidden = true;
  document.getElementById('root').appendChild(elem);

  document.addEventListener('mouseover', onTipFocus);
  document.addEventListener('touchstart', onTipFocus);

  function onTipFocus(e) {
    const target = e.target;

    if (!target.hasAttribute('data-tip')) return hide();

    switch (e.type) {
      case 'mouseover':
        document.addEventListener('wheel', hide, handlerParams);
        break;
      case 'touchstart':
        if (timerId) clear();
        lastElem = target;
        document.addEventListener('touchend', onTouchEnd, handlerParams);
        document.addEventListener('click', onTipFocus, handlerParams);
        break;
      case 'click':
        if (timerId) clear();
        if (target === lastElem) return;
        break;
    }

    render(target);
    move(target.getBoundingClientRect());
    document.addEventListener('scroll', hide, handlerParams);
  }

  function onTouchEnd() {
    timerId = setTimeout(hide, 300);
    return;
  }

  function clear() {
    clearTimeout(timerId);
    timerId = 0;
  }

  function hide() {
    if (elem.hidden) return;
    elem.hidden = true;
  }

  function render(trg) {
    elem.innerHTML = trg._tip;
    elem.hidden = false;
  }

  function move({left, top, right, bottom}) {
    const offset = 5;
    const w = elem.offsetWidth;
    const h = elem.offsetHeight + offset;
    const x = left + w >= getClientWidth() ? Math.max(2, right - w) : left;
    const y = bottom + h >= window.innerHeight ? top - h : bottom + offset;
    setCSS('--x', `${~~x}px`);
    setCSS('--y', `${~~y}px`);
  }
})();