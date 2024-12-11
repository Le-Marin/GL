const nativeRemove = Element.prototype.remove;
const isSIVINSupported = 'scrollIntoViewIfNeeded' in HTMLElement.prototype;

// ========== [[ Select.prototype ]]

const selectProto = {
  _selected() {
    return [...this.options].find(el => el.selected);
  },
  _expanded() {
    return this.classList.contains('__expanded');
  },
  disabled() {
    return this.hasAttribute('disabled');
  },
  set_disabled(force) {
    if (force) {
      this.setAttribute('disabled', '');
      this._current.setAttribute('tabindex', '-1');
      return this._current.blur();
    }

    this.removeAttribute('disabled');
    this._current.removeAttribute('tabindex');
  },
  required() {
    return this.hasAttribute('required');
  },
  form() {
    return this.closest('form');
  },
  labels() {
    const labels = [];
    const parentLabel = this.closest('label');

    if (parentLabel) labels.push(parentLabel);
    if (!this.id) return labels;

    const selector = `label[for="${this.id}"]`;
    [...document.querySelectorAll(selector)].forEach(el => {
      if (el !== parentLabel) labels.push(el);
    });

    return labels;
  },
  name() {
    return this.getAttribute('name') || '';
  },
  set_name(name) {
    this.setAttribute('name', name);
  },
  value() {
    const selected = this._selected;
    return selected ? selected.value : '';
  },
  set_value(value) {
    value += '';
    const option = [...this.options].find(el => el.value === value);
    if (option) this.selectedIndex = option.index;
  },
  options() {
    return this._options;
  },
  selectedIndex() {
    return [...this.options].indexOf(this._selected);
  },
  set_selectedIndex(val) {
    const ind = this._index = Math.max(0, Math.min(~~val, this.length - 1));
    const option = this.options[ind];
    if (option) selectOption.call(this, option);
  },
  selectedOptions() {
    return [this._selected].filter(Boolean);
  },
  size() {
    return 1;
  },
  length() {
    return this.options.length;
  },
  type() {
    return 'select-one';
  },
  multiple() {
    return false;
  },
  item(index) {
    return this.options[~~index] || null;
  },
  namedItem(name) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present');
    }

    const x = '' + name;
    const search = el => el.id === x || el.getAttribute('name') === x;
    return x ? ([...this.options].find(search) || null) : null;
  },
  add(option, before) {
    if (!(option instanceof HTMLElement)) return;

    if (!option._initialized) defineOption.call(this, option);

    if (before == null || !(before instanceof HTMLElement)) {
      return this._container.append(option);
    }

    if (this._container.contains(before)) before.before(option);
    else this._container.append(option);
  },
  remove(index) {
    if (!arguments.length) return nativeRemove.call(this);
    const item = this.options[~~index];
    if (item) item.remove();
  }
};

const selectProps = [
  '_selected',
  '_expanded',
  'disabled',
  'required',
  'form',
  'labels',
  'name',
  'value',
  'options',
  'selectedIndex',
  'selectedOptions',
  'size',
  'length',
  'type',
  'multiple',
];
const selectMethods = ['item', 'namedItem', 'add', 'remove'];

function defineSelect(target, handler = Function.prototype) {
  target._initialized = true;

  const optCls = 'ui-select__option';
  const current = target._current = target.firstElementChild;
  const container = target._container = target.lastElementChild;
  const options = target._options = container.getElementsByClassName(optCls);
  current.type = 'button';

  selectProps.forEach(key => {
    const getter = selectProto[key];
    const setter = selectProto[`set_${key}`];
    Object.defineProperty(target, key, { get: getter, set: setter });
  });

  selectMethods.forEach(key => {
    Object.defineProperty(target, key, { value: selectProto[key] });
  });

  [...options].forEach(defineOption, target);
  selectOption.call(target, target._selected || options[0]);

  target._search = '';
  target._searchTimerId = 0;
  target._index = target.selectedIndex;
  target._onClose = close.bind(target);
  target._onChange = handler.bind(target);

  target.addEventListener('click', onClick.bind(target));
  target.addEventListener('change', onChange.bind(target));
  current.addEventListener('keydown', onKeyDown.bind(target));
  current.addEventListener('wheel', onWheel.bind(target));

  return target;
}

// ========== [[ Option.prototype ]]

const optionProto = {
  form: selectProto.form,
  disabled: selectProto.disabled,
  set_disabled(force) {
    if (force) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  },
  selected() {
    return this.hasAttribute('selected');
  },
  set_selected(force) {
    if (force) this.setAttribute('selected', '');
    else this.removeAttribute('selected');
  },
  defaultSelected() {
    return this._defaultSelected;
  },
  set_defaultSelected(force) {
    this._defaultSelected = !!force;
  },
  index() {
    return [...this._select.options].indexOf(this);
  },
  label() {
    const label = this.getAttribute('label');
    return label != null ? label : this.innerHTML;
  },
  set_label(label) {
    if (!`${label}`.trim()) this.removeAttribute('label');
    else this.setAttribute('label', label);
  },
  text() {
    return this.textContent;
  },
  set_text(text) {
    this.textContent = text;
  },
  value() {
    const value = this.getAttribute('value');
    return value != null ? value : this.textContent;
  },
  set_value(value) {
    this.setAttribute('value', value);
  }
};

const optionProps = [
  'form',
  'disabled',
  'selected',
  'defaultSelected',
  'index',
  'label',
  'text',
  'value',
];

