(function(view) {
  'use strict';

  const { $$, parseNode, loadScript, memoize } = __UTILS;

  const curScript = document.currentScript || [...document.scripts].pop();
  const ver = (curScript.src.match(/[?&]v=[^&]+/) || [''])[0];

  const root = document.getElementById('root');
  const rowsCont = parseNode('<div class="rows-container"></div>');

  const checkForm = parseNode(/*html*/`
    <div class="check-form">
      <span class="check-form__text"></span>
      <button class="check-form__button">✓</button>
    </div>
  `);

  const rootNodes = [rowsCont];

  // ======================

  const keyboard = (function() {
    const defaultKeys = 'ĀĒĪŌŪȲ'.split('');

    const target = parseNode(/*html*/`
      <div class="keyboard">
        <button class="keyboard__item keyboard__case" title="Vócálés longae">Ā</button>
        <div class="keyboard__item keyboard__switcher"></div>
        <div class="keyboard__item keyboard__body"></div>
      </div>
    `);

    const [btnCase, switcher, body] = target.children;
    const cases = {'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y'};

    function createLine(keys) {
      const items = keys.map(key => `<div class="keyboard__key">${key}</div>`);
      return `<div class="keyboard__line">${items.join('')}</div>`;
    }

    return {
      __init__() {
        rootNodes.push(target);
        target.addEventListener('click', this.onHandleClick.bind(this));

        btnCase.addEventListener('click', function() {
          this.classList.toggle('__disabled');
          return checkButton.__enabled && checkOn.call(checkButton);
        });
      },
      onHandleClick(e) {
        const trg = e.target;

        if (trg === switcher)
          return this.toggle();

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
      onRootChange({keys = ''}) {
        const lines = keys && keys.split(' | ').map((str) => str.split(' '));
        const html = [defaultKeys, ...lines].map(createLine).join('');
        body.innerHTML = html;
        target.appendChild(checkForm);
      },
      setCaseSensitive(force) {
        btnCase.classList.toggle('__disabled', !force);
        return !!force;
      },
      get isCaseSensitive() {
        return !btnCase.classList.contains('__disabled');
      },
      get cases() {
        return cases;
      },
      get target() {
        return target;
      }
    };
  })();

  keyboard.__init__();

  // ======================

  const tip = __TIP;
  tip.__init__(() => rootNodes.push(tip.target));

  // ======================

  const [checkTextEl, checkButton] = checkForm.children;

  checkButton.addEventListener('click', function() {
    return this.__enabled ? checkOff.call(this) : checkOn.call(this);
  });

  function checkOff() {
    tip.hide();
    this.__enabled = false;
    checkTextEl.hidden = true;

    $$('.area[data-key]').forEach((el) => {
      el.removeAttribute('data-valid');
      el.oninput = el.onfocus = el.onblur = null;
      el._validate = null;
    });
  }

  function checkOn() {
    const elems = $$('.area[data-key]');
    const spaceReg = /\s+/g;

    this.__enabled = true;

    if (!root.contains(tip.target)) root.appendChild(tip.target);

    const {isCaseSensitive, cases} = keyboard;

    elems.forEach((el) => {
      if (!el.hasOwnProperty('__keys')) {
        el.__keys = el.getAttribute('data-key').toLowerCase().split(' | ');
      }
      setValid(el);
      el.onfocus = onFocus;
      el._validate = onInput;
    });

    checkTextEl.hidden = false;

    function setValid(el) {
      const input = el.textContent.toLowerCase().trim().replace(spaceReg, ' ');
      let isValid = el.__keys.some(x => x === input);

      if (isValid || isCaseSensitive) {
        el.setAttribute('data-valid', +isValid);
        return isValid;
      }

      isValid = el.__keys.some(value => {
        if (value.length !== input.length) return;

        for (let i = 0; i < value.length; i++) {
          let a = value[i];
          let b = input[i];

          if (a in cases) {
            a = cases[a];
            b = cases[b] || b;
          }

          if (a !== b) return;
        }

        return true;
      });

      el.setAttribute('data-valid', +isValid);
      return isValid;
    }

    function onFocus() {
      this.onblur = tip.hide;
      this.oninput = onInput;
      if (this.getAttribute('data-valid') === '0') tip.render(this);
    }

    function onInput() {
      if (setValid(this)) tip.hide();
      else tip.render(this);
    }
  }

  // ======================

  let pageData = {};

  view.onRootChange = function(data) {
    pageData = data;
    document.title = data.title;
    checkTextEl.hidden = true;
    checkButton.__enabled = false;
    rowsCont.innerHTML = data.html;
    tip.hide();
    keyboard.onRootChange(data);
    root.classList.remove('__unavailable');
    root.replaceChildren(...rootNodes);

    if (!data.title.includes('Pensa ')) return;

    keyboard.setCaseSensitive(1);
    keyboard.target.remove();
    Pensum.__init__(rowsCont, checkForm);
  };

  view.$_GET = function(data) {
    const s1 = ' spellcheck="false" contenteditable="true"';
    const s2 = ' autocapitalize="off"';

    data.html = data.html
      .replaceAll(s1, '')
      .replaceAll(s2, '')
      .replaceAll('"area"', '"area"' + s1 + s2);

    return pageData = data;
  };

  const basePath = atob('aHR0cHM6Ly9sZS1tYXJpbi5naXRodWIuaW8vR0wvZXhlcmNpdGlhLw==');

  const getContent = memoize(async (url) => {
    const response = await loadScript(basePath + url).catch(err => 0);
    return response === 0 ? null : pageData;
  });

  view.onRoute = async function() {
    const url = location.hash.slice(2);
    if (!url) return $_403();

    const response = await getContent(`${url}.js${ver}`);
    if (!response) return $_404();

    view.onRootChange(response);
  };

  view.addEventListener('hashchange', () => view.onRoute());

  // ======================

  function $_403() {
    printError(
      '403 Forbidden',
      'You don\'t have permission to access this resource.'
    );
  }

  function $_404() {
    let url = location.pathname + location.hash;
    let ind = url.indexOf('/src/');

    if (~ind) url = url.slice(ind);

    printError('404 Not Found', `Cannot GET <span>${url}</span>`);
  }

  function printError(title, text) {
    document.title = 'Exercitia';
    root.classList.add('__unavailable');

    root.innerHTML = /*html*/`
      <div class="error">
        <h1>${title}</h1>
        <p>${text}</p>
      </div>
    `;
  }

  // ======================

  if (/^file:|\/localhost:/.test(location.href)) {
    view.__ROOT = { root, rootNodes, get pageData() { return pageData; } };
  } else {
    onRoute();
  }
})(document.defaultView);