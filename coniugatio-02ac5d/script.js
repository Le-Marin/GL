(function() {
  'use strict';

  [...document.scripts].forEach((el) => el.remove());

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

  const conjugations = [1, 2, 3.1, 3.2, 4, 5, 6];

  // =========================

  const vocabulary = VOCABULARY.splice(0).sort(() => Math.random() - 0.5);

  const getDictWord = (function(create, that) {
    const key = `${that[0]}_${that[1]}`;
    return this[key] || (this[key] = create(...that));
  }).bind({}, window.__create);

  const rootElem = $('#root');
  const select1 = $('#select-conjugation');
  const select2 = select1.nextElementSibling;
  const btnGet = select2.nextElementSibling;
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
  const fields = [inputs.slice(0, qnt), inputs.slice(qnt)];

  inputs.forEach(el => { el._off = el._none = false; });

  let decMode = 0;
  let currentWord = null;
  let currentForms = null;
  let isNextWordNeeded = true;
  let isAnswersVisible = false;

  // =========================

  const verbales = [25, 26, 27, 28, 29];

  const decTable = table.cloneNode();
  decTable.innerHTML = /*html*/`
    <div class="col col-1">
      <div class="row row-1">CASVS</div>
      <div class="row" data-case="Nom"><b class="r-switch"></b><b class="r-case">Nóminátívus:</b></div>
      <div class="row" data-case="Gen"><b class="r-switch"></b><b class="r-case">Genetívus:</b></div>
      <div class="row" data-case="Dat"><b class="r-switch"></b><b class="r-case">Datívus:</b></div>
      <div class="row" data-case="Acc"><b class="r-switch"></b><b class="r-case">Accúsátívus:</b></div>
      <div class="row" data-case="Abl"><b class="r-switch"></b><b class="r-case">Ablátívus:</b></div>
      <div class="row" data-case="Voc"><b class="r-switch"></b><b class="r-case">Vocátívus:</b></div>
    </div>
    <div class="col">
      <div class="row row-1">SINGVLARIS</div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
    </div>
    <div class="col">
      <div class="row row-1">PLVRALIS</div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
      <div class="row"><input class="input" type="text" autocapitalize="off"></div>
    </div>
  `;

  const decTable2 = table2.cloneNode();
  decTable2.innerHTML = decTable.innerHTML
    .replace(/<input.+?>/g, '<div class="input input-2"></div>');

  const decInputs = $$('input', decTable);
  const decInputs2 = $$('.input', decTable2);
  const decQnt = decInputs.length / 2;
  const decFields = [decInputs.slice(0, decQnt), decInputs.slice(decQnt)];
  const decFields2 = [decInputs2.slice(0, decQnt), decInputs2.slice(decQnt)];

  decInputs.forEach(el => { el._off = el._none = false; });

  const getElIndex = el => [...el.parentNode.children].indexOf(el);

  decTable.addEventListener('click', function(e) {
    const trg = e.target;
    if (!trg.matches('.r-switch')) return;

    const force = trg.classList.toggle('_off');
    const i = getElIndex(trg.parentNode) - 1;
    const i1 = decFields[0][i];
    const i2 = decFields[1][i];
    const d1 = decFields2[0][i];
    const d2 = decFields2[1][i];

    i1._off = force;
    i2._off = force;
    i1.disabled = force || i1._none;
    i2.disabled = force || i2._none;

    i1.parentNode.classList.toggle('_off', force);
    i2.parentNode.classList.toggle('_off', force);
    d1.parentNode.classList.toggle('_off', force);
    d2.parentNode.classList.toggle('_off', force);
  });

  // =========================

  defineSelect(select1, onSelectChange);
  defineSelect(select2, onSelectChange);

  function onSelectChange() {
    isNextWordNeeded = this === select1 || select1.value === '0';

    if (!decMode && verbales.includes(+this.value)) {
      decMode = 1;
      table2.remove();
      table.replaceWith(decTable);
    } else if (decMode && !verbales.includes(+select2.value)) {
      decMode = 0;
      decTable2.remove();
      decTable.replaceWith(table);
    }

    btnGet.click();
  }

  function switchOptions(conjugation, tense, i, r) {
    const callback = conjugation === 6
      ? el => el.disabled = !(el.value % 2)
      : i === -1
      ? el => el.disabled = el.value === '-'
      : el => el.disabled = !(el.value % 2) || i < 3 && /13|15/.test(el.value);

    select1.options[7].disabled = !(tense % 2);
    [...select2.options].forEach(callback);
    [...select2.options].slice(-verbales.length).forEach(el => el.disabled = 0);

    if (verbales.includes(tense)) select1.options[7].disabled = 0;

    /*const c = conjugation, t = tense;

    if (c !== 5) return;

    if (t === 25 && r === 'sum') {
      [...select2.options].find(el => el.value == t).disabled = 1;
    } else if (t === 26 && ['sum', 'vol', 'e', 'māl', 'nōl', 'possum'].includes(r)) {
      [...select2.options].find(el => el.value == t).disabled = 1;
    }*/
  }

  btnGet.addEventListener('click', function get() {
    if (currentWord && isNextWordNeeded) {
      const index = vocabulary.indexOf(currentWord);
      vocabulary.push(vocabulary.splice(index, 1)[0]);
    }

    let conjugation = +select1.value;
    const tense = +select2.value;

    if (!conjugation) {
      const rand = () => conjugations[Math.random() * conjugations.length >> 0];
      while ((conjugation = rand()) === 6 && !(tense % 2));
    }

    currentWord = (!isNextWordNeeded ? currentWord : null)
      || vocabulary.find(([c]) => c === conjugation);

    isNextWordNeeded = true;
    if (!currentWord) return;

    const word = getDictWord(currentWord);
    const {root} = word;
    const ind = conjugation === 5
      ? ['possum', 'vol', 'māl', 'nōl', 'sum', 'e'].indexOf(root)
      : -1;

    const test = ~ind && !verbales.includes(tense);

    if (test && (!(tense % 2) || ind < 3 && [13, 15].includes(tense))) {
      return get();
    }

    const options = [...select2.options];
    const search = (x) => (el) => el.value === x;
    const disable = (x) => { options.find(search(`${x}`)).disabled = true; };
    const check = (s) => s.split(' ').includes(root);

    if (conjugation === 5 && verbales.includes(tense)) {
      if (tense === 25 && root === 'sum') return get();
      if (tense === 26 && check('possum sum vol māl nōl e')) return get();
      if (tense === 27 && check('possum vol māl nōl')) return get();
      if (/28|29/.test(tense) && check('possum sum vol māl nōl')) return get();
    }
    if (conjugation === 6 && verbales.includes(tense)) {
      if (tense === 25 && root === 'f') return get();
      if (tense === 27 && root === 'f') return get();
      if (tense === 28 && root === 'f') return get();
    }

    fillWords(word);
    switchOptions(conjugation, tense, ind, root);

    if (conjugation === 5) {
      if (root === 'sum') disable(25);
      if (check('possum sum vol māl nōl e')) disable(26);
      if (check('possum vol māl nōl')) disable(27);
      if (check('possum sum vol māl nōl')) {
        disable(28);
        disable(29);
      }
    }
    if (conjugation === 6) {
      if (root === 'f') {
        disable(25);
        disable(27);
        disable(28);
      }
    }

    const _inputs = decMode ? decInputs : inputs;
    const _fields = decMode ? decFields : fields;
    const _t2 = decMode ? decTable2 : table2;

    _inputs.forEach((el) => {
      setNoValue(el);
      el.parentNode.removeAttribute('data-valid');
    });

    currentForms = word.getTense(tense);
    currentForms[0].forEach((x, i) => x && clearValue(_fields[0][i]));
    currentForms[1].forEach((x, i) => x && clearValue(_fields[1][i]));

    _t2.remove();
    isAnswersVisible = false;

    if (btnAnswers.textContent[0] !== 'R') {
      btnAnswers.textContent = 'Mónstráre';
    }
  });

  function fillWords({value, translation}) {
    words[1].innerHTML = translation;
    words[0].innerHTML = value.split('(')[0]
      .replaceAll('~', '')
      .replace(/^(\S+?)-/, '$1');
  }

  function setNoValue(el) {
    el.value = '';
    el.disabled = el._none = true;
    el.parentNode.setAttribute('data-none', 1);
  }

  function clearValue(el) {
    el._none = false;
    el.disabled = el._off;
    el.parentNode.removeAttribute('data-none');
  }

  // =========================

  const [btnCheck, btnAnswers] = table.nextElementSibling.children;

  btnCheck.addEventListener('click', function() {
    if (!currentWord) return;

    const {sensitivity, cases} = keyboard;
    const _inputs = decMode ? decInputs : inputs;
    const _qnt = decMode ? decQnt : qnt;

    _inputs.forEach((el, i) => {
      if (el._none || el._off) return;

      const {dataset} = el.parentNode;
      const userValue = el.value.trim().toLowerCase();

      if (!userValue) return dataset.valid = 0;

      const form = currentForms[+(i >= _qnt)][i % _qnt];
      const value = form.replace(/[|:~^]/g, '').toLowerCase();
      const chunks = value.split('/');

      if (chunks.length === 1 && value.length !== userValue.length) {
        return dataset.valid = 0;
      }

      const isValid = chunks.some(x => x === userValue);

      if (isValid || sensitivity) return dataset.valid = +isValid;

      dataset.valid = +chunks.some(x => matchValues(x, userValue, cases));
    });
  });

  function matchValues(v1, v2, cases) {
    if (v1.length !== v2.length) return false;

    for (let i = 0; i < v1.length; i++) {
      let a = v1[i];
      let b = v2[i];

      if (a in cases) {
        a = cases[a];
        b = cases[b] || b;
      }

      if (a !== b) return false;
    }

    return true;
  }

  // =========================

  btnAnswers.addEventListener('click', function() {
    const _t2 = decMode ? decTable2 : table2;

    if (isAnswersVisible) {
      isAnswersVisible = false;
      this.textContent = 'Mónstráre';
      _t2.remove();
      return;
    }

    if (!currentWord) return;

    const tense = +select2.value + (currentWord[0] === 6);
    const isCompound = /^(8|10|12|22|24)/.test(tense);
    const _inputs = decMode ? decInputs2 : inputs2;
    const _qnt = decMode ? decQnt : qnt;

    this.textContent = 'Céláre';
    isAnswersVisible = true;

    if (!_t2.parentNode) rootElem.appendChild(_t2);

    _inputs.forEach((el, i) => {
      const form = currentForms[+(i >= _qnt)][i % _qnt];
      el.innerHTML = form2HTML(form, tense, isCompound);
    });
  });

  function form2HTML(form, tense, isCompound) {
    if (!form) return '';

    const wrap = (type, val) => `<span class="x-${type}">${val}</span>`;
    const {conjugation, root} = getDictWord(currentWord);

    if (root === 'possum' && /^([1-6]|17)$/.test(tense)) {
      form = form.replace(/[|:~^]([^|:~^]+)/g, '$1');
      form = form.slice(0, 3) + wrap('compound', form.slice(3));
      return `<span class="t-${tense}">${form}</span>`;
    }

    const chunks = conjugation === 5 ? form.split('/') : [];

    if (chunks[1]) {
      return chunks.map(x => form2HTML(x, tense, isCompound)).join('/');
    }

    const end = form.split('~')[1];

    form = form.replace(/([|:^])([^|:~^]+)/g, (m, s, v) => {
      const t = {'|': 'vowel', '^': 'suffix', ':': 'joint'}[s];
      return wrap(t, v);
    });

    if (end) {
      form = form.slice(0, -end.length - 1);

      if (isCompound) {
        const [a, b] = end.split(' ');
        form += wrap('ending', a) + ' ' + wrap('compound', b);
      } else {
        form += wrap('ending', end);
      }
    }

    return `<span class="t-${tense}">${form}</span>`;
  }

  // =========================

  const keyboard = (function(target) {
    const [caseSwitcher, trigger, body] = target.children;
    const cases = {'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y'};

    return {
      __init__() {
        this.onHandleClick = this.onHandleClick.bind(this);
        target.addEventListener('click', this.onHandleClick);
      },
      onHandleClick(e) {
        const trg = e.target;

        if (trg === trigger) return this.toggle();

        if (trg === caseSwitcher) {
          trg.classList.toggle('__disabled');
          return btnCheck.click();
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
  })(rootElem.firstElementChild);

  keyboard.__init__();
})();