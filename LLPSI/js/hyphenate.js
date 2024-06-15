(function() {
  'use strict';

  const cache = {};
  const container = document.querySelector('.text');

  if (!container) return;

  const HYPHEN = '\u00AD';
  const VOWELS = [...'aeiouyāēīōūȳ'];
  const CONSONANTES = [...'rtpsdfghjklzxcvbnm'];
  const REG_WORD = /[a-zāēīōūȳ]{4,}/gi;
  const REG_NON_BREAK = /[pbtdcg][lr]/;

  const SINGLETONS = {
    ϙ: 'qu',
    χ: 'ch',
    φ: 'ph',
    ρ: 'rh',
    θ: 'th',
    qu: 'ϙ',
    ch: 'χ',
    ph: 'φ',
    rh: 'ρ',
    th: 'θ',
  };

  const SINGLETONS_KEYS = Object.keys(SINGLETONS);
  const SINGLETONS_REG = new RegExp(`${SINGLETONS_KEYS.slice(5).join('|')}`, 'gi');
  const SINGLETONS_REPLACER = (m) => SINGLETONS[m.toLowerCase()];

  CONSONANTES.push(...SINGLETONS_KEYS.slice(0, 5));

  if (window.innerWidth < 950) {
    return container.childNodes.forEach(hyphenateText);
  }

  window.addEventListener('resize', function onResize(e) {
    if (this.innerWidth >= 950) return;
    this.removeEventListener(e.type, onResize);
    container.childNodes.forEach(hyphenateText);
  });

  function hyphenateText(node) {
    if (node.nodeType === 1) {
      if (node.tagName === 'PRE') return;
      return node.childNodes.forEach(hyphenateText);
    }

    if (node.nodeType !== 3) return;

    let {data} = node;
    const words = data.match(REG_WORD);

    if (!words) return;

    words.forEach(word => { data = data.replace(word, hyphenate(word)); });

    node.data = data;
  }

  function hyphenate(word) {
    if (cache.hasOwnProperty(word)) return cache[word];

    const thisWord = word.replace(SINGLETONS_REG, SINGLETONS_REPLACER);
    const len = thisWord.length;
    let count = len + 1;
    let k = 0;

    return cache[word] = (function loop(skip, value) {
      if (!--count) return value;

      ++k;
      const i = len - count;
      const letter = thisWord[i];

      if (SINGLETONS[letter]) return loop(0, value + word.substr(++k - 2, 2));

      value += letter;

      if (count < 3 || skip) return loop(skip - 1, value);

      const current = i ? letter : letter.toLowerCase();
      const next = thisWord[i + 1];
      const next2 = thisWord[i + 2];

      if (next === 'e' && 'ao'.includes(current)) return loop(0, value);

      const hyphenedVal = value + HYPHEN;

      if (next === 'u' && 'ae'.includes(current)) {
        if (i !== len - 3 || !'ms'.includes(next2)) return loop(0, value);
        return loop(1, hyphenedVal);
      }

      if (!i) return loop(0, value);

      const isNextCon = CONSONANTES.includes(next);

      if (VOWELS.includes(letter)) {
        if (!isNextCon || VOWELS.includes(next2)) return loop(1, hyphenedVal);
        if (REG_NON_BREAK.test(next + next2)) return loop(2, hyphenedVal);
        if (isNextCon && CONSONANTES.includes(next2)) return loop(0, value);
      } else if (isNextCon && REG_NON_BREAK.test(letter + next)) {
        return loop(1, value);
      }

      return isNextCon ? loop(1, hyphenedVal) : loop(0, value);
    })(0, '');
  }
})();