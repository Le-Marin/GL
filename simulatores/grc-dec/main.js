(function() {
  'use strict';

  const IS_DEV_MODE = location.protocol === 'file:';

  let currentWord = null;
  let currentForms = null;
  let composedWord = null;
  let isAnswersShown = false;

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
  const getInflection = (ind) => currentForms[+(ind >= qnt)][ind % qnt] || '';

  const rootElem = $('#root');
  const select = $('#select-declention');

  const btnGet = select.nextElementSibling;
  const words = rootElem.children[2].children;
  const table = rootElem.children[3];

  const table2 = table.cloneNode();
  table.classList.add('table1');
  table2.classList.add('result');
  table2.innerHTML = table.innerHTML
    .replace(/<input.+?>/g, '<div class="input input-2"></div>');

  const inputs = $$('input', table);
  const inputs2 = $$('.input', table2);
  const qnt = inputs.length / 2;

  inputs.forEach((elem, i) => {
    elem._off = elem._none = false;
    elem._shadow = inputs2[i];
  });

  setSwitch(table, inputs);

  if (!IS_DEV_MODE) vocabulary.sort(() => Math.random() - 0.5);

  // =========================

  defineSelect(select, generateWord);
  btnGet.addEventListener('click', generateWord);

  function generateWord() {
    if (currentWord) {
      const index = vocabulary.indexOf(currentWord);
      vocabulary.push(vocabulary.splice(index, 1)[0]);
    }

    const dec = +select.value || 1 + Math.random() * (select.length - 1) >> 0;
    currentWord = vocabulary.find(([d]) => d.startsWith(dec));

    if (!currentWord) return;

    fillWords(currentWord);

    inputs.forEach((elem) => {
      setNoValue(elem);
      elem.parentNode.removeAttribute('data-valid');
    });

    composedWord = composeWord(currentWord);
    currentForms = composedWord.forms;
    currentForms[0].forEach((x, i) => x && clearValue(inputs[i]));
    currentForms[1].forEach((x, i) => x && clearValue(inputs[i + qnt]));

    if (IS_DEV_MODE) return btnAnswers.click();

    table2.remove();
    isAnswersShown = false;

    if (btnAnswers.textContent[0] !== 'R') {
      btnAnswers.textContent = 'Mónstráre';
    }
  }

  function fillWords([declension, value, translation]) {
    if (/^[45]/.test(declension)) {
      value = value
        .replace(/ (ὁ|ἡ|τὸ)(?=$| )/, '')
        .replace(/\((.+?)\)$/, '')
    }

    value = value
      .replace('~', '')
      .replaceAll('.', '')
      .replace(/ (ὁ|ἡ|τὸ)(?=$| )/, ' <b>$1</b>')
      .replace(/\S+(?= \/|\)$)/g, '$&-')
      .replace(/\[(.+?)\]/, '$1');

    words[0].innerHTML = value;
    words[1].innerHTML = translation;
  }

  function setNoValue(elem) {
    elem.value = '';
    elem.disabled = elem._none = true;
    elem.parentNode.setAttribute('data-none', 1);
  }

  function clearValue(elem) {
    elem._none = false;
    elem.disabled = elem._off;
    elem.parentNode.removeAttribute('data-none');
  }

  // =========================

  const [btnCheck, btnAnswers] = table.nextElementSibling.children;

  btnCheck.addEventListener('click', checkInputs);

  function checkInputs() {
    if (!currentWord) return;

    const { sensitivity, VOWELS } = keyboard;
    const redieresis = (val) => val.replaceAll('ϊ', 'ι').replaceAll('ΐ', 'ί');

    inputs.forEach((elem, ind) => {
      if (elem._none || elem._off) return;

      const { dataset } = elem.parentNode;
      const userValue = redieresis(elem.value.trim().toLowerCase());

      if (!userValue) return dataset.valid = 0;

      const form = getInflection(ind);
      const value = redieresis(form.value.toLowerCase());
      let chunks = value.split('/-');

      if (chunks.length === 2) chunks = form.forms2.map(redieresis);

      dataset.valid = sensitivity
        ? +chunks.some(x => x === userValue)
        : +chunks.some(x => compare(x, userValue));
    });

    function compare(a, b) {
      for (const row of VOWELS) {
        const x = row.at(-1);
        const y = row.at(-2);
        if (x !== '-') {
          a = a.replaceAll(x, row[2]);
          b = b.replaceAll(x, row[2]);
        }
        if (y !== '-') {
          a = a.replaceAll(y, row[0]);
          b = b.replaceAll(y, row[0]);
        }
      }
      return a === b;
    }
  }

  btnAnswers.addEventListener('click', function() {
    if (isAnswersShown && !IS_DEV_MODE) {
      isAnswersShown = false;
      this.textContent = 'Mónstráre';
      return table2.remove();
    }

    if (!currentWord) return;

    const is3cd = /^3[cd]/.test(composedWord.dec);
    const is3ef = !is3cd && /^3[ef]/.test(composedWord.dec);
    const is3g = !is3ef && /^3g/i.test(composedWord.dec);

    inputs2.forEach((elem, i) => {
      if (inputs[i]._none) return elem.replaceChildren();
      const f = getInflection(i);
      elem.innerHTML = f ? composeForm(f, i) : '';
    });

    if (IS_DEV_MODE && typeof __check__ === 'function') {
      __check__(inputs2, composedWord);
    }

    function composeForm(f, i) {
      if (i === 4) return f.html;
      if (is3cd) return _3cd(f, i);
      if (is3ef) return _3ef(f, i);
      if (is3g) return _3g(f, i);
      return f.html

      function _3cd({ value, html }, i) {
        if (value.endsWith('σιν')) return value.replace('σιν', '<b>$&</b>');
        const reg = /(?:η|ους|εις|ε[ιῖ]|[ωῶ]ν|ᾱ)$/;
        return reg.test(value)
        ? value.replace(reg, '<b class="joint">$&</b>')
        : html;
      }

      function _3ef({ value, html }, i) {
        const reg = /(?:ως|εῖς|εις|ει|εῖ|ων|η|ᾱ|ῆς)(?=$|\/)/g;
        return reg.test(value)
        ? value.replace(reg, '<b class="joint">$&</b>')
        : html;
      }

      function _3g({ value, html }, i) {
        if (i !== 6) return html;
        const reg = /(?:ῦς)$/;
        return reg.test(value)
        ? value.replace(reg, '<b class="joint">$&</b>')
        : html;
      }
    }

    if (!table2.isConnected) rootElem.appendChild(table2);

    this.textContent = 'Céláre';
    isAnswersShown = true;
  });

  // =========================

  keyboard.__init__(rootElem.firstElementChild, checkInputs);

  // =========================

  if (IS_DEV_MODE) {
    const s = document.createElement('script');
    s.setAttribute('src', '_check.js');
    document.head.appendChild(s);
  }
})();