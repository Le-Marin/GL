let size = 0;
let yQnt = 0;
let timerId = 0;

const TRIGGER_CLASS = '__shown';

const root = document.getElementById('root');
const rootElem = document.documentElement;
const target = document.createElement('div');
const classList = target.classList;
const setCSS = target.style.setProperty.bind(target.style);

function onTipFocus(e) {
  const trg = e.target;

  if (!trg.matches('.cell__index')) return this.hide();

  if (e.type === 'click') e.stopImmediatePropagation();
  else if (e.type === 'touchstart') {
    document.removeEventListener('scroll', this.hide);
    document.addEventListener('touchend', onTouchEnd, { once: true });
  }

  if (timerId) {
    clearTimeout(timerId);
    timerId = 0;
  }

  this.render(trg.dataset.index);
  this.move(trg.parentNode.getBoundingClientRect());
}

function onTouchEnd() {
  document.addEventListener('scroll', this.hide);
  timerId = setTimeout(this.hide, 10);
}

export default {
  __init__(qnt) {
    size = qnt;
    yQnt = Math.ceil(qnt / 5) - 1;
    onTipFocus = onTipFocus.bind(this);
    onTouchEnd = onTouchEnd.bind(this);

    root.addEventListener('mouseover', onTipFocus);
    root.addEventListener('touchstart', onTipFocus);
    root.addEventListener('click', onTipFocus);
    document.addEventListener('scroll', this.hide);

    target.id = 'tip';
    root.append(target);
  },
  __die__() {
    this.hide();
    root.removeEventListener('mouseover', onTipFocus);
    root.removeEventListener('touchstart', onTipFocus);
    root.removeEventListener('click', onTipFocus);
    document.removeEventListener('scroll', this.hide);
  },
  move({left, top, right, bottom}) {
    const offset = 4;
    const w = target.offsetWidth + offset;
    const h = target.offsetHeight + offset;
    const x = right + w >= rootElem.clientWidth
      ? Math.max(offset, left - w)
      : right + offset;
    const y = bottom + h >= window.innerHeight
      ? Math.max(offset, top - h)
      : bottom + offset;
    setCSS('--x', `${x + window.scrollX >> 0}px`);
    setCSS('--y', `${y - root.offsetTop + window.scrollY >> 0}px`);
  },
  render(ind) {
    const bgx = (ind % 5) / 4 * 100;
    const bgy = (ind / 5 >> 0) / yQnt * 100;
    setCSS('--bgx', `${+bgx.toFixed(3)}%`);
    setCSS('--bgy', `${+bgy.toFixed(3)}%`);
    classList.add(TRIGGER_CLASS);
  },
  hide() {
    if (!classList.contains(TRIGGER_CLASS)) return;
    classList.remove(TRIGGER_CLASS);
  }
};