/* This is shit-code!!! Bc 42 :)) */
const composeWord = (function() {
  'use strict';

  const ACUTE = '́';
  const ENDINGS_SEPARATOR = ' | ';
  const SYLLABLES_SEPARATOR = '.';
  const REGEX_CONSONANTS = /[βγδζθκλμνξπρσςτφχψ]/gi;
  const REGEX_ALPHA_PURA = /(?:[ρεἑέἕιἱίἵῖἷῑ]|ῑ́)$/;
  const REGEX_DIPH = /[αυεο][ιἱίἵῖἷ]|[αηωεο][υὑύὕῦὗ]/;
  const REGEX_LONG = /[αυεο][ιἱίἵῖἷ]|[αηωεο][υὑύὕῦὗ]|(?:[ᾱῑῡ])́|[ᾶἇᾳᾷᾱηἡήἥῆἧῃῇωὡώὥῶὧῳῷῖἷῑῦὗῡ]/;
  const REGEX_SHORT = /^[αο][ιί]$/;

  const REG_PURE = /[αηωιυεο]/i;
  const REG_ASPIRATE = /[ἁἡὡἱὑἑὁ]/i;
  const REG_ACUTE = /[άήώίύέό]/i;
  const REG_ASPIRATE_ACUTE = /[ἅἥὥἵὕἕὅ]/i;
  const REG_CFLEX = /[ᾶῆῶῖῦ]/i;
  const REG_ASPIRATE_CFLEX = /[ἇἧὧἷὗ]/i;
  const REG_IOTA = /[ᾳῃῳ]/i;
  const REG_CFLEX_IOTA = /[ᾷῇῷ]/i;
  const REG_MACRON = /[ᾱῑῡ]/i;
  const REG_MACRON_ACUTE = /[ᾱῑῡ]́/i;

  const COL_PURE = 0;
  const COL_ASPIRATE = 1;
  const COL_ACUTE = 2;
  const COL_ASPIRATE_ACUTE = 3;
  const COL_CFLEX = 4;
  const COL_ASPIRATE_CFLEX = 5;
  const COL_IOTA = 6;
  const COL_CFLEX_IOTA = 7;
  const COL_MACRON = 8;
  const COL_MACRON_ACUTE = 9;

  const VOWELS = [
    'α ἁ ά ἅ ᾶ ἇ ᾳ ᾷ ᾱ ᾱ́'.split(' '),
    'η ἡ ή ἥ ῆ ἧ ῃ ῇ - -'.split(' '),
    'ω ὡ ώ ὥ ῶ ὧ ῳ ῷ - -'.split(' '),
    'ι ἱ ί ἵ ῖ ἷ - - ῑ ῑ́'.split(' '),
    'υ ὑ ύ ὕ ῦ ὗ - - ῡ ῡ́'.split(' '),
    'ε ἑ έ ἕ - - - - - -'.split(' '),
    'ο ὁ ό ὅ - - - - - -'.split(' '),
  ];

  const ENDINGS = {
    "1a": [
      ['η | ᾱ', 'ην | ᾱν', 'ης | ᾱς', 'ῃ | ᾳ', 'η | ᾱ'],
      ['αι', 'ᾱς', 'ῶν', 'αις', 'αι'],
    ],
    "1A": [
      ['ή | ᾱ́', 'ήν | ᾱ́ν', 'ῆς | ᾶς', 'ῇ | ᾷ', 'ή | ᾱ́'],
      ['αί', 'ᾱ́ς', 'ῶν', 'αῖς', 'αί'],
    ],
    "1b": [
      ['α', 'αν', 'ης | ᾱς', 'ῃ | ᾳ', 'α'],
      ['αι', 'ᾱς', 'ῶν', 'αις', 'αι'],
    ],
    "1c": [
      ['ης | ᾱς', 'ην | ᾱν', 'ου', 'ῃ | ᾳ', 'η | ᾱ | α'],
      ['αι', 'ᾱς', 'ῶν', 'αις', 'αι'],
    ],
    "2a": [
      ['ος | ον', 'ον | =', 'ου', 'ῳ', 'ε | ='],
      ['οι | α', 'ους | =', 'ων', 'οις', 'οι | ='],
    ],
    "2A": [
      ['ός | όν', 'όν | =', 'οῦ', 'ῷ', 'έ | ='],
      ['οί | ά', 'ούς | =', 'ῶν', 'οῖς', 'οί | ='],
    ],
    "3a": [
      ['', 'α | =', 'ος', 'ι', '='],
      ['ες | α', 'ας | =', 'ων', 'σιν', '='],
    ],
    "3A": [
      ['', 'α | =', 'ός', 'ί', '='],
      ['ες | α', 'ας | =', 'ῶν', 'σίν', '='],
    ],
    "3b": [
      ['', 'α', 'ός', 'ί', ''],
      ['ες', 'ας', 'ων', 'άσιν', '='],
    ],
    "3c": [
      ['', 'α | =', 'ος', 'ι', ' | ='],
      ['ες | α', '=', 'ῶν', 'σιν', '='],
    ],
    "3d": [
      ['', 'ᾱ | =', 'ος', 'ι', ' | ='],
      ['ες | α', '=', 'ῶν', 'σιν', '='],
    ],
    "3e": [
      ['ς | ', 'ν | =', 'ος', 'ι', ' | ='],
      ['ες | α', '=', 'ων', 'σιν', '='],
    ],
    "3f": [
      ['ς', 'ᾱ', 'ος', 'ι', ''],
      ['ες', '=', 'ων', 'σιν', '='],
    ],
    "3g": [
      ['ς', 'ν', 'ος', 'ϊ', ''],
      ['ες', 'ας', 'ων', 'σιν', '='],
    ],
    "3G": [
      ['ς', 'ν', 'ός', 'ΐ', ''],
      ['ες', 'ας', 'ῶν', 'σίν', '='],
    ],
    "3h": [[], []]
  };

  const getWordRoot = (val) => val.split('~', 1)[0];
  const getWordGen = (val) => val.match(/ (ὁ|ἡ|τὸ)(?=$| )/)?.[1];

  // ====================

  class WordForm {
    constructor(val) {
      const [r, e] = val.split('~');
      this.root = r;
      this.ending = e || '';
    }
    toString() {
      return this.value;
    }
    get forms2() {
      let { r, e } = this;
      r = r.replace(/[(.)]/g, '');
      return [r + e[0], r + e[1]];
    }
    get html() {
      let { r, e } = this;
      r = r.replace(/[(.)]/g, '');
      if (!Array.isArray(e)) return r + (e && `<b>${e}</b>`);
      return r + '<b>' + e[0] + '</b>/-<b>' + e[1] + '</b>';
    }
    get value() {
      let { r, e } = this;
      r = r.replace(/[(.)]/g, '');
      if (typeof e === 'string') return r + e;
      return r + e[0] + '/-' + e[1];
    }
    get r() { return this.root; }
    get e() { return this.ending; }
  }

  return function composeWord(data) {
    const [dec, value, translation, irregs] = data;
    const root = getWordRoot(value);
    const gen = getWordGen(value);
    const endings = ENDINGS[dec];
    const that = { dec, value, root, gen, translation, endings };
    const one = new WordForm(value.match(/[^ ]+/)[0]);
    const k = irregs && irregs.sg === null ? 1 : 0;
    that.forms = k ? [[], [one]] : [[one], []];

    if (dec.startsWith(3)) processDec3(that);

    switch (dec) {
      case '1a':
      case '1A':
      case '1b': process1aAb(that); break;
      case '1c': process1c(that); break;
      case '2a':
      case '2A': process2aA(that); break;
      case '3a':
      case '3A':
        if (dec === '3A') process3A(that);
        process3Aa(that);
        break;
      case '3b':
        process3b(that);
        if (translation === 'vir') process3A(that);
        break;
      case '3c': process3c(that); break;
      case '3d': process3d(that); break;
      case '3e': process3e(that); break;
      case '3f': process3f(that); break;
      case '3g':
      case '3G':
        process3g(that);
        if (dec === '3G') process3A(that);
        break;
    }

    if (/^[45]/.test(dec)) process4Or5(that);

    swapSigma(that);
    changeFlex(that);
    changeAcute(that);

    if (dec.startsWith(1) || dec === '3c') rmPL3Stress(that);
    if (dec !== '3e') swapAcute(that);
    if (irregs) processIrregulars(that, irregs);

    return that;
  }

  function isLongSyllable(syllable) {
    const match = REGEX_LONG.exec(syllable);
    return match ? !REGEX_SHORT.test(syllable) : false;
  }

  function changeFlex({ forms, translation }) {
    for (let c = 0; c < 2; c++) {
      const arr = forms[c];

      for (let i = 0; i < arr.length; i++) {
        const word = arr[i];
        const { root, ending } = word;
        const syllables = root.split(SYLLABLES_SEPARATOR);
        const syllsLen = syllables.length;

        if ((syllsLen + (ending ? 1 : 0)) < 2) continue;
        if (Array.isArray(ending)) continue;

        const offset = ending ? 1 : 2;
        const lastSyllable = ending || syllables.at(-1);
        const prelastSyllable = syllables.at(-offset);

        if (!hasCFlex(prelastSyllable)) continue;
        if (!isLongSyllable(lastSyllable)) continue;

        const [flex] = findCFlex(prelastSyllable);
        const [row, col] = getVowelPosition(flex);

        if (!(col === COL_CFLEX || col === COL_ASPIRATE_CFLEX)) continue;

        const xcol = col === COL_CFLEX
          ? (/[12]/.test(row) ? COL_ACUTE : COL_MACRON_ACUTE)
          : COL_ASPIRATE_ACUTE;

        const replacer = ([s]) => s[0] + VOWELS[row][COL_ACUTE];
        const alt = prelastSyllable.replace(flex, VOWELS[row][xcol]);
        const x = alt.replace(/[αυεο]ῑ́|[αηωεο]ῡ́/, replacer);

        syllables[syllsLen - offset] = x;
        word.root = syllables.join(SYLLABLES_SEPARATOR);
      }
    }
  }

  function isD1234(row, col, syllable, acute) {
    if (col !== COL_ACUTE) return;
    if (/[12]/.test(row)) return true;
    if (!/[34]/.test(row)) return;
    const prev = syllable[syllable.indexOf(acute) - 1];
    return REGEX_DIPH.test(prev + acute);
  }

  function changeAcute({ forms, translation }) {
    for (let c = 0; c < 2; c++) {
      const arr = forms[c];

      for (let i = 0; i < arr.length; i++) {
        const word = arr[i];
        const { root, ending } = word;

        if (Array.isArray(ending)) continue;

        const syllables = root.split(SYLLABLES_SEPARATOR);
        const syllsLen = syllables.length;
        const se = ending ? !!stripConsonants(ending) : 0;

        if ((syllsLen + (se ? 1 : 0)) < 2) continue;

        const offset = se ? 1 : 2;
        const lastSyllable = (se ? ending : null) || syllables.at(-1);
        const prelastSyllable = syllables.at(-offset);

        if (!hasAcute(prelastSyllable)) continue;
        if (isLongSyllable(lastSyllable)) continue;

        const [acute] = findAcute(prelastSyllable);
        const [row, col] = getVowelPosition(acute);
        const xcol = col === COL_ASPIRATE_ACUTE
          ? COL_ASPIRATE_CFLEX
          : col === COL_MACRON_ACUTE
          ? COL_CFLEX
          : isD1234(row, col, prelastSyllable, acute)
          ? COL_CFLEX
          : col;

        if (VOWELS[row][xcol] === '-') return;

        const alt = prelastSyllable.replace(acute, VOWELS[row][xcol]);
        syllables[syllsLen - offset] = alt;

        word.root = syllables.join(SYLLABLES_SEPARATOR);
      }
    }
  }

  // ====================

  function swapSigma({ forms }) {
    for (const arr of forms) {
      for (const word of arr) {
        const { r, e } = word;
        if (Array.isArray(e)) continue;
        if (e.endsWith('σ')) word.ending = e.replace('σ', 'ς');
        else if (!e && r.endsWith('σ')) word.root = r.replace('σ', 'ς');
      }
    }
  }

  function swapAcute({ forms }) {
    for (const arr of forms) {
      for (let i = 0; i < arr.length; i++) {
        const word = arr[i];
        const { root, ending } = word;

        if (Array.isArray(ending)) continue;

        const syllables = root.split(SYLLABLES_SEPARATOR);
        const syllsLen = syllables.length;

        if ((syllsLen + (ending ? 1 : 0)) < 3) continue;

        const offset = ending ? 1 : 2;
        const lastSyllable = ending || syllables.at(-1);
        const pre1Syllable = syllables.at(-offset);
        const pre2Syllable = syllables.at(-offset - 1);

        if (!hasAcute(pre2Syllable)) continue;
        if (!isLongSyllable(lastSyllable)) continue;

        const [r1, c1, v1] = getVowelPosition(findAcute(pre2Syllable)[0]);
        let xcol = c1 === COL_ACUTE
          ? COL_PURE : c1 === COL_ASPIRATE_ACUTE
          ? COL_ASPIRATE : c1 === COL_MACRON_ACUTE
          ? COL_MACRON : c1;

        let alt = pre2Syllable.replace(v1, VOWELS[r1][xcol]);
        syllables[syllsLen - offset - 1] = alt;

        const [r2, c2, v2] = getVowelPosition(findLastVowel(pre1Syllable));
        xcol = c2 === COL_PURE
          ? COL_ACUTE : c2 === COL_MACRON
          ? COL_MACRON_ACUTE
          : c2;

        alt = pre1Syllable.replace(v2, VOWELS[r2][xcol]);
        syllables[syllsLen - offset] = alt;

        word.root = syllables.join(SYLLABLES_SEPARATOR);
      }
    }
  }

  function rmPL3Stress({ root, root2, forms }) {
    const vowelsOnlyRaw = stripConsonants((root2 || root).replaceAll('.', ''));
    if (!vowelsOnlyRaw) return;

    const details = [];
    const vowels = vowelsOnlyRaw.match(new RegExp(`.${ACUTE}?`, 'g'));

    for (let i = 0; i < vowels.length; i++) {
      const pos = getVowelPosition(vowels[i]);
      if (!pos || /[0168]/.test(pos[1])) continue;
      details.push(vowels[i], ...pos);
      break;
    }

    if (!details.length) return;

    const [vowel, row, col] = details;
    let col2 = -1;

    if (/[034]/.test(row)) {
      col2 = /[49]/.test(col) ? 8 : col - (/[23]/.test(col) ? 2 : 1);
    } else if (/[12]/.test(row)) {
      col2 = /[24]/.test(col) ? 0 : /[35]/.test(col) ? 1 : 6;
    } else {
      col2 = col - 2;
    }

    if (col2 < 0) return;

    const alt = VOWELS[row][col2];
    forms[1][2].root = forms[1][2].root.replace(vowel, alt);
  }

  function processIrregulars(that, irregs) {
    const { root, forms } = that;
    that.irregs = irregs;

    for (const [key, data] of Object.entries(irregs)) {
      const k = key === 'sg' ? 0 : 1;

      if (!data) {
        forms[k].fill(null);
        continue;
      }

      for (const [ind, val] of Object.entries(data)) {
        forms[k][ind - 1] = new WordForm(val.replace('&', root));
      }
    }
  }

  // ====================

  function process1aAb({ root, endings, forms }) {
    endings[0].forEach((end, i) => {
      if (forms[0][i]) return;
      const [a, b] = end.split(ENDINGS_SEPARATOR);
      const e = (!b || !REGEX_ALPHA_PURA.test(root)) ? a : b;
      forms[0].push(new WordForm(`${root}~${e}`));
    });

    const create = (e, i) => forms[1][i] || new WordForm(`${root}~${e}`);
    forms[1] = endings[1].map(create);
  }

  function process1c({ root, endings, forms }) {
    endings[0].forEach((end, i) => {
      if (forms[0][i]) return;
      if (i === 4 && root.endsWith('τ')) {
        const e = end.match(/\S+$/)[0];
        return forms[0].push(new WordForm(`${root}~${e}`));
      }

      const [a, b] = end.split(ENDINGS_SEPARATOR);
      const x = (!b || !REGEX_ALPHA_PURA.test(root)) ? a : b;
      forms[0].push(new WordForm(`${root}~${x}`));
    });

    const create = (e, i) => forms[1][i] || new WordForm(`${root}~${e}`);
    forms[1] = endings[1].map(create);
  }

  function process2aA({ root, gen, endings, forms }) {
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < endings[c].length; i++) {
        if (forms[c][i]) continue;
        const [a, b] = endings[c][i].split(ENDINGS_SEPARATOR);
        const e = gen === 'τὸ' ? (b ?? a) : a;

        if (e === '=') {
          const { root, ending = '' } = forms[c][0];
          forms[c].push(new WordForm(`${root}~${ending}`));
          continue;
        }

        forms[c].push(new WordForm(`${root}~${e}`));
      }
    }
  }

  function processDec3(that) {
    const { value, gen, endings, forms } = that;
    const r1 = that.root = value.match(/[^~ ]+/)[0];
    const r2 = that.root2 = (value.match(/\((.+?)\)$/) || [])[1] || r1;

    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < endings[c].length; i++) {
        if (forms[c][i]) continue;

        const r = !c && !i ? r1 : r2;
        const [a, b] = endings[c][i].split(ENDINGS_SEPARATOR);
        const e = gen === 'τὸ' ? (b ?? a) : a;

        if (e === '=') {
          const { root, ending = '' } = forms[c][0];
          forms[c].push(new WordForm(`${root}~${ending}`));
          continue;
        }

        const x = e && `~${e}`;
        forms[c].push(new WordForm(r + x));
      }
    }
  }

  function process3A({ forms }) {
    for (const arr of forms) {
      for (let i = 0; i < arr.length; i++) {
        if (!/[23]/.test(i)) continue;

        const { root } = arr[i];
        const acc = findLastVowel(root);
        const pos = getVowelPosition(acc);

        if (!pos || !/[234579]/.test(pos[1])) continue;

        const x = /[35]/.test(pos[1]) ? 1 : 0;
        const alt = VOWELS[pos[0]][x];
        arr[i].root = root.replace(acc, alt);
      }
    }
  }

  function process3Aa({ forms }) {
    const word = forms[1][3];
    let { r, e } = word;

    if (r.endsWith('οντ')) {
      r = r.slice(0, -2) + 'υ';
      word.root = r;
      return;
    }

    while (true) {
      const oldRoot = r;

      if (/[τδθν]$/.test(r)) r = r.slice(0, -1);
      if (/[πβφ]$/.test(r)) {
        e = e.replace('σ', '');
        r = r.slice(0, -1) + 'ψ';
      }
      if (/[κγχ]$/.test(r)) {
        e = e.replace('σ', '');
        r = r.slice(0, -1) + 'ξ';
      }

      if (r === oldRoot) break;
    }

    word.root = r;
    word.ending = e;
  }

  function process3b({ forms }) {
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < forms[c].length; i++) {
        const word = forms[c][i];
        const replacement = (!c && i === 1 || c && i !== 3) ? '$1' : '';
        word.root = word.root.replace(/\[(.)\]/, replacement);
      }
    }
  }

  function process3c({ forms }) {
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < forms[c].length; i++) {
        if (!c && i === 4) continue;

        const word = forms[c][i];
        let { r, e } = word;
        r = r.replace(/σ$/, '');

        if (c && i === 3) {
          word.root = r;
          continue;
        }

        if (r.endsWith('ε')) r = r.slice(0, -1);

        if (e.startsWith('α')) e = e.replace('α', 'η');
        else if (e.startsWith('ο')) e = e.replace('ο', 'ου');
        else if (e.startsWith('ι')) e = e.replace('ι', 'ει');
        else if (e.startsWith('ε')) e = e.replace('ε', 'ει');

        word.root = r + e;
        word.ending = '';
      }
    }
  }

  function process3d({ forms }) {
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < forms[c].length; i++) {
        const word = forms[c][i];
        let { r, e } = word;
        r = r.replace('ϝ', '').replace(/σ$/, '');

        if (r.endsWith('ε') && (!c || c && i !== 3)) r = r.slice(0, -1);
        if (r.endsWith('.')) r = r.slice(0, -1);

        if (e.startsWith('α')) e = e.replace('α', 'ᾱ́');
        else if (e.startsWith('ο')) e = e.replace('ο', 'ου');
        else if (e.startsWith('ι')) {
          e = e.replace('ι', 'ῖ');
          if (r.endsWith('έ')) r = r.replace('έ', 'ε');
        } else if (c && i === 2) {
          if (r.endsWith('έ')) r = r.replace('έ', 'ε');
        }

        word.root = r + e;
        word.ending = '';
      }
    }
  }

  function process3e({ forms }) {
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < forms[c].length; i++) {
        const word = forms[c][i];
        let { r, e } = word;
        let [a, b] = r.split(' / ');
        r = (!b || !c && /[014]/.test(i)) ? a : b;

        if ((c && /[014]/.test(i)) && r.includes('εϝ')) r = r.replace('ε', '');
        r = r.replace('ϝ', '');

        if (e.startsWith('α')) e = e.replace('α', 'η');
        else if (e.startsWith('ο')) e = e.replace('ο', 'ω');
        else if (e.startsWith('ε')) e = e.replace('ε', 'ι');

        word.root = r;
        word.ending = e;
      }
    }
  }

  function process3f({ forms }) {
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < forms[c].length; i++) {
        const word = forms[c][i];
        let { r, e } = word;
        r = r.replace('ϝ', (!c && i === 4 || c && i === 3) ? 'ῦ' : '');
        r = r.replace('ή', c && /[014]/.test(i)
          ? '' : (!c && /[12]/.test(i) || c && i === 2)
          ? 'έ' : 'ε'
        );

        const s = e[0];

        if (s === 'ο') e = e.replace(s, 'ω');
        else if (s === 'ι') e = e.replace(s, 'ῖ');
        else if (s === 'ε') e = [e.replace(s, 'ῆ'), e.replace(s, 'εῖ')];

        word.root = r;
        word.ending = e;
      }
    }
  }

  function process3g({ root, root2, forms }) {
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < forms[c].length; i++) {
        const word = forms[c][i];
        let { r, e } = word;

        if (!c && /[014]/.test(i)) {
          r = root;
        } else {
          r = root2;
          if (e.startsWith('α')) {
            e = e.slice(1);
            r = r.replace(/\S$/, 'ῦ');
          }
        }

        word.root = r;
        word.ending = e;
      }
    }
  }

  function process4Or5(that) {
    const ex = that.dec.slice(2);
    if (!ex) return;

    const funcs = {
      '1a': process1aAb,
      '1b': process1aAb,
      '2a': process2aA,
      '3a': p3,
      '3A': p3
    };

    that.endings = ENDINGS[ex];
    funcs[ex](that);

    function p3() {
      processDec3(that);
      process3A(that);
      process3Aa(that);
    }
  }

  // ====================

  function hasCFlex(str) {
    return !!findCFlex(str);
  }

  function findCFlex(str) {
    return str.match(REG_CFLEX)
      || str.match(REG_ASPIRATE_CFLEX)
      || str.match(REG_CFLEX_IOTA);
  }

  function hasAcute(str) {
    return !!findAcute(str);
  }

  function findAcute(str) {
    return str.match(REG_MACRON_ACUTE)
      || str.match(REG_ASPIRATE_ACUTE)
      || str.match(REG_ACUTE);
  }

  function findLastVowel(str) {
    return stripConsonants(str).at(-1);
  }

  function stripConsonants(str) {
    return str.replace(REGEX_CONSONANTS, '');
  }

  function getVowelPosition(vowel) {
    for (let i = 0; i < VOWELS.length; i++) {
      const j = VOWELS[i].indexOf(vowel);
      if (~j) return [i, j, vowel];
    }
  }
})();