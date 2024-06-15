let activeCell = null;

const cache = new Map;
const allWords = [];
const allCells = [];

const trimReg = /\s+/g;
const cellTemplate = '<div class="cell"><div class="cell__lit"></div></div>';

export default class Word {
  constructor(target, value, index, isHorizontal) {
    Object.assign(this, { target, value, index, isHorizontal });
  }
  static __init__(target, words) {
    this.target = target;

    words.forEach(([value, [x, y], isHorizontal]) => {
      this.add(value, x, y, !!isHorizontal);
    });
  }
  static add(value, x, y, isHorizontal) {
    const ind = this.size;
    const elem = this.create(value.length, ind, x, y, isHorizontal);
    const word = new this(elem, value, ind, isHorizontal);
    cache.set(elem, word);
    allWords.push(word);
    this.target.appendChild(elem);
    allCells.push(...elem.children);
    return word;
  }
  static create(size, ind, x, y, isHorizontal) {
    const indexTemplate = `$&<i class="cell__index" data-index="${ind}"></i>`;
    const elem = document.createElement('div');
    elem.style = `left: ${x}em; top: ${y}em;`;
    elem.className = 'word' + (isHorizontal ? ' __h' : '');
    elem.innerHTML = cellTemplate.repeat(size).replace('</div>', indexTemplate);
    return elem;
  }
  static find(key, value) {
    if (key === 'target') return cache.get(value);
    return allWords.find(word => word[key] === value);
  }
  static get size() {
    return allWords.length;
  }
  static get all() {
    return allWords;
  }
  static get allCells() {
    return allCells;
  }
  static get hasEmptyCell() {
    return !!allCells.find(cell => !cell.textContent);
  }
  static get activeElem() {
    return activeCell && activeCell.parentNode;
  }
  static get activeCell() {
    return activeCell;
  }
  static set activeCell(value) {
    return activeCell = value;
  }
  static get activeCellIndex() {
    const cell = activeCell;
    return cell ? [...cell.parentNode.children].indexOf(cell) : -1;
  }
  check() {
    return !this.target.classList.toggle('__invalid', !this.done);
  }
  get done() {
    return this.input === this.value;
  }
  get input() {
    return this.target.textContent.replace(trimReg, '');
  }
  get isVertical() {
    return !this.isHorizontal;
  }
  get length() {
    return this.value.length;
  }
  get coords() {
    const {target} = this;
    const x = target.offsetLeft >> 0;
    const y = target.offsetTop >> 0;
    const r = x + target.offsetWidth >> 0;
    const b = y + target.offsetHeight >> 0;
    return [x, y, r, b];
  }
  get siblings() {
    if (this.__siblings) return this.__siblings;

    const {isVertical} = this;
    const [x, y, r, b] = this.coords;

    return this.__siblings = allWords.filter(word => {
      if (word.isVertical === isVertical) return;

      const [a, z, c, d] = word.coords;

      return (x === a || r === c || x < a && r > c || x > a && r < c)
          && (y === z || b === d || y < z && b > d || y > z && b < d);
    });
  }
  get cells() {
    return [...this.target.children];
  }
  get firstCell() {
    return this.target.firstElementChild;
  }
  get firstEmptyCell() {
    return this.cells.find(cell => !cell.textContent);
  }
};