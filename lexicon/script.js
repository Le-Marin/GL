(function() {
  'use strict';

  if (!('scrollIntoViewIfNeeded' in Element.prototype)) {
    const proto = Element.prototype;
    proto.scrollIntoViewIfNeeded = proto.scrollIntoView;
  }

  const low = (s) => s.toLowerCase();
  const ignoreCase = (s) => s = [...s].map((x) => cases[x] || x).join('');
  const getDict = async (key) => vocabulary[key] || await loadDict(key);

  const vocabulary = {};
  const regDictKey = /[a-z]/;
  const badDictKeys = 'rstw';
  const cases = {'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y'};

  const cont = document.getElementById('content');
  const [lBox, rBox] = cont.children;
  const search = document.getElementById('search');
  const button = search.nextElementSibling;
  const list = button.nextElementSibling;

  let mv = 1;
  let selectedListElem = null;

  document.addEventListener('click', clearList);

  search.addEventListener('input', debounce(renderList, 300));
  search.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!list.childElementCount) renderList();
  });

  search.addEventListener('keydown', function(e) {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (selectedListElem) selectedListElem.click();
        else searchWord();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        if (!list.childElementCount) return;
        e.preventDefault();
        selectListSibling(e.key === 'ArrowDown');
    }
  });

  button.addEventListener('click', function() {
    search.focus();
    searchWord();
  });

  list.addEventListener('click', function(e) {
    const trg = e.target;
    if (!trg.matches('.search-list__item')) return;

    rBox.innerHTML = '';
    searchWord(trg.textContent, false);
  });

  rBox.addEventListener('click', function(e) {
    const trg = e.target;
    if (!trg.matches('a')) return;

    e.preventDefault();

    [...rBox.children].forEach((el) => el.classList.remove('_active'));
    trg.classList.add('_active');

    searchWord(trg.textContent, false);
  });

  function selectListSibling(toNext) {
    if (!selectedListElem) {
      const prop = toNext ? 'lastElementChild' : 'firstElementChild';
      selectedListElem = list[prop];
    }

    const sibling = getListSibling(toNext);
    selectedListElem.classList.remove('_active');
    selectedListElem = sibling;
    sibling.classList.add('_active');
    sibling.scrollIntoViewIfNeeded(false);
  }

  function getListSibling(toNext) {
    return toNext
      ? selectedListElem.nextSibling || list.firstChild
      : selectedListElem.previousSibling || list.lastChild;
  }

  function clearList() {
    if (!list.childElementCount) return;
    list.innerHTML = '';
    selectedListElem = null;
  }

  async function renderList() {
    clearList();

    let val = low(search.value.trim());
    if (!val) return;

    val = ignoreCase(val);

    if (!regDictKey.test(val[0])) return;
    if (badDictKeys.includes(val[0])) return;

    const dict = await getDict(val[0]);
    if (!dict) return;

    const cb = ([key]) => `<div class="search-list__item">${key}</div>`;

    list.innerHTML = getClosestWords(val, dict).map(cb).join('');
    list.scrollTop = 0;
  }

  function getClosestWords(val, dict) {
    const data = [];

    for (const that of dict) {
      if (data.length === 20) break;
      if (ignoreCase(low(that[0])).startsWith(val)) data.push(that);
    }

    return data;
  }

  async function searchWord(val, clear = true) {
    let k1 = '';
    const hasVal = val != null;

    if (hasVal) {
      val = val.trim();
      k1 = val && ignoreCase(low(val[0]));
    } else {
      val = ignoreCase(low(search.value.trim()));
      k1 = val[0];
    }

    if (!val || !regDictKey.test(k1) || badDictKeys.includes(k1)) return;

    const dict = await getDict(k1);
    if (!dict) return;

    const cb = ([key]) => (hasVal ? key : ignoreCase(low(key))) === val;
    const word = dict.find(cb);

    search.value = '';
    clearList();

    if (clear) rBox.innerHTML = '';
    if (word) return lBox.innerHTML = word[1];

    lBox.innerHTML = '';
    rBox.innerHTML = getClosestWords(ignoreCase(low(val)), dict)
      .map(([key]) => `<a href="#">${key}</a>`)
      .join('');
  }

  async function loadDict(key) {
    const url = `./vocabulary/${key}.js?v=${mv}`;
    const that = await import(url).catch(() => 0);

    if (that) return vocabulary[key] = that.default;

    mv += 1;
    alert('Error: Cannot load dictionary');
  }

  function debounce(callback, delay) {
    let timerId = 0;
    return function(e) {
      clearTimeout(timerId);
      timerId = setTimeout(callback, delay, e);
    };
  }
})();