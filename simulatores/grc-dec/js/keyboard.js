const keyboard = (function() {
  'use strict';

  let caseSwitcher, trigger, body, check;

  const VOWELS = [
    'α ἁ ά ἅ ᾶ ἇ ᾳ ᾷ ᾱ ᾱ́'.split(' '),
    'ε ἑ έ ἕ - - - - - -'.split(' '),
    'η ἡ ή ἥ ῆ ἧ ῃ ῇ - -'.split(' '),
    'ι ἱ ί ἵ ῖ ἷ - - ῑ ῑ́'.split(' '),
    'ο ὁ ό ὅ - - - - - -'.split(' '),
    'υ ὑ ύ ὕ ῦ ὗ - - ῡ ῡ́'.split(' '),
    'ω ὡ ώ ὥ ῶ ὧ ῳ ῷ - -'.split(' '),
  ];

  const [line1, line2] = document.querySelector('#kb').children;

  line2.addEventListener('click', function(e) {
    const elem = e.target;
    if (elem === this) return;

    const active = this.querySelector('._active');
    if (active) active.classList.remove('_active');
    elem.classList.add('_active');

    switch (elem.textContent) {
      case 'ἁ': return replaceLetters(1);
      case 'ά': return replaceLetters(2);
      case 'ἅ': return replaceLetters(3);
      case 'ᾶ': return replaceLetters(4);
      case 'ἇ': return replaceLetters(5);
      case 'ᾳ': return replaceLetters(6);
      case 'ᾷ': return replaceLetters(7);
      case 'ᾱ': return replaceLetters(8);
      case 'ᾱ́': return replaceLetters(9);
    }
  });

  function replaceLetters(col) {
    [...line1.children].forEach((elem, i) => {
      elem.textContent = VOWELS[i][col].replace('-', '');
    });
  }

  return {
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

      if (trg.matches('.keyboard__key')) {
        if (trg.parentNode !== line1) return;
        return this.printKey(trg.textContent);
      }
    },
    toggle() {
      return body.classList.toggle('__shown');
    },
    printKey(key) {
      return document.execCommand('insertText', false, key);
    },
    get sensitivity() {
      return !caseSwitcher.matches('.__disabled');
    },
    VOWELS
  };
})();