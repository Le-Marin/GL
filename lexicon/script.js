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
  const badDictKeys = 'w';
  const cases = {'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y'};

  const cont = document.getElementById('lex-content');
  const root = cont.parentNode;
  const [lBox, rBox] = cont.children;
  const search = document.getElementById('search');
  const button = search.nextElementSibling;
  const list = button.nextElementSibling;

  const htmlCache = {};
  const style = document.head.appendChild(document.createElement('style'));

  let mv = +root.dataset.v || Date.now();
  let selectedListElem = null;

  if (location.hostname.startsWith('glos')) return initGL();

  function initGL() {
    root.replaceChildren(cont);
    document.addEventListener('lexicon:search', function(e) {
      const state = e.detail;
      onPopState({ state });
    });
  }

  document.addEventListener('click', clearList);

  search.addEventListener('input', debounce(renderList, 300));
  search.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!list.childElementCount) renderList();
  });

  search.addEventListener('keydown', async function(e) {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (selectedListElem) selectedListElem.click();
        else {
          const word = this.value.trim();

          if (!word) return;

          const matches = await hasMatches(word);
          const state = { word, aside: +!matches };
          history.pushState(state, '', `#${word}`);
          onPopState({state});
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        if (!list.childElementCount) return;
        e.preventDefault();
        selectListSibling(e.key === 'ArrowDown');
    }
  });

  button.addEventListener('click', function() {
    const Event = window.KeyboardEvent || window.Event;
    search.focus();
    search.dispatchEvent(new Event('keydown', { key: 'Enter' }));
  });

  list.addEventListener('click', function(e) {
    const trg = e.target;
    if (!trg.matches('a')) return;

    e.preventDefault();
    rBox.innerHTML = '';
    const word = trg.textContent;
    const state = { word, aside: 0 };
    history.pushState(state, '', `#${word}`);
    onPopState({state});
  });

  rBox.addEventListener('click', function(e) {
    const trg = e.target;
    if (!trg.matches('a')) return;

    const word = trg.textContent;
    const state = { word, aside: 1 };

    e.preventDefault();
    history.pushState(state, '', `#${word}`);
    onPopState({state});
  });

  onPopState(history);
  window.addEventListener('popstate', onPopState);

  async function onPopState(e) {
    if (!e || !e.state) {
      const word = location.hash.slice(1);

      if (!word) return clearAll();

      const matches = await hasMatches(word);
      const state = { word, aside: +!matches };
      history.replaceState(state, '', `#${word}`);
      return onPopState({state});
    }

    const {word, aside} = e.state;

    if (!word) return clearAll();

    style.textContent = `a[href="#${word}"] { color: seagreen; }`;
    searchWord(word, !aside);
  }

  function clearAll() {
    clearList();
    search.value = '';
    lBox.innerHTML = '';
    rBox.innerHTML = '';
  }

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

    const cb = ([k]) => `<a class="search-list__item" href="#${k}">${k}</a>`;

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
    if (word) return lBox.innerHTML = htmlCache[word[0]] || rehtml(word);

    lBox.innerHTML = '';
    rBox.innerHTML = getClosestWords(ignoreCase(low(val)), dict)
      .map(([key]) => `<a href="#${key}">${key}</a>`)
      .join('');
  }

  async function hasMatches(val) {
    let k1 = '';
    const hasVal = val != null;

    if (hasVal) {
      val = val.trim();
      k1 = val && ignoreCase(low(val[0]));
    } else {
      val = ignoreCase(low(search.value.trim()));
      k1 = val[0];
    }

    if (!val || !regDictKey.test(k1) || badDictKeys.includes(k1)) return !1;

    const dict = await getDict(k1);
    if (!dict) return !1;

    const cb = ([key]) => (hasVal ? key : ignoreCase(low(key))) === val;
    return dict.some(cb);
  }

  async function loadDict(key) {
    const url = `./vocabulary/${key}.js?v=${mv}`;
    const that = await import(url).catch(() => 0);

    if (that) return vocabulary[key] = that.default;

    mv += 1;
    alert('Error: Cannot load dictionary!');
  }

  function rehtml(word) {
    const reg = /[a-zāēīōūȳ]+/gi;
    const regTag = /<\/?u>/g;
    const regRomans = /^[IVX][IVX]*$/;
    const regGens = /^[mfn][mfn, ]*$/;
    const regGens2 = /\b[mfn]\b/g;
    const regNums = /^(?:sg|pl)(?=\.)/;
    const regNums2 = /\b(?:sg|pl)\b/;
    const regCases = /^(?:nom|gen|dat|acc|abl|loc)(?=\.)/;
    const regCases2 = /\b(?:nom|gen|dat|acc|abl|loc)\b/;
    const tplConst = '<var>$&</var>';

    const el = document.createElement('div');
    el.innerHTML = word[1];

    [...el.childNodes].forEach(function next(el) {
      if (el.nodeType === 1) return [...el.childNodes].forEach(next);
      if (el.nodeType !== 3) return;

      const elem = document.createElement('div');
      elem.innerHTML = el.data.replace(reg, '<u>$&</u>');
      el.replaceWith(...elem.childNodes);
    });

    function clearLemma(node) {
      node.innerHTML = node.innerHTML.replace(regTag, '');

      let n = node;

      while ((n = n.nextSibling)) {
        if (n.nodeType === 3 && n.data.includes('\n')) break;
        if (n.nodeType !== 1) continue;

        if (n.tagName !== 'U') {
          n.innerHTML = n.innerHTML.replace(regTag, '');
          continue;
        }

        const e = n.lastChild;
        n.replaceWith(...n.childNodes);
        n = e;
      }
    }

    const nodes = [...el.childNodes];

    nodes.forEach((node, ind) => {
      if (node.nodeType !== 1 || node.tagName !== 'B') return;
      if (ind === 2) return clearLemma(node);

      const elem = node.firstElementChild;

      if (!(elem && elem.tagName === 'U')) return;
      if (regRomans.test(elem.textContent)) clearLemma(node);
    });

    nodes.forEach((node) => {
      if (node.nodeType !== 1 || node.tagName !== 'I') return;

      const text = node.textContent;

      if (regNums.test(text)) {
        node.innerHTML = node.innerHTML.replace(regNums2, tplConst);
      }

      if (regCases.test(text)) {
        node.innerHTML = node.innerHTML.replace(regCases2, tplConst);
      }

      if (regGens.test(text)) {
        node.innerHTML = node.innerHTML.replace(regGens2, tplConst);
      }
    });

    return htmlCache[word[0]] = el.innerHTML;
  }

  function debounce(callback, delay) {
    let timerId = 0;
    return function(e) {
      clearTimeout(timerId);
      timerId = setTimeout(callback, delay, e);
    };
  }
})();