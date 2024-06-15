(function() {
  'use strict';

  [...document.scripts].forEach((el) => el.remove());

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
  const sort = (array) => array.sort(() => Math.random() - 0.5);

  const conjugations = ['I', 'II', 'III a', 'III b', 'IV'];

  // =========================

  const createWord = window.__create;
  const vocabulary = sort(VOCABULARY.splice(0)).map((a) => createWord(...a));

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
  let isAnswersShown = false;

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
    btnGet.click();
  }

  const getInflection = (form, root) => {
    if (!form) return '';

    const {vowel, suffix, joint, ending} = form;
    return (form.root || root) + vowel + suffix + joint + ending;
  };

  btnGet.addEventListener('click', function() {
    if (currentWord) {
      vocabulary.push(vocabulary.splice(vocabulary.indexOf(currentWord), 1)[0]);
    }

    let conjugation = select1.value;

    if (conjugation === 'r') {
      conjugation = conjugations[Math.random() * conjugations.length >> 0];
    }

    const tense = +select2.value;
    currentWord = vocabulary.find(that => that.conjugation === conjugation);

    if (!currentWord) return;

    fillWords();

    inputs.forEach((el) => {
      setNoValue(el);
      el.parentNode.removeAttribute('data-valid');
    });

    const forms = currentWord.getTense(tense)[conjugation];
    forms.sg.forEach((x, i) => x && clearValue(fields[0][i]));
    forms.pl.forEach((x, i) => x && clearValue(fields[1][i]));

    table2.remove();
    isAnswersShown = false;

    if (btnAnswers.textContent[0] !== 'R') btnAnswers.textContent = 'Mónstráre';
  });

  function fillWords() {
    words[0].innerHTML = currentWord.value;
    words[1].innerHTML = currentWord.translation;
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
    const data = currentWord.getTense(+select2.value)[currentWord.conjugation];

    inputs.forEach((el, i) => {
      const {dataset} = el.parentNode;

      if (+dataset.none) return;

      const userValue = el.value.trim().toLowerCase();

      if (!userValue) return dataset.valid = 0;

      const form = data[i >= qnt ? 'pl' : 'sg'][i % qnt];
      const value = getInflection(form, data.root).toLowerCase();
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
    if (isAnswersShown) {
      isAnswersShown = false;
      this.textContent = 'Mónstráre';
      return table2.remove();
    }

    if (!currentWord) return;

    inputs2.forEach((el, i) => {
      el.innerHTML = currentWord.eval(+select2.value, i >= qnt, i % qnt);
    });

    table.parentNode.appendChild(table2);
    this.textContent = 'Céláre';
    isAnswersShown = true;
  });

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