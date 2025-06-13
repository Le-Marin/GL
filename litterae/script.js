(function() {
  'use strict';

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

  function parseNode(html, callback = Function.prototype) {
    const elem = document.createElement('div');
    elem.innerHTML = html;
    callback(elem.firstElementChild);
    return elem.firstElementChild;
  }

  // ========== [[ DOM ]]

  const elRoot = $('#root');
  const elMain = $('.lit-content');
  const elToolbar = $('.lit-toolbar');
  const elTitle = elToolbar.children[1];

  const rootDataset = elRoot.dataset;
  const ver = '?v=' + rootDataset.v;
  const docTitle = 'LITTERAE LATINAE';
  const jsPath = location.host && 'https://le-marin.github.io/GL/litterae/';

  // ========== [[ TOOLBAR ]]

  const toolbarActions = {
    interlinear() {
      if (!latinText) return;
      const elem = latinText.target;
      const test = rootDataset.mode === 'interlinear';
      rootDataset.mode = test ? 'default' : 'interlinear';
      if (!elem.isConnected) elMain.replaceChildren(elem);
    },
    literary() {
      if (!latinText) return;
      const {target, litElem} = latinText;
      const test = rootDataset.mode === 'literary';
      rootDataset.mode = test ? 'default' : 'literary';
      elMain.replaceChildren(test ? target : litElem);
    },
    openMenu(e) {
      e.stopPropagation();
      elRoot.classList.add('is-menu-shown');
      document.addEventListener('click', closeMenu);
      document.addEventListener('keydown', closeMenu);
    }
  };

  elToolbar.addEventListener('click', function(e) {
    const {action} = e.target.dataset;
    if (toolbarActions[action]) toolbarActions[action](e);
  });

  // ========== [[ MENU ]]

  $('.lit-nav-shell').addEventListener('click', function(e) {
    const {action} = e.target.dataset;
    if (action !== 'close') return e.stopPropagation();
  });

  function closeMenu(e) {
    if (e && e.type === 'keydown' && e.key !== 'Escape') return;
    document.removeEventListener('click', closeMenu);
    document.removeEventListener('keydown', closeMenu);
    elRoot.classList.remove('is-menu-shown');
  }

  // ========== [[ ROUTER ]]

  const navStyle = document.head.appendChild(document.createElement('style'));
  const navLinks = $$('.lit-nav__link[href^="#/litterae-"]', elRoot);
  const knownIds = navLinks.map(el => el.hash.slice(2));
  const stack = new Map;

  if (!location.hash.slice(1)) location.replace('#/litterae-01');

  window.addEventListener('hashchange', function(e) {
    const id = location.hash.slice(2);
    const css = 'content: "•"; margin-right: 0.4em;';
    const selector = `.lit-nav__link[href="#/${id}"]::before`;
    navStyle.textContent = `${selector} { ${css} }`;

    if (!knownIds.includes(id)) return clearState();
    if (stack.has(id)) return stack.get(id).init();

    loadJS(`texts/${id}`);
  });

  function loadJS(src) {
    const script = document.createElement('script');
    script.src = `${jsPath + src}.js${ver}`;
    document.head.appendChild(script).remove();
  }

  function clearState() {
    latinText = null;
    rootDataset.mode = 'default';
    elTitle.textContent = '...';
    document.title = docTitle;
    elMain.replaceChildren();
    closeMenu();
  }

  // ====================

  function splitLatText(text) {
    return splitText(text).map(chunks => chunks.filter(Boolean));
  }

  function splitSubText(text) {
    return splitText(text);
  }

  function splitText(text) {
    const blocks = text.trim().replaceAll('\r', '').split('\n\n');
    const convert = (x) => x === '—' ? '' : x.replaceAll('~', ' ');
    const splitLine = (s) => s.trim().split(/ +/);
    return blocks.map(line => splitLine(line).map(convert));
  }

  function createContainer(latText, subText) {
    const [tips, text, replacement] = matchTips(latText);

    const latBlocks = splitLatText(text);
    const subBlocks = splitSubText(subText);
    const setAppend = (elems) => (elem) => elem.append(...elems);

    const elBlocks = latBlocks.map((chunks, i) => {
      const subs = subBlocks[i];
      const elItems = chunks.map((x, i) => createTextItem(x, subs[i]));
      return parseNode('<p class="text-block"></p>', setAppend(elItems));
    });

    const target = parseNode('<div class="text"></div>', setAppend(elBlocks));
    const isTipedWord = (el) => el.textContent === replacement;
    const tipedWords = $$('.word', target).filter(isTipedWord);

    tipedWords.forEach((el, i) => parseTip(el, tips[i]));
    return target;
  }

  function matchTips(text) {
    const matcher = /[{\[]{2}.+?[}\]]{2}/g;
    const replacement = '###';
    const tips = text.match(matcher);
    return [tips, text.replace(matcher, replacement), replacement];
  }

  function createTextItem(lat, sub) {
    const empty = [''];
    const tplWord = '<span class="word">$&</span>';
    const tplSub = '<small class="subscription">$&</small>';
    const lm = (lat.match(/^[“(]{1,2}/) || empty)[0];
    const rm = (lat.match(/[”).,;:!?]{1,4}$/) || empty)[0];
    const regAll = /.*/;

    const shtm = sub.replace(regAll, tplSub);
    let lhtm = rm ? lat.slice(0, -rm.length) : lat;
    lhtm = lhtm.slice(lm.length).replace(regAll, tplWord);

    const html = lm + lhtm + rm + shtm;
    return parseNode(`<span class="text-item">${html}</span>`);
  }

  function parseTip(elem, tipText) {
    const [word, markup] = tipText.slice(2, -2).split(' | ');
    const tip = markup
      .replace(/\^(.+?)\^/g, '<span class="c-red">$1</span>')
      .replace(/\*(.+?)\*/g, '<b>$1</b>')
      .replace(/_(.+?)_/g, '<i>$1</i>')
      .replace(/#(.+?)#/g, '<span class="ff-2">$1</span>')
      .replaceAll('@', '\n')

    if (tipText.startsWith('{{')) elem.className += ' _gram';

    elem._tip = tip;
    elem.dataset.tip = '';
    elem.innerHTML = word;
  }

  function createLitElem(text) {
    const blocks = text.trim().replaceAll('\r', '').split('\n\n');
    const elems = blocks.map(s => parseNode(`<p class="text-block">${s}</p>`));
    return parseNode('<div class="text"></div>', (el) => el.append(...elems));
  }

  // ====================

  let latinText;

  class LatinText {
    constructor(data) {
      const {title} = data;
      const [text, subText, literation] = data.parts;
      const target = createContainer(text, subText);
      const litElem = createLitElem(literation);
      Object.assign(this, { title, target, litElem });
    }

    init() {
      const {target, title} = this;
      latinText = this;
      rootDataset.mode = 'default';
      elTitle.textContent = title;
      document.title = `${title} | ${docTitle}`;
      elMain.replaceChildren(target);
      closeMenu();
      return this;
    }
  }

  // ====================

  window.$_GET = $_GET;
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  loadJS('tip')

  function $_GET(data) {
    data.parts = data.text.split('---');
    const lt = new LatinText(data).init();
    stack.set(location.hash.slice(2), lt);
  }
})();