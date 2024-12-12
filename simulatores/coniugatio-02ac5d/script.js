import vocabulary from './vocabulary.js?v=2c';
import create from './create.js?v=2c';
import defineSelect from '../select.js?v=2c';
import setSwitch from '../switch.js?v=2c';
import keyboard from '../keyboard.js?v=2c';

vocabulary.sort(() => Math.random() - 0.5);
document.currentScript && document.currentScript.remove();

// =========================

let devMode = location.hostname === '127.0.0.1';
let decMode = 0;
let currentWord = null;
let currentForms = null;
let isNextWordNeeded = true;
let isAnswersVisible = false;

const conjugations = [1, 2, 3.1, 3.2, 4, 5, 6];
const verbales = [25, 26, 27, 28, 29];

const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

// =========================

const getDictWord = (function(that) {
  const key = `${that[0]}_${that[1]}`;
  return this[key] || (this[key] = create(...that));
}).bind({});

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

decInputs.forEach((el, i) => {
  el._off = el._none = false;
  el._shadow = decInputs2[i];
});

setSwitch(decTable, decInputs);

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

  if (test && (!(tense % 2) || ind < 3 && /13|15/.test(tense))) return get();

  const check = (s) => ` ${s} `.includes(` ${root} `);

  if (verbales.includes(tense)) {
    if (conjugation === 5 && omitWord(tense, check)) return get();
    if (conjugation === 6 && root === 'f' && /2[578]/.test(tense)) return get();
  }

  fillWords(word);
  switchOptions(conjugation, tense, ind, check);

  const _inputs = decMode ? decInputs : inputs;
  const _qnt = decMode ? decQnt : qnt;
  const _t2 = decMode ? decTable2 : table2;

  _inputs.forEach((el) => {
    setNoValue(el);
    el.parentNode.removeAttribute('data-valid');
  });

  currentForms = word.getTense(tense);
  currentForms[0].forEach((x, i) => x && clearValue(_inputs[i]));
  currentForms[1].forEach((x, i) => x && clearValue(_inputs[i + _qnt]));

  if (devMode) return btnAnswers.click();

  _t2.remove();
  isAnswersVisible = false;

  if (btnAnswers.textContent[0] !== 'R') {
    btnAnswers.textContent = 'Mónstráre';
  }
});

function switchOptions(c, t, i, check) {
  const callback = c === 6
    ? (el) => el.disabled = !(el.value % 2)
    : i === -1
    ? (el) => el.disabled = false
    : (el) => el.disabled = !(el.value % 2) || i < 3 && /13|15/.test(el.value);

  select1.options[7].disabled = verbales.includes(t) ? false : !(t % 2);

  const options = [...select2.options];
  const search = (x) => (el) => el.value === x;
  const disable = (x) => options.find(search(`${x}`)).disabled = true;

  options.forEach(callback);
  options.slice(-verbales.length).forEach(el => el.disabled = false);

  if (c === 5) {
    if (check('sum')) disable(25);
    if (check('possum sum vol māl nōl e')) disable(26);
    if (check('possum vol māl nōl')) disable(27);
    if (check('possum sum vol māl nōl')) {
      disable(28);
      disable(29);
    }
  } else if (c === 6 && check('f')) {
    disable(25);
    disable(27);
    disable(28);
  }
}

function omitWord(tense, check) {
  return (tense === 25 && check('sum'))
    || (tense === 26 && check('possum sum vol māl nōl e'))
    || (tense === 27 && check('possum vol māl nōl'))
    || (/28|29/.test(tense) && check('possum sum vol māl nōl'));
}

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

btnCheck.addEventListener('click', checkInputs);

function checkInputs() {
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
  const _t2 = decMode ? decTable2 : table2;

  if (isAnswersVisible && !devMode) {
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

keyboard.__init__(rootElem.firstElementChild, checkInputs);