const declensions = {
  1: function() {
    const root = getWordRoot(this[1]);
    const endings = [
      ['a', 'ae', 'ae', 'am', 'ā', 'a'],
      ['ae', 'ārum', 'īs', 'ās', 'īs', 'ae'],
    ];

    const sg = endings[0].map(x => `${root}~${x}`);
    const pl = endings[1].map(x => `${root}~${x}`);

    return updateFormsIfNeeded(this, sg, pl);
  },

  2: function() {
    const [main, params] = splitParts(this[1]);
    const chunks = main.split(' ');
    const root = getWordRoot(main);
    const end = chunks[0].slice(-2);
    const type = (params.match(/\bt[12]/) || '')[0];

    const types = {
      t1: { s1: 'us', s6: 'e' }, // us
      t2: { s1: '', s6: '' } // er
    };

    const forms = types[type] || types[end === 'us' ? 't1' : 't2'];
    const p1 = / n\b/.test(main) ? 'a' : 'ī';

    const isComplex = chunks[0].includes('-')
    const r2 = isComplex ? parseRoot(chunks) : root;

    const endings = [
      [forms.s1, 'ī', 'ō', 'um', 'ō', forms.s6],
      [p1, 'ōrum', 'īs', 'ōs', 'īs', p1],
    ];

    const sg = endings[0].map((x, i) => {
      if (!isComplex) return `${r2}~${x}`;
      if (!i || i === 5) return root;
      return `${r2}~${x}`;
    });

    const pl = endings[1].map(x => `${r2}~${x}`);

    return updateFormsIfNeeded(this, sg, pl);
  },

  3: function(isSingleton = true) {
    const [main, params] = splitParts(this[1]);
    const type = (params.match(/v[12][abc]?/) || '')[0];
    const chunks = main.split(' ');
    const root = getWordRoot(main);
    const gen = getWordGen(main);
    const end = chunks[0].slice(-2);

    const isComplex = chunks[0].includes('-');
    const r2 = isComplex ? parseRoot(chunks) : root;
    const s1End = chunks[0].includes('~') ? end : '';
    const isFMGen = gen !== 'n';

    const types = {
      // -al, -ar, -e
      v1: {
        s1: end[1] === 'e' ? 'e' : '',
        get s4() { return this.s1; },
        s5: 'ī',
        p1: 'ia',
        p2: 'ium',
      },
      v2a: {
        s1: s1End,
        s4: 'im',
        s5: 'ī',
        p1: 'ēs',
        p2: 'ium',
      },
      v2b: {
        s1: s1End,
        s4: 'im/em',
        s5: 'ī/e',
        p1: 'ēs',
        p2: 'ium',
      },
      v2c: {
        s1: s1End,
        s4: !isFMGen ? s1End : isSingleton ? 'im' : 'em',
        s5: 'ī',
        p1: !isFMGen ? 'ia' : 'ēs',
        p2: 'ium',
      },
      // -is|-ēs -is
      // CC-is
      mix: {
        s1: s1End,
        s4: isFMGen ? 'em' : s1End,
        s5: 'e',
        p1: isFMGen ? 'ēs' : 'a',
        p2: 'ium',
      },
      // *
      con: {
        s1: s1End,
        s4: isFMGen ? 'em' : s1End,
        s5: 'e',
        p1: isFMGen ? 'ēs' : 'a',
        p2: 'um',
      },
    };

    const key = (end[1] === 'e' || ['al', 'ar'].includes(end))
      ? 'v1'
      : type
      ? type
      : (isMix(chunks[1].replace('~', '')) || /~[iē]s/.test(chunks[0]))
      ? 'mix'
      : 'con';

    const forms = types[key];

    function isMix(x) {
      if (!x.endsWith('is')) return false;
      return /[bcdfghklmnprstvxz]{2}/.test(x.slice(-4, -2));
    }

    const endings = [
      [forms.s1, 'is', 'ī', forms.s4, forms.s5, forms.s1],
      [forms.p1, forms.p2, 'ibus', forms.p1, 'ibus', forms.p1],
    ];

    const sg = endings[0].map((x, i) => {
      const is2End = x.includes('/');
      const form = `${r2}~${x}`;
      const form2 = `${root}~${x}`;

      const get = (r, alt = form) => {
        return is2End
          ? x.split('/').map(e => `${r}~${e}`).join('/')
          : alt;
      };

      if (!isComplex) return get(r2);
      if (!isFMGen) return [0, 3, 5].includes(i) ? form2 : form;
      if ([0, 5].includes(i)) return get(root, form2);

      return get(r2);
    });

    const pl = endings[1].map(x => `${r2}~${x}`);

    return updateFormsIfNeeded(this, sg, pl);
  },

  4: function() {
    const value = this[1];
    const chunks = value.split(' ');
    const root = getWordRoot(value);
    const end = chunks[0].slice(-2);
    const type = (value.match(/\bt[12]/) || '')[0];

    const types = {
      t1: { s1: 'us', s3: 'uī', s4: 'um', p1: 'ūs' }, // us
      t2: { s1: 'ū', s3: 'ū', p1: 'ua' } // ū
    };

    const forms = types[type] || types[end === 'us' ? 't1' : 't2'];

    const endings = [
      [forms.s1, 'ūs', forms.s3, forms.s4, 'ū', forms.s1],
      [forms.p1, 'uum', 'ibus', forms.p1, 'ibus', forms.p1],
    ];

    const sg = endings[0].map(x => `${root}~${x}`);
    const pl = endings[1].map(x => `${root}~${x}`);

    return updateFormsIfNeeded(this, sg, pl);
  },

  5: function() {
    const value = this[1];
    const chunks = value.split(' ');
    const root = getWordRoot(value);
    const end4 = chunks[0].slice(-4);
    const end = (end4[0] === 'i' ? 'i' : '') + end4.slice(2);
    const s2 = { iēs: 'ēī', ēs: 'eī' }[end] || '';

    const endings = [
      ['ēs', s2, s2, 'em', 'ē', 'ēs'],
      ['ēs', 'ērum', 'ēbus', 'ēs', 'ēbus', 'ēs'],
    ];

    const sg = endings[0].map(x => `${root}~${x}`);
    const pl = endings[1].map(x => `${root}~${x}`);

    return updateFormsIfNeeded(this, sg, pl);
  },

  6: function() {
    const chunks = this[1].split('] ').map(splitParts);
    const types = chunks.map(chunk => +chunk[1][0]);

    let sg = [...Array(6)].map(() => ['', '']);
    let pl = sg.map(() => ['', '']);

    types.forEach((type, i) => {
      const [main, params] = chunks[i];
      const isSingleton = !(type === 3 && i == 1);
      const str = main + params.slice(1) + ` [${params.slice(2)}]`;
      const form = getDictWord([type, str], isSingleton);

      for (let c = 0; c < 6; c++) {
        sg[c][i] = form[0][c];
        pl[c][i] = form[1][c];
      }
    });

    sg = sg.map(data => data.join(' '));
    pl = pl.map(data => data.join(' '));

    return updateFormsIfNeeded(this, sg, pl);
  },

  7: function() {
    const [main, params] = splitParts(this[1]);
    const [word, gen] = main.split(' ');
    const type = gen === 'f' ? 1 : 2;
    const stemMatch = params ? params.match(/[a-z]+/) : null;
    const stem = (stemMatch || [getWordRoot(main)])[0];
    const str = `${word} ${stem} ${gen}`;

    const cb = (x) => x.replace(`${word}~`, `${stem}~`);
    const [sg, pl] = getDictWord([type, str]).map(a => a.map(cb));

    sg.splice(0, 3, word, `${stem}~īus`, `${stem}~ī`);

    const that = updateFormsIfNeeded(this, sg, pl);
    updateForms(this, sg, pl);

    sg[5] = pl[5] = '';

    return that;
  },

  8: function() {
    const [main, params] = splitParts(this[1]);
    const type = +params[0];
    const str = main + ' ' + params.slice(2) + ` [${params.slice(2)}]`;
    const [sg, pl] = getDictWord([type, str]);

    if (!params.includes('#')) {
      const [word, gen] = main.split(' ');
      sg.splice(0);
      pl[5] = pl[0] = word;

      if (gen === 'n' || type === 3) pl[3] = pl[0];
    }

    return updateFormsIfNeeded(this, sg, pl);
  },
};

