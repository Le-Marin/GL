const getWord = (value) => `<b class="tip-word">${value}</b>`;
const getNotes = (value) => `<span class="notes">${value}</span>`;
const getTranslation = (value) => `<span class="translation">${value}</span>`;

const notesReplacer = (match) => {
  const value = match.slice(1).replace(/[(+/,~)]+/g, '<i>$&</i>');
  return ` ${getNotes(value)}`;
};

const translationReplacer = (match) => {
  const value = match.slice(1).replace(/\/ (.+)/g, '/ <i>$1</i>');
  return ` ${getTranslation(value)}`;
};

const handleWordValue = window.handleWordValue = (text) => {
  const chunks = text.split('@');
  const start = chunks.shift()
    .replace(/^[^|:\n]+/, getWord)
    .replace(/\|[^:\n]+/, notesReplacer)
    .replace(/:.+/, translationReplacer);

  const end = chunks.length ? getMultiTranslation(chunks.join('\n')) : '';
  const val = !end ? start : (start + '\n' + getTranslation(end)).trim();

  return val
    .replace(/_(.+?)_/g, '<i>$1</i>')
    .replace(/\*(.+?)\*/g, '<b>$1</b>')
    .replace(/\^(.+?)\^/g, getNotes('$1'));
};

function getMultiTranslation(value) {
  return value
    .replace(/--(.+?)--/g, getWord('$1'))
    .replace(/ \/ (.+)/g, ' / <i>$1</i>');
}

let timerId = 0;

function onTipFocus(e) {
  const trg = e.target;

  if (!trg.matches('[data-value]')) return this.hide();

  if (e.type === 'touchstart') {
    document.removeEventListener('scroll', this.hide);
    document.addEventListener('touchend', onTouchEnd, { once: true });
  }

  if (timerId) {
    clearTimeout(timerId);
    timerId = 0;
  }

  this.render(trg).move(trg.getBoundingClientRect());
}

function onTouchEnd() {
  document.addEventListener('scroll', this.hide);
  timerId = setTimeout(this.hide, 10);
}

const tip = ((elem) => {
  const setCSS = elem.style.setProperty.bind(elem.style);
  const getClientWidth = () => document.documentElement.clientWidth;

  return {
    __init__() {
      onTipFocus = onTipFocus.bind(this);
      onTouchEnd = onTouchEnd.bind(this);
      this.hide = this.hide.bind(this);

      document.addEventListener('mouseover', onTipFocus);
      document.addEventListener('touchstart', onTipFocus);
      document.addEventListener('click', onTipFocus);
      document.addEventListener('scroll', this.hide);

      elem.id = 'tip';
      document.body.appendChild(elem);
    },
    move({left, top, right, bottom}) {
      const offset = 5;
      const w = elem.offsetWidth;
      const h = elem.offsetHeight + offset;
      const x = left + w >= getClientWidth() ? Math.max(2, right - w) : left;
      const y = bottom + h >= window.innerHeight ? top - h : bottom + offset;
      setCSS('--x', `${~~x}px`);
      setCSS('--y', `${y + window.scrollY >> 0}px`);
    },
    render(trg) {
      if (!trg.hasOwnProperty('__value')) {
        trg.__value = handleWordValue(trg.dataset.value);
      }
      elem.innerHTML = trg.__value;
      return this;
    },
    hide() {
      if (this.hidden) return;
      elem.innerHTML = '';
    },
    get target() {
      return elem;
    },
    get hidden() {
      return !elem.offsetWidth;
    }
  };
})(document.createElement('div'));

export default tip;