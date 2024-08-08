(function() {
  'use strict';

  const cache = {};
  const container = document.querySelector('.text');

  if (!container) return;

  const HYPHEN = '\u00AD';
  const VOWELS = [...'аеёиоуыэюя'];
  const CONSONANTES = [...'бвгджзйклмнпрстфхцчшщъь'];
  const CONS2 = [...'йъь'];
  const REG_WORD = /[а-яё]{4,}/gi;
  const REG_VOWELS = /[аеёиоуыэюя]/i;
  const REG_NON_BREAK = /^[бгдкпт][лр]$/;

  container.childNodes.forEach(function hyphenateText(node) {
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
  });

  function hyphenate(word) {
    if (cache.hasOwnProperty(word)) return cache[word];

    const len = word.length;
    let count = len + 1;
    let k = 0;

    const data = (function loop(value, skip = 0) {
      if (!--count) return value;

      ++k;
      const i = len - count;
      const letter = word[i];

      value += letter;

      if (count < 3 || skip) return loop(value, skip - 1);

      const next = word[i + 1];
      const next2 = word[i + 2];

      if (!i) return loop(value);

      const hyphenedVal = value + HYPHEN;

      if (CONS2.includes(letter)) return loop(hyphenedVal);

      if (VOWELS.includes(letter)) {
        if (next === 'й') return loop(value);
        if (VOWELS.includes(next)) return loop(hyphenedVal);
        if (REG_NON_BREAK.test(next + next2)) return loop(hyphenedVal, 2);
        if (CONSONANTES.includes(next) && VOWELS.includes(next2)) {
          return loop(hyphenedVal, 1);
        }
      } else if (CONSONANTES.includes(next) && !CONS2.includes(next)) {
        return loop(hyphenedVal, CONSONANTES.includes(next2) + 1);
      }

      return loop(value);
    })('');

    if (!data.includes(HYPHEN)) return cache[word] = data;

    return cache[word] = data.split(HYPHEN).map((s, i, a) => {
      if (i === a.length - 1) return s;
      if (REG_VOWELS.test(s)) return s + HYPHEN;
      return s;
    }).join('');
  }
})();