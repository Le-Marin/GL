import VOCABULARY from './vocabulary.js?v=2c';
import createWord from './create.js?v=2c';
import defineSelect from '../../select.js?v=2c';
import keyboard from '../../keyboard.js?v=2c';

// =========================

let devMode = location.hostname === '127.0.0.1';
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
const sort = (array) => array.sort(() => Math.random() - 0.5);

const conjugations = [1, 2, 3.1, 3.2, 4];

// =========================

const vocabulary = sort(VOCABULARY).map((a) => createWord(...a));

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

inputs.forEach((el, i) => {
  el._off = el._none = false;
  el._shadow = inputs2[i];
});

// =========================

let currentWord = null;
let isAnswersShown = false;

defineSelect(select1, () => btnGet.click());
defineSelect(select2, () => btnGet.click());

const getInflection = (form, root) => {
  if (!form) return '';

  const {vowel, suffix, joint, ending} = form;
  return (form.root || root) + vowel + suffix + joint + ending;
};

btnGet.addEventListener('click', function() {
  if (currentWord) {
    vocabulary.push(vocabulary.splice(vocabulary.indexOf(currentWord), 1)[0]);
  }

  let conjugation = +select1.value;
  const tense = +select2.value;

  if (!conjugation) {
    conjugation = conjugations[Math.random() * conjugations.length >> 0];
  }

  currentWord = vocabulary.find(that => that.conjugation === conjugation);

  if (!currentWord) return;

  fillWords();

  inputs.forEach((el) => {
    setNoValue(el);
    el.parentNode.removeAttribute('data-valid');
  });

  const forms = currentWord.getTense(tense)[conjugation];
  forms.sg.forEach((x, i) => x && clearValue(inputs[i]));
  forms.pl.forEach((x, i) => x && clearValue(inputs[i + qnt]));

  if (devMode) return btnAnswers.click();

  table2.remove();
  isAnswersShown = false;

  if (btnAnswers.textContent[0] !== 'R') btnAnswers.textContent = 'Mónstráre';
});

function fillWords() {
  words[0].innerHTML = currentWord.value;
  words[1].innerHTML = currentWord.translation;
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
  const data = currentWord.getTense(+select2.value)[currentWord.conjugation];

  inputs.forEach((el, i) => {
    if (el._none || el._off) return;

    const {dataset} = el.parentNode;
    const userValue = el.value.trim().toLowerCase();

    if (!userValue) return dataset.valid = 0;

    const form = data[i >= qnt ? 'pl' : 'sg'][i % qnt];
    const value = getInflection(form, data.root).toLowerCase();
    const chunks = value.split('/');

    if (chunks.length === 1 && value.length !== userValue.length) {
      return dataset.valid = 0;
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

// =========================

btnAnswers.addEventListener('click', function() {
  if (isAnswersShown && !devMode) {
    isAnswersShown = false;
    this.textContent = 'Mónstráre';
    return table2.remove();
  }

  if (!currentWord) return;

  if (!table2.parentNode) rootElem.appendChild(table2);

  this.textContent = 'Céláre';
  isAnswersShown = true;

  inputs2.forEach((el, i) => {
    el.innerHTML = currentWord.eval(+select2.value, i >= qnt, i % qnt);
  });
});

// =========================

keyboard.__init__(rootElem.firstElementChild, checkInputs);