const getWordGen = (value) => value.match(/ ([mfn]{1,2})\b/)[1];
const getWordRoot = (value) => value.match(/[^~ ]+/)[0].replace('-', '');
const getFormsFromArray = (data) => data.map(a => a.slice());

function parseRoot([r1, r2]) {
  r2 = r2.split('~')[0];
  return r2[0] === '-' ? r1.split('-')[0] + r2.slice(1) : r2;
}

function splitParts(value) {
  const [main, params = ''] = value.split('[');
  return [main.trim(), params.replace(']', '')];
}

function updateFormsIfNeeded(self, sg, pl) {
  if (self[0] <= 6) updateForms(self, sg, pl);

  if (self[1].includes('!sg')) sg.splice(0);
  else if (self[1].includes('!pl')) pl.splice(0);

  const data = self[3];

  if (!(data && typeof data === 'object')) return [sg, pl];

  Object.keys(data.sg || {}).forEach(k => { sg[k - 1] = data.sg[k]; });
  Object.keys(data.pl || {}).forEach(k => { pl[k - 1] = data.pl[k]; });

  return [sg, pl];
}

function updateForms([declension, value], sg, pl) {
  if (declension <= 5) {
    const s1 = value.split(' ')[0].replace('-', '');

    sg[0] = s1;
    pl[5] = pl[0];

    if (!(declension === 2 && value.includes('~us'))) {
      sg[5] = sg[0];
    }

    if (declension >= 3) {
      pl[3] = pl[0];
    }
  }

  if (/ n\b/.test(value)) {
    sg[5] = sg[3] = sg[0];
    pl[5] = pl[3] = pl[0];
  }
}

function getDictWord(data, ...args) {
  if (Array.isArray(data[3])) return getFormsFromArray(data[3]);
  return declensions[data[0]].call(data, ...args);
}

export default getDictWord;