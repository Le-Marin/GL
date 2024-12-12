let caseSwitcher, trigger, body, check;
const cases = {'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y'};

export default {
  __init__(target, handler) {
    check = handler;
    [caseSwitcher, trigger, body] = target.children;
    this.onHandleClick = this.onHandleClick.bind(this);
    target.addEventListener('click', this.onHandleClick);
  },
  onHandleClick(e) {
    const trg = e.target;

    if (trg === trigger) return this.toggle();

    if (trg === caseSwitcher) {
      trg.classList.toggle('__disabled');
      return check();
    }

    if (trg.matches('.keyboard__key'))
      return this.printKey(trg.textContent, e.shiftKey);
  },
  toggle() {
    return body.classList.toggle('__shown');
  },
  printKey(key, isUpper) {
    if (!isUpper) key = key.toLowerCase();
    return document.execCommand('insertText', false, key);
  },
  get cases() {
    return cases;
  },
  get sensitivity() {
    return !caseSwitcher.matches('.__disabled');
  }
};