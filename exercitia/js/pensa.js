const Pensum = (function() {
  'use strict';

  const { $, $$, parseNode } = __UTILS;
  const isAreaEmpty = (el) => !el.textContent.trim();

  const tabs = [];
  const headings = [];
  const cases = {'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y'};

  let checkButton = null;

  function createWord(key) {
    let count = 1;
    let disabled = 0;

    const areas = [];
    const target = parseNode(`<div class="word">${key}</div>`);
    const {dataset, classList} = target;

    return {
      key,
      target,
      initialCount: 1,
      addArea(area) {
        if (areas.includes(area)) return;
        areas.push(area);
      },
      removeArea(area) {
        if (!areas.includes(area)) return;
        areas.splice(areas.indexOf(area), 1);
      },
      get areas() {
        return areas;
      },
      get count() {
        return count;
      },
      set count(value) {
        dataset.count = count = value;

        if (!value) this.disabled = 1;
        else if (value === 1) this.disabled = 0;

        if (value === this.initialCount) classList.remove('__active');
      },
      get disabled() {
        return disabled;
      },
      set disabled(value) {
        disabled = value;
        classList.toggle('__disabled', value);
      },
    };
  }

  function setArea(area, word = null) {
    area.__word = word;
    area.textContent = word ? word.key : '';
    if (area._validate) area._validate();
    return area;
  }

  return class Pensum {
    constructor(i) {
      const heading = this.heading = headings[i];
      const tabElem = this.tabElem = tabs[i];

      heading.addEventListener('click', this.onTabSwitch.bind(this));

      const tabAreas = this.areas = $$('.area', tabElem);
      this.activeArea = tabAreas[0];

      if (!tabAreas.length) return;

      this.words = Pensum.setTabWords(tabAreas);
      const wordsCont = parseNode('<div class="tab__words"></div>');
      wordsCont.append(...this.words.map(word => word.target));
      tabElem.appendChild(wordsCont);

      tabElem.firstElementChild.addEventListener('click', (e) => {
        const trg = e.target;
        if (trg.matches('.tab-area')) this.onAreaClick(trg);
      });

      wordsCont.addEventListener('click', (e) => {
        const trg = e.target;
        if (trg.matches('.word')) this.onWordClick(trg);
      });
    }

    static __init__(container, checkForm) {
      checkButton = checkForm.lastElementChild;
      const target = parseNode('<div id="tabs"></div>');

      const elems = [...container.children].map(el => {
        const elem = el.cloneNode(true);
        elem.className = 'tab__content';
        const tabElem = parseNode('<div class="tab"></div>');
        tabElem.appendChild(elem);
        return tabElem;
      });

      const header = parseNode(/*html*/`
        <header class="tabs__header">
          <h3 class="tab__heading __active">A</h3>
          <h3 class="tab__heading">B</h3>
          <h3 class="tab__heading">C</h3>
        </header>
      `);

      headings.splice(0, 3, ...header.children);
      tabs.splice(0, 3, ...elems);
      tabs[0].classList.add('__active');

      tabs.forEach((x, i) => new this(i));
      header.appendChild(checkForm);
      target.append(...elems, header);
      container.replaceChildren(target);
    }

    static setTabWords(tabAreas) {
      const stack = {};
      const duplex = [];
      const reg = /[āēīōūȳ]/g;
      const replacer = (m) => cases[m];

      const sorter = (a, b) => {
        let keyA = a.dataset.key.toLowerCase().replace(reg, replacer);
        let keyB = b.dataset.key.toLowerCase().replace(reg, replacer);
        return keyA.localeCompare(keyB);
      };

      const set = (key) => {
        const data = stack[key];
        if (data) return data.initialCount++;
        stack[key] = createWord(key);
      };

      [...tabAreas].sort(sorter).forEach((area) => {
        area.contentEditable = false;
        area.classList.add('tab-area');

        const {key} = area.dataset;

        if (!key.includes('|')) return set(key);

        const keys = key.split(' | ');
        const duplexKey = [...key].sort().join('').trim();

        if (duplex.includes(duplexKey)) return;

        duplex.push(duplexKey);
        keys.forEach(set);
      });

      return Object.values(stack).map(word => {
        if (word.initialCount === 1) return word;
        word.target.classList.add('__mult');
        word.count = word.initialCount;
        return word;
      });
    }

    focusArea(area) {
      if (this.activeArea) this.activeArea.classList.remove('__active');

      this.activeArea = area;
      area.classList.add('__active');
    }

    findNextAreaFrom(area) {
      const {areas} = this;
      const ind = areas.indexOf(area) + 1;
      return areas.slice(ind).find(isAreaEmpty)
        || areas.find(isAreaEmpty)
        || areas[ind]
        || areas[0];
    }

    onTabSwitch() {
      if (this.heading.classList.contains('__active')) return;

      checkButton.__enabled = 1;
      checkButton.click();

      headings.forEach(el => el.classList.remove('__active'));
      tabs.forEach(el => el.classList.remove('__active'));

      this.heading.classList.add('__active');
      this.tabElem.classList.add('__active');
    }

    onWordClick(elem) {
      const thisArea = this.activeArea;
      const word = this.words.find(that => that.target === elem);

      if (word.disabled) {
        word.count++;
        return this.focusArea(setArea(word.areas.pop()));
      }

      if (!thisArea) return;

      if (!isAreaEmpty(thisArea) && word.areas.includes(thisArea)) {
        word.count++;
        word.removeArea(thisArea);
        return this.focusArea(setArea(thisArea));
      }

      const otherWord = thisArea.__word;

      if (otherWord) {
        if (otherWord === word) return;
        otherWord.count++;
        otherWord.removeArea(thisArea);
      }

      word.count--;
      word.addArea(thisArea);
      word.target.classList.add('__active');
      this.focusArea(this.findNextAreaFrom(setArea(thisArea, word)));
    }

    onAreaClick(area) {
      this.focusArea(area);

      if (isAreaEmpty(area)) return;

      const word = area.__word;

      if (!word) return;

      word.count++;
      word.removeArea(setArea(area));
    }
  };
})();