function defineOption(target) {
  target._select = this;
  target._initialized = true;
  target._defaultSelected = target.hasAttribute('selected');

  optionProps.forEach(key => {
    const getter = optionProto[key];
    const setter = optionProto[`set_${key}`];
    Object.defineProperty(target, key, { get: getter, set: setter });
  });

  return target;
}

// =========================

function selectAndScroll(option) {
  selectOption.call(this, option);
  scrollIntoView.call(this, option);
}

function selectOption(option) {
  const selected = this._selected;
  if (selected) selected.selected = false;

  option.selected = true;
  this._current.innerHTML = option.label;
}

function scrollIntoView(option) {
  if (!option) option = getCurrentOrFirst.call(this);
  if (isSIVINSupported) return option.scrollIntoViewIfNeeded(false);

  const contCoords = this._container.getBoundingClientRect();
  const optionCoords = option.getBoundingClientRect();
  const cb = ~~contCoords.bottom;
  const ct = ~~contCoords.top;
  const ob = ~~optionCoords.bottom;
  const ot = ~~optionCoords.top;
  const val = ot < ct ? -(ct - ot) : ob > cb ? ob - cb : 0;
  this._container.scrollTop += val;
}

function getCurrentOrFirst() {
  return this._selected || [...this.options].find(el => !el.disabled);
}

function getSibling(findNext) {
  const {options} = this;
  const that = getCurrentOrFirst.call(this);

  let i = (findNext ? 1 : -1) + that.index;
  let elem = options[i];

  while (elem && elem.disabled) elem = options[findNext ? ++i : --i];

  return elem || that;
}

function dispatch() {
  return this.dispatchEvent(new Event('change', { bubbles: true }));
}

function open() {
  const contStyle = this._container.style;
  const coords = this.getBoundingClientRect();
  const ct = coords.top >> 0;
  const cb = coords.bottom >> 0;
  const yCenter = ct + this.offsetHeight / 2 >> 0;
  const sh = this._container.scrollHeight + 2 >> 0;
  const vh = window.innerHeight;

  if (yCenter <= (vh / 2 >> 0) || cb + 2 + sh < vh) {
    const y = Math.min(sh, vh - cb - 4);
    contStyle.height = `${~~y}px`;
  } else {
    contStyle.height = `${Math.min(sh, ct - 4)}px`;
    this.classList.add('__top');
  }

  document.addEventListener('click', this._onClose);
  this.classList.add('__expanded');
  scrollIntoView.call(this);
}

function close() {
  this.classList.remove('__top');
  this.classList.remove('__expanded');
  this._container.style.height = '';
  document.removeEventListener('click', this._onClose);
  dispatch.call(this);
}

function search(key) {
  key = key.toLowerCase();
  const str = this._search.toLowerCase();
  const val = this._search = str === key ? key : str + key;

  const ind = this.selectedIndex;
  const options = [...this.options];
  const check = el => !el.disabled && el.label.toLowerCase().startsWith(val);

  let elem = options[ind];

  if (val.length === 1 || elem && !check(elem)) {
    const nodes = [...options.slice(ind + 1), ...options.slice(0, ind + 1)];
    elem = nodes.find(check);
  }

  clearTimeout(~~this._searchTimerId);
  this._searchTimerId = setTimeout(() => this._search = '', 1e3);

  if (!elem) return;
  if (!this._expanded) return elem.click();

  selectAndScroll.call(this, elem);
}

// ========== [[ handlers ]]

function onChange(e) {
  const newIndex = this.selectedIndex;
  if (this._index === newIndex) return;

  this._index = newIndex;
  this._onChange(e);
}

function onClick(e) {
  e.stopPropagation();

  if (this.disabled) return;

  const trg = e.target;
  const current = this._current;

  if (trg === current) {
    return this._expanded ? close.call(this) : open.call(this);
  }

  if (!trg.closest('.ui-select__option')) return;
  if (trg.disabled) return current.focus();

  selectOption.call(this, trg);

  if (this._expanded) close.call(this);
  else dispatch.call(this);

  current.focus();
}

function onKeyDown(e) {
  if (this.disabled) return;

  let selected, sibling;
  const key = '' + (e.key || ({
    9: 'Tab',
    13: 'Enter',
    27: 'Escape',
    32: 'Space',
    38: 'ArrowUp',
    40: 'ArrowDown'
  })[e.keyCode]);

  if (key === 'Enter') return;

  switch (key) {
    case 'Tab':
    case 'Escape':
      this._search = '';
      if (!this._expanded) return;
      e.preventDefault();
      return (selected = this._selected) && selected.click();

    case ' ':
      e.preventDefault();

      if (this._search) break;

      this._search = '';
      return !this._expanded && open.call(this);

    case 'End':
    case 'Home':
    case 'ArrowUp':
    case 'ArrowDown':
      this._search = '';
      e.preventDefault();

      sibling = key === 'End'
        ? [...this.options].reverse().find(el => !el.disabled)
        : key === 'Home'
        ? [...this.options].find(el => !el.disabled)
        : getSibling.call(this, key === 'ArrowDown');

      return this._expanded
        ? selectAndScroll.call(this, sibling)
        : sibling.click();
  }

  if (key.length === 1) search.call(this, key);
}

function onWheel(e) {
  e.preventDefault();
  onKeyDown.call(this, {
    key: e.deltaY > 0 ? 'ArrowDown' : 'ArrowUp',
    preventDefault: Function.prototype
  });
}

// =========================

export default defineSelect;