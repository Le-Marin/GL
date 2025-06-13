(function() {
  'use strict';

  let timerId = 0;
  const handlerParams = { once: true };
  const elem = document.createElement('div');
  const setCSS = elem.style.setProperty.bind(elem.style);
  const getClientWidth = () => document.documentElement.clientWidth;

  elem.id = 'tip';
  elem.hidden = true;
  document.getElementById('root').appendChild(elem);

  document.addEventListener('mouseover', onTipFocus);
  document.addEventListener('touchstart', onTipFocus);
  document.addEventListener('click', onTipFocus);

  function onTipFocus(e) {
    const trg = e.target;

    if (!trg.hasAttribute('data-tip')) return hide();

    if (e.type === 'touchstart') {
      document.addEventListener('touchend', onTouchEnd, handlerParams);
    } else if (e.type === 'mouseover') {
      document.addEventListener('wheel', hide, handlerParams);
    }

    if (timerId) {
      clearTimeout(timerId);
      timerId = 0;
    }

    render(trg);
    move(trg.getBoundingClientRect());
    document.addEventListener('scroll', hide, handlerParams);
  }

  function onTouchEnd() {
    timerId = setTimeout(hide, 300);
    return;
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