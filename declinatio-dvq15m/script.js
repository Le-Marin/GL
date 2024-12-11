import vocabulary1 from './vocabulary.js?v=2b';
import vocabulary2 from './vocabulary-med.js?v=2b';
import defineSelect from './select.js?v=2b';
import getDictWord from './declensions.js?v=2b';
import setSwitch from './switch.js?v=2b';
import keyboard from './keyboard.js?v=2b';

[...document.scripts].forEach(el => el.remove());

// =========================

let devMode = location.hostname === '127.0.0.1';
let currentWord = null;
let currentForms = null;
let isAnswersShown = false;

const vocabulary = [];

const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
const getInflection = (i) => currentForms[+(i >= qnt)][i % qnt] || '';

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

inputs.forEach((el, i) => {
  el._off = el._none = false;
  el._shadow = inputs2[i];
});

setSwitch(table, inputs);

// =========================

defineSelect(select, generateWord);
btnGet.addEventListener('click', generateWord);

function generateWord() {
  if (currentWord) {
    const index = vocabulary.indexOf(currentWord);
    vocabulary.push(vocabulary.splice(index, 1)[0]);
  }

  const declension = +select.value || 1 + Math.random() * select.length >> 0;
  currentWord = vocabulary.find(([d]) => d === declension);

  if (!currentWord) return;

  fillWords(currentWord);

  inputs.forEach((el) => {
    setNoValue(el);
    el.parentNode.removeAttribute('data-valid');
  });

  currentForms = getDictWord(currentWord);
  currentForms[0].forEach((x, i) => x && clearValue(inputs[i]));
  currentForms[1].forEach((x, i) => x && clearValue(inputs[i + qnt]));

  if (devMode) return btnAnswers.click();

  table2.remove();
  isAnswersShown = false;

  if (btnAnswers.textContent[0] !== 'R') {
    btnAnswers.textContent = 'Mónstráre';
  }
}

function fillWords([declension, value, translation]) {
  if (declension === 6) {
    value = value
      .replace(/ ?\[[^\]]+\]/g, '')
      .replaceAll('-', '');
  } else {
    value = value
      .split('[')[0]
      .trim()
      .replace(/^(\S+)-/, '$1')
      .replace(/ ([mfn]{1,2})$/, ' <b>$1</b>');
  }

  words[0].innerHTML = value.replaceAll('~', '');
  words[1].innerHTML = translation;
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

btnCheck.addEventListener('click', checkInputs);

function checkInputs() {
  if (!currentWord) return;

  const {sensitivity, cases} = keyboard;

  inputs.forEach((el, i) => {
    if (el._none || el._off) return;

    const {dataset} = el.parentNode;
    const userValue = el.value.trim().toLowerCase();

    if (!userValue) return dataset.valid = 0;

    const value = getInflection(i).toLowerCase().replace(/[~^\-]/g, '');
    const chunks = value.split('/');

    if (chunks.length === 1 && value.length !== userValue.length) {
      return dataset.valid = 0;
    }

    const test = chunks.length === 2 && value.includes(' ');

    if (test && !chunks.every(x => x.includes(' '))) {
      const key = +!chunks[0].includes(' ');
      const res = [chunks[key].split(' ')[key], chunks[1 - key]];
      chunks[1 - key] = (key ? res.reverse() : res).join(' ');
    }

    const isValid = chunks.some(x => x === userValue);

    if (isValid || sensitivity) return dataset.valid = +isValid;

    dataset.valid = +chunks.some(x => matchValues(x, userValue, cases));
  });
}

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

btnAnswers.addEventListener('click', function() {
  if (isAnswersShown && !devMode) {
    isAnswersShown = false;
    this.textContent = 'Mónstráre';
    return table2.remove();
  }

  if (!currentWord) return;

  const search = /([~^])([^ /]+)/g;
  const replacer = (m, s, v) => `<b${s === '~' ? '' : ' class="b"'}>${v}</b>`;

  inputs2.forEach((el, i) => {
    if (inputs[i]._none) return el.innerHTML = '';
    el.innerHTML = getInflection(i).replace(search, replacer);
  });

  if (!table2.parentNode) rootElem.appendChild(table2);

  this.textContent = 'Céláre';
  isAnswersShown = true;
});

// =========================

keyboard.__init__(rootElem.firstElementChild, checkInputs);

rootElem.children[5].addEventListener('click', function(e) {
  const trg = e.target.closest('.set-btn');

  if (!trg) return;

  this.remove();

  const sort = (a) => a.slice().sort(() => Math.random() - 0.5);

  if (trg.textContent.trim() === 'CLASS.') {
    return vocabulary.push(...sort(vocabulary1));
  }

  [...select.options].slice(-2).forEach(el => el.remove());
  vocabulary.push(...sort(vocabulary2));
  table.classList.add('med-mode');
  table2.classList.add('med-mode');
});