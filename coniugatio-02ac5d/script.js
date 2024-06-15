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

  const select1 = $('.select-conjugation');
  const select2 = select1.nextElementSibling;
  const btnGet = $('.get');
  const btnCheck = $('.check');
  const btnAnswers = btnCheck.nextElementSibling;
  const words = $('.words').children;
  const table = $('.table');

  const table2 = table.cloneNode();
  table2.classList.add('result');
  table2.innerHTML = table.innerHTML
    .replace(/<input.+?>/g, '<div class="input"></div>');

  const inputs = $$('.input', table);
  const inputs2 = $$('.input', table2);
  const qnt = inputs.length / 2;
  const fields = [inputs.slice(0, qnt), inputs.slice(qnt)];

  let currentWord = null;
  let currentForms = null;
  let isNextWordNeeded = true;
  let isAnswersVisible = false;

  select1.addEventListener('change', onSelectChange);
  select2.addEventListener('change', onSelectChange);

  select1.addEventListener('wheel', onSelectWheel);
  select2.addEventListener('wheel', onSelectWheel);

  function onSelectWheel(e) {
    e.preventDefault();

    const s = e.deltaY > 0 ? 1 : -1;
    const options = [...this.options];
    const getNext = (i) => options[s + i] || options.at(-1 + (s === 1));
    let next = getNext(this.selectedIndex);

    while (next.disabled) next = getNext(next.index);

    next.selected = true;
    onSelectChange.call(this);
  }

  function onSelectChange() {
    isNextWordNeeded = this === select1 || select1.value === '0';
    btnGet.click();
  }

  function switchOptions(conjugation, tense, i) {
    const callback = conjugation === 6
      ? el => el.disabled = !(el.value % 2)
      : i === -1
      ? el => el.disabled = el.value === '-'
      : el => el.disabled = !(el.value % 2) || i < 3 && /13|15/.test(el.value);

    select1.options[7].disabled = !(tense % 2);
    [...select2.options].forEach(callback);
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
    const ind = conjugation === 5
      ? ['possum', 'vol', 'māl', 'nōl', 'sum', 'e'].indexOf(word.root)
      : -1;

    if (~ind && (!(tense % 2) || ind < 3 && [13, 15].includes(tense))) {
      return get();
    }

    fillWords(word);
    switchOptions(conjugation, tense, ind);

    inputs.forEach((el) => {
      setNoValue(el);
      el.parentNode.removeAttribute('data-valid');
    });

    currentForms = word.getTense(tense);
    currentForms[0].forEach((x, i) => x && clearValue(fields[0][i]));
    currentForms[1].forEach((x, i) => x && clearValue(fields[1][i]));

    table2.remove();
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
    el.value = '\u2716';
    el.disabled = true;
    el.parentNode.dataset.none = 1;
  }

  function clearValue(el) {
    el.value = '';
    el.disabled = false;
    el.parentNode.removeAttribute('data-none');
  }

  // =========================

  const btnCase = $('.case');
  const cases = {'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y'};

  btnCase.addEventListener('click', function() {
    this.classList.toggle('__disabled');
  });

  btnCheck.addEventListener('click', function() {
    if (!currentWord) return;

    const isCaseSensitive = !btnCase.classList.contains('__disabled');

    inputs.forEach((el, i) => {
      const {dataset} = el.parentNode;

      if (+dataset.none) return;

      const userValue = el.value.trim().toLowerCase();

      if (!userValue) return dataset.valid = 0;

      const form = currentForms[+(i >= qnt)][i % qnt];
      const value = form.replace(/[|:~^]/g, '').toLowerCase();
      const chunks = value.split('/');

      if (chunks.length === 1 && value.length !== userValue.length) {
        return dataset.valid = 0;
      }

      const isValid = chunks.some(x => x === userValue);

      if (isValid || isCaseSensitive) return dataset.valid = +isValid;

      dataset.valid = +chunks.some(value => {
        if (value.length !== userValue.length) return;

        for (let i = 0; i < value.length; i++) {
          let a = value[i];
          let b = userValue[i];

          if (a in cases) {
            a = cases[a];
            b = cases[b] || b;
          }

          if (a !== b) return;
        }

        return true;
      });
    });
  });

  // =========================

  btnAnswers.addEventListener('click', function() {
    if (isAnswersVisible) {
      isAnswersVisible = false;
      this.textContent = 'Mónstráre';
      return table2.remove();
    }

    if (!currentWord) return;

    const tense = +select2.value + (currentWord[0] === 6);
    const isCompound = /^(8|10|12|22|24)/.test(tense);

    inputs2.forEach((el, i) => {
      const form = currentForms[+(i >= qnt)][i % qnt];
      el.innerHTML = form2HTML(form, tense, isCompound);
    });

    if (!table2.parentNode) table.parentNode.appendChild(table2);

    this.textContent = 'Céláre';
    isAnswersVisible = true;
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

  const keyboard = (function() {
    const target = $('.keyboard');
    const [caseSwitcher, trigger, body] = target.children;

    return {
      __init__() {
        this.onHandleClick = this.onHandleClick.bind(this);
        target.addEventListener('click', this.onHandleClick);
      },
      onHandleClick(e) {
        const trg = e.target;

        if (trg === trigger)
          return this.toggle();

        if (trg === caseSwitcher)
          return btnCheck.click();

        if (trg.matches('.keyboard__key'))
          return this.printKey(trg.textContent, e.shiftKey);
      },
      toggle() {
        return body.classList.toggle('__shown');
      },
      printKey(key, isUpper) {
        if (!isUpper) key = key.toLowerCase();
        return document.execCommand('insertText', false, key);
      }
    };
  })();

  keyboard.__init__();
})();