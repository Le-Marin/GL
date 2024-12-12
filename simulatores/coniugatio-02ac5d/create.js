import VOCABULARY from './vocabulary.js?v=2b';

const vocabulary = VOCABULARY.slice();
const conjugations = [1, 2, 3.1, 3.2, 4, 5, 6];
const stemMatcher = /[^|:~^]+/;

const tenses = {
  1: function() {
    const endings = getEndings(['ō', 's', 't'], ['mus', 'tis', 'nt']);
    const that = {
      1: [
        ['$', '$|ā', '$|a'],
        ['$|ā', '$|ā', '$|a'],
      ],
      2: [
        ['$|e', '$|ē', '$|e'],
        ['$|ē', '$|ē', '$|e'],
      ],
      3.1: [
        ['$', '$:i', '$:i'],
        ['$:i', '$:i', '$:u'],
      ],
      3.2: [
        ['$|i', '$|i', '$|i'],
        ['$|i', '$|i', '$|i:u'],
      ],
      4: [
        ['$|i', '$|ī', '$|i'],
        ['$|ī', '$|ī', '$|i:u'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  2: function() {
    const endings = getEndings(['or', 'ris', 'tur'], ['mur', 'minī', 'ntur']);
    const that = {
      1: [
        ['$', '$|ā', '$|ā'],
        ['$|ā', '$|ā', '$|a'],
      ],
      2: [
        ['$|e', '$|ē', '$|ē'],
        ['$|ē', '$|ē', '$|e'],
      ],
      3.1: [
        ['$', '$:e', '$:i'],
        ['$:i', '$:i', '$:u'],
      ],
      3.2: [
        ['$|i', '$|e', '$|i'],
        ['$|i', '$|i', '$|i:u'],
      ],
      4: [
        ['$|i', '$|ī', '$|ī'],
        ['$|ī', '$|ī', '$|i:u'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  3: function() {
    const endings = getEndings(['m', 's', 't'], ['mus', 'tis', 'nt']);
    const that = {
      1: [
        ['$|ā^ba', '$|ā^bā', '$|ā^ba'],
        ['$|ā^bā', '$|ā^bā', '$|ā^ba'],
      ],
      2: [
        ['$|ē^ba', '$|ē^bā', '$|ē^ba'],
        ['$|ē^bā', '$|ē^bā', '$|ē^ba'],
      ],
      3.1: [
        ['$^ēba', '$^ēbā', '$^ēba'],
        ['$^ēbā', '$^ēbā', '$^ēba'],
      ],
      3.2: [
        ['$|i^ēba', '$|i^ēbā', '$|i^ēba'],
        ['$|i^ēbā', '$|i^ēbā', '$|i^ēba'],
      ],
      4: [
        ['$|i^ēba', '$|i^ēbā', '$|i^ēba'],
        ['$|i^ēbā', '$|i^ēbā', '$|i^ēba'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  4: function() {
    const endings = getEndings(['r', 'ris', 'tur'], ['mur', 'minī', 'ntur']);
    const that = {
      1: [
        ['$|ā^ba', '$|ā^bā', '$|ā^bā'],
        ['$|ā^bā', '$|ā^bā', '$|ā^ba'],
      ],
      2: [
        ['$|ē^ba', '$|ē^bā', '$|ē^bā'],
        ['$|ē^bā', '$|ē^bā', '$|ē^ba'],
      ],
      3.1: [
        ['$^ēba', '$^ēbā', '$^ēbā'],
        ['$^ēbā', '$^ēbā', '$^ēba'],
      ],
      3.2: [
        ['$|i^ēba', '$|i^ēbā', '$|i^ēbā'],
        ['$|i^ēbā', '$|i^ēbā', '$|i^ēba'],
      ],
      4: [
        ['$|i^ēba', '$|i^ēbā', '$|i^ēbā'],
        ['$|i^ēbā', '$|i^ēbā', '$|i^ēba'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  5: function() {
    const endings = getEndings([['ō', 'm'], 's', 't'], ['mus', 'tis', 'nt']);
    const that = {
      1: [
        ['$|ā^b', '$|ā^b:i', '$|ā^b:i'],
        ['$|ā^b:i', '$|ā^b:i', '$|ā^b:u'],
      ],
      2: [
        ['$|ē^b', '$|ē^b:i', '$|ē^b:i'],
        ['$|ē^b:i', '$|ē^b:i', '$|ē^b:u'],
      ],
      3.1: [
        ['$^a', '$^ē', '$^e'],
        ['$^ē', '$^ē', '$^e'],
      ],
      3.2: [
        ['$|i^a', '$|i^ē', '$|i^e'],
        ['$|i^ē', '$|i^ē', '$|i^e'],
      ],
      4: [
        ['$|i^a', '$|i^ē', '$|i^e'],
        ['$|i^ē', '$|i^ē', '$|i^e'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  6: function() {
    const endings = getEndings([['or', 'r'], 'ris', 'tur'], ['mur', 'minī', 'ntur']);
    const that = {
      1: [
        ['$|ā^b', '$|ā^b:e', '$|ā^b:i'],
        ['$|ā^b:i', '$|ā^b:i', '$|ā^b:u'],
      ],
      2: [
        ['$|ē^b', '$|ē^b:e', '$|ē^b:i'],
        ['$|ē^b:i', '$|ē^b:i', '$|ē^b:u'],
      ],
      3.1: [
        ['$^a', '$^ē', '$^ē'],
        ['$^ē', '$^ē', '$^e'],
      ],
      3.2: [
        ['$|i^a', '$|i^ē', '$|i^ē'],
        ['$|i^ē', '$|i^ē', '$|i^e'],
      ],
      4: [
        ['$|i^a', '$|i^ē', '$|i^ē'],
        ['$|i^ē', '$|i^ē', '$|i^e'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  7: function() {
    const endings = getEndings(['ī', 'istī', 'it'], ['imus', 'istis', 'ērunt']);
    return createTense2.call(this, getCommon(endings), true);
  },

  8: function() {
    const endings = getEndings(['us sum', 'us es', 'us est'], ['ī sumus', 'ī estis', 'ī sunt']);
    return createTense2.call(this, getCommon(endings), false);
  },

  9: function() {
    const common = [
      ['$^era~m', '$^erā~s', '$^era~t'],
      ['$^erā~mus', '$^erā~tis', '$^era~nt'],
    ];

    return createTense2.call(this, common, true);
  },

  10: function() {
    const endings = getEndings(['us eram', 'us erās', 'us erat'], ['ī erāmus', 'ī erātis', 'ī erant']);
    return createTense2.call(this, getCommon(endings), false);
  },

  11: function() {
    const common = [
      ['$^er~ō', '$^eri~s', '$^eri~t'],
      ['$^eri~mus', '$^eri~tis', '$^eri~nt'],
    ];

    return createTense2.call(this, common, true);
  },

  12: function() {
    const endings = getEndings(['us erō', 'us eris', 'us erit'], ['ī erimus', 'ī eritis', 'ī erunt']);
    return createTense2.call(this, getCommon(endings), false);
  },

  13: function() {
    const endings = getEndings([''], ['te'], 1);
    const that = {
      1: [
        ['', '$|ā', ''],
        ['', '$|ā', ''],
      ],
      2: [
        ['', '$|ē', ''],
        ['', '$|ē', ''],
      ],
      3.1: [
        ['', '$:e', ''],
        ['', '$:i', ''],
      ],
      3.2: [
        ['', '$|e', ''],
        ['', '$|i', ''],
      ],
      4: [
        ['', '$|ī', ''],
        ['', '$|ī', ''],
      ],
    };

    return createTense.call(this, that, endings);
  },

  14: function() {
    const endings = getEndings(['re'], ['minī'], 1);
    const that = {
      1: [
        ['', '$|ā', ''],
        ['', '$|ā', ''],
      ],
      2: [
        ['', '$|ē', ''],
        ['', '$|ē', ''],
      ],
      3.1: [
        ['', '$:e', ''],
        ['', '$:i', ''],
      ],
      3.2: [
        ['', '$|e', ''],
        ['', '$|i', ''],
      ],
      4: [
        ['', '$|ī', ''],
        ['', '$|ī', ''],
      ],
    };

    return createTense.call(this, that, endings);
  },

  15: function() {
    const endings = getEndings(['tō', 'tō'], ['tōte', 'ntō'], 2);
    const that = {
      1: [
        ['', '$|ā', '$|ā'],
        ['', '$|ā', '$|a'],
      ],
      2: [
        ['', '$|ē', '$|ē'],
        ['', '$|ē', '$|e'],
      ],
      3.1: [
        ['', '$:i', '$:i'],
        ['', '$:i', '$:u'],
      ],
      3.2: [
        ['', '$|i', '$|i'],
        ['', '$|i', '$|i:u'],
      ],
      4: [
        ['', '$|ī', '$|ī'],
        ['', '$|ī', '$|i:u'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  16: function() {
    const endings = getEndings(['tor'], ['ntor'], 1);
    const that = {
      1: [
        ['', '$|ā', '$|ā'],
        ['', '', '$|a'],
      ],
      2: [
        ['', '$|ē', '$|ē'],
        ['', '', '$|e'],
      ],
      3.1: [
        ['', '$:i', '$:i'],
        ['', '', '$:u'],
      ],
      3.2: [
        ['', '$|i', '$|i'],
        ['', '', '$|i:u'],
      ],
      4: [
        ['', '$|ī', '$|ī'],
        ['', '', '$|i:u'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  17: function() {
    const endings = getEndings(['m', 's', 't'], ['mus', 'tis', 'nt']);
    const that = {
      1: [
        ['$^e', '$^ē', '$^e'],
        ['$^ē', '$^ē', '$^e'],
      ],
      2: [
        ['$|e^a', '$|e^ā', '$|e^a'],
        ['$|e^ā', '$|e^ā', '$|e^a'],
      ],
      3.1: [
        ['$^a', '$^ā', '$^a'],
        ['$^ā', '$^ā', '$^a'],
      ],
      3.2: [
        ['$|i^a', '$|i^ā', '$|i^a'],
        ['$|i^ā', '$|i^ā', '$|i^a'],
      ],
      4: [
        ['$|i^a', '$|i^ā', '$|i^a'],
        ['$|i^ā', '$|i^ā', '$|i^a'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  18: function() {
    const endings = getEndings(['r', 'ris', 'tur'], ['mur', 'minī', 'ntur']);
    const that = {
      1: [
        ['$^e', '$^ē', '$^ē'],
        ['$^ē', '$^ē', '$^e'],
      ],
      2: [
        ['$|e^a', '$|e^ā', '$|e^ā'],
        ['$|e^ā', '$|e^ā', '$|e^a'],
      ],
      3.1: [
        ['$^a', '$^ā', '$^ā'],
        ['$^ā', '$^ā', '$^a'],
      ],
      3.2: [
        ['$|i^a', '$|i^ā', '$|i^ā'],
        ['$|i^ā', '$|i^ā', '$|i^a'],
      ],
      4: [
        ['$|i^a', '$|i^ā', '$|i^ā'],
        ['$|i^ā', '$|i^ā', '$|i^a'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  19: function(endings) {
    endings = endings || getEndings(['m', 's', 't'], ['mus', 'tis', 'nt']);
    let end = this.inflection;

    const create = (stem) => {
      const stem2 = stem.replace(/e$/, 'ē');
      const model = [[stem, stem2, stem], [stem2, stem2, stem]];
      const that = Object.fromEntries(conjugations.map(key => [key, model]));
      return createTense.call(this, that, endings);
    };

    if (this.conjugation === 5) return create(end);

    else if (this.conjugation === 6) {
      if (end === 'ī') end = 'ere';
      else if (end.endsWith('rī')) end = end.slice(0, -2) + 're';
    }

    return create(this.root.replace('-', '') + end);
  },

  20: function() {
    const endings = getEndings(['r', 'ris', 'tur'], ['mur', 'minī', 'ntur']);
    const data = tenses[19].call(this, endings);
    const stem = data[0][1].match(stemMatcher)[0];
    data[0][2] = data[0][2].replace(stemMatcher, stem);

    return data;
  },

  21: function() {
    const common = [
      ['$^eri~m', '$^erī~s', '$^eri~t'],
      ['$^erī~mus', '$^erī~tis', '$^eri~nt'],
    ];

    return createTense2.call(this, common, true);
  },

  22: function() {
    const endings = getEndings(['us sim', 'us sīs', 'us sit'], ['ī sīmus', 'ī sītis', 'ī sint']);
    return createTense2.call(this, getCommon(endings), false);
  },

  23: function() {
    const endings = getEndings(['m', 's', 't'], ['mus', 'tis', 'nt']);
    const [sg, pl] = createTense2.call(this, getCommon(endings), true);
    const re = (f) => (x, i) => x.replace(stemMatcher, `$&iss${f(i) ? 'ē' : 'e'}`);

    return [sg.map(re(i => i === 1)), pl.map(re(i => i !== 2))];
  },

  24: function() {
    const endings = getEndings(['us essem', 'us essēs', 'us esset'], ['ī essēmus', 'ī essētis', 'ī essent']);
    return createTense2.call(this, getCommon(endings), false);
  },

  25: function() {
    const endings = getEndings(
      ['', 'is', 'ī', 'em', 'e', ''],
      ['ēs', 'ium', 'ibus', 'ēs', 'ibus', 'ēs'],
      6
    );
    const that = {
      1: [
        ['$|ā^ns', '$|a^nt', '$|a^nt', '$|a^nt', '$|a^nt', '$|ā^ns'],
        ['$|a^nt', '$|a^nt', '$|a^nt', '$|a^nt', '$|a^nt', '$|a^nt'],
      ],
      2: [
        ['$|ē^ns', '$|e^nt', '$|e^nt', '$|e^nt', '$|e^nt', '$|ē^ns'],
        ['$|e^nt', '$|e^nt', '$|e^nt', '$|e^nt', '$|e^nt', '$|e^nt'],
      ],
      3.1: [
        ['$^ēns', '$^ent', '$^ent', '$^ent', '$^ent', '$^ēns'],
        ['$^ent', '$^ent', '$^ent', '$^ent', '$^ent', '$^ent'],
      ],
      3.2: [
        ['$|i^ēns', '$|i^ent', '$|i^ent', '$|i^ent', '$|i^ent', '$|i^ēns'],
        ['$|i^ent', '$|i^ent', '$|i^ent', '$|i^ent', '$|i^ent', '$|i^ent'],
      ],
      4: [
        ['$|i^ēns', '$|i^ent', '$|i^ent', '$|i^ent', '$|i^ent', '$|i^ēns'],
        ['$|i^ent', '$|i^ent', '$|i^ent', '$|i^ent', '$|i^ent', '$|i^ent'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  26: function() {
    const endings = getEndings(
      'us ī ō um ō e'.split(' '),
      'ī ōrum īs ōs īs ī'.split(' '),
      6
    );
    return createTense2.call(this, getCommon(endings), false);
  },

  27: function() {
    const endings = getEndings(
      'us ī ō um ō e'.split(' '),
      'ī ōrum īs ōs īs ī'.split(' '),
      6
    );

    return createTense2.call(this, getCommon(endings), false).map(a => {
      return a.map(x => x.replace('~', '^ūr~'));
    });
  },

  28: function() {
    const endings = getEndings(
      'us ī ō um ō e'.split(' '),
      'ī ōrum īs ōs īs ī'.split(' '),
      6
    );

    const that = {
      1: [
        ['$|a^nd', '$|a^nd', '$|a^nd', '$|a^nd', '$|a^nd', '$|a^nd'],
        ['$|a^nd', '$|a^nd', '$|a^nd', '$|a^nd', '$|a^nd', '$|a^nd'],
      ],
      2: [
        ['$|e^nd', '$|e^nd', '$|e^nd', '$|e^nd', '$|e^nd', '$|e^nd'],
        ['$|e^nd', '$|e^nd', '$|e^nd', '$|e^nd', '$|e^nd', '$|e^nd'],
      ],
      3.1: [
        ['$^end', '$^end', '$^end', '$^end', '$^end', '$^end'],
        ['$^end', '$^end', '$^end', '$^end', '$^end', '$^end'],
      ],
      3.2: [
        ['$|i^end', '$|i^end', '$|i^end', '$|i^end', '$|i^end', '$|i^end'],
        ['$|i^end', '$|i^end', '$|i^end', '$|i^end', '$|i^end', '$|i^end'],
      ],
      4: [
        ['$|i^end', '$|i^end', '$|i^end', '$|i^end', '$|i^end', '$|i^end'],
        ['$|i^end', '$|i^end', '$|i^end', '$|i^end', '$|i^end', '$|i^end'],
      ],
    };

    return createTense.call(this, that, endings);
  },

  29: function() {
    const endings = getEndings(
      ['ī', 'ō', 'um', 'ō'],
      ['', '', '', ''],
      4
    );

    const that = {
      1: [
        ['', '$|a^nd', '$|a^nd', '$|a^nd', '$|a^nd', ''],
        ['', '', '', '', '', ''],
      ],
      2: [
        ['', '$|e^nd', '$|e^nd', '$|e^nd', '$|e^nd', ''],
        ['', '', '', '', '', ''],
      ],
      3.1: [
        ['', '$^end', '$^end', '$^end', '$^end', ''],
        ['', '', '', '', '', ''],
      ],
      3.2: [
        ['', '$|i^end', '$|i^end', '$|i^end', '$|i^end', ''],
        ['', '', '', '', '', ''],
      ],
      4: [
        ['', '$|i^end', '$|i^end', '$|i^end', '$|i^end', ''],
        ['', '', '', '', '', ''],
      ],
    };

    return createTense.call(this, that, endings);
  },
};

function createTense(that, endings) {
  const stem = this.root.replace('-', '');
  const con = this.con || this.conjugation;
  const [sg, pl] = that[con];
  const i = +!(con <= 2);

  function cb(x, j, a) {
    if (!x) return '';
    let e = endings[a === sg ? 'a' : 'b'];
    e = e && (x.includes('~') ? '' : `~${typeof e === 'string' ? e : e[i]}`);
    return x.replace('$', stem) + e;
  }

  return [sg.map(cb), pl.map(cb)];
}

function createTense2([sg, pl], isActive) {
  let {root, chunks} = this;
  const con = this.con || this.conjugation;
  const adds = isActive ? ['āv', 'u', 'īv'] : ['āt', 'it', 'īt'];
  adds.splice(2, 0, '', '');

  if (chunks.length) root = parseRoot(root.split('-')[0], chunks[+!isActive]);
  else root += adds[conjugations.indexOf(con)];

  const cb = x => x.replace('$', root);

  return [sg.map(cb), pl.map(cb)];
}

function getCommon(endings) {
  const sg = [...Array(endings.len)].map(() => `$~${endings.a}`);
  const pl = sg.map(() => `$~${endings.b}`);
  return [sg, pl];
}

function updateForms(that, {sg, pl}) {
  Object.keys(sg || {}).forEach(k => { that[0][k - 1] = sg[k]; });
  Object.keys(pl || {}).forEach(k => { that[1][k - 1] = pl[k]; });
}

function parseRoot(r1, r2) {
  r2 = r2.split('~')[0];
  return r2[0] === '-' ? r1 + r2.slice(1) : r2;
}

function getEndings(sg, pl, len = 3) {
  let s = 0;
  let p = 0;

  return {
    len,
    get a() { return sg[s++ % len]; },
    get b() { return pl[p++ % len]; },
  };
}

// =========================

function create(conjugation, value, translation, sys) {
  const cache = {};
  const chunks = value.split('(')[0].split(' ');
  const last = (a) => a[a.length - 1];
  const inflection = last(last(chunks).split(/[\-~]/));
  const root = chunks.shift().split('~')[0];

  return {
    root,
    value,
    translation,
    conjugation,
    inflection,
    chunks,
    getTense(tense) {
      if (cache[tense]) return cache[tense];

      const sysData = sys && sys[tense];

      if (sysData && Array.isArray(sysData)) {
        return cache[tense] = sysData.map(a => a.slice());
      }

      if (conjugation < 5) {
        const that = root === 'fac'
          ? getFacio3B.call(this, tense)
          : tenses[tense].call(this);
        if (sysData) updateForms(that, sysData);
        return cache[tense] = that;
      }

      this.con = +(value.match(/\(([1-4](?:\.[12])?)/) || '00')[1];

      const getter = conjugation === 5 ? get5 : get6;
      const that = getter.call(this, tense);

      if (sysData) updateForms(that, sysData);

      return cache[tense] = that;
    }
  };
}

function getFacio3B(tense) {
  if (tense % 2) return tenses[tense].call(this);
  const word = vocabulary.find(([c, v]) => c === 6 && v.startsWith('f~īō'));
  return create(...word).getTense(tense - 1);
}

function get5(tense) {
  if (this.root === 'possum' && /^([1-6]|17)$/.test(tense)) {
    const search = ([c, v]) => c === 5 && v.startsWith('sum');
    const callback = (a) => a.map(x => (x[0] === 's' ? 'pos' : 'pot') + x);
    return create(...vocabulary.find(search)).getTense(tense).map(callback);
  } else if (this.root === 'ed' && /19|20/.test(tense)) {
    const [a, b] = this.inflection.split('/');
    const data1 = tenses[tense].call({...this, inflection: a});
    const data2 = tenses[tense].call({...this, inflection: b});
    return data1.map((a, j) => a.map((x, i) => `${x}/${data2[j][i]}`));
  }

  return tenses[tense].call(this);
}

function get6(tense) {
  if (this.chunks.length === 2) this.chunks.unshift('-@~@');

  const isFio = this.value.startsWith('f~īō');
  const isFio2 = isFio && /19|20/.test(tense);
  const key = isFio
    ? tense + /^(7|9|11|21|23)/.test(tense)
    : tense + !/2[5-9]/.test(tense);

  const callback = (x) => {
    if (isFio) x = x.replace('|i', '|ī');
    return isFio2 ? x.replace(/^f(?!i)/, 'fi') : x;
  };

  return tenses[key].call(this).map(a => a.map(callback));
}

export default create;