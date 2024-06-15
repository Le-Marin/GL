const VOCABULARY = [
  [1, 'oper~a -ae f', 'work; effort / работа; усилие'],
  [1, 'alaud~a -ae f', 'lark / жаворонок'],
  [1, 'luscini~a -ae f', 'nightingale / соловей'],
  [1, 'tragoedi~a -ae f', 'tragedy / трагедия'],
  [1, 'fām~a -ae f', 'talk, rumour / молва, слух'],
  [1, 'rot~a -ae f', 'wheel / колесо'],
  [1, 'stēll~a -ae f', 'star / звезда'],
  [1, 'umbr~a -ae f', 'shadow / тень'],
  [1, 'scienti~a -ae f', 'knowledge / знание'],
  [1, 'cist~a -ae f', 'box / ящик, ларчик'],
  [1, 'dolābr~a -ae f', 'mattock, pickaxe / мотыга, кирка'],
  [1, 'mapp~a -ae f', 'napkin, cloth / салфетка, тряпка'],
  [1, 'colubr~a -ae f', 'female serpent / змея, змейка'],
  [1, 'convīv~a -ae m', 'guest, table companion / гость, сотрапезник'],
  [1, 'pīrāt~a -ae m', 'pirate / пират'],
  [1, 'poēt~a -ae m', 'poet / поэт'],
  [1, 'naut~a -ae m', 'sailor / моряк'],
  [1, 'fīli~a -ae f', 'daughter / дочь', {
    pl: { 3: 'fīli~ābus', 5: 'fīli~ābus' }
  }],
  [1, 'tenebr~ae -ārum f [!sg]', 'darkness, gloom / потёмки'],
  [1, 'īnsidi~ae -ārum f [!sg]', 'ambush / засада'],

  [2, 'tympan~um -ī n', 'drum, timbrel / барабан, тимпан'],
  [2, 'sag~um -ī n', 'cloak / плащ'],
  [2, 'rēgn~um -ī n', 'kingdom / королевство'],
  [2, 'subselli~um -ī n', 'bench / скамья'],
  [2, 'phaenomen~on -ī n', 'phenomenon / явление'],
  [2, 'vīr~us -ī n [!pl]', 'venom / яд, ядовитое выделение'],
  [2, 'castr~a -ōrum n [!sg]', 'camp, encampment / лагерь'],
  [2, 'arm~a -ōrum n [!sg]', 'armour, arms / вооружение'],
  [2, 'furn~us -ī m', 'oven / печь'],
  [2, 'cerv~us -ī m', 'deer, stag / олень'],
  [2, 'urs~us -ī m', 'bear / медведь'],
  [2, 'sorb~us -ī f', 'sorb, rowan / рябина'],
  [2, 'atom~us -ī f', 'atom / атом'],
  [2, 'de~us -ī m', 'god / бог', {
    sg: { 6: 'de~us' },
    pl: { 1: 'de~ī/d~ī', 2: 'de~ōrum/de~um', 3: 'de~īs/d~īs', 5: 'de~īs/d~īs' }
  }],
  [2, 'a-per -pr~ī m', 'wild boar / кабан'],
  [2, 'li-ber -br~ī m', 'book / книга'],
  [2, 'gen-er -er~ī m', 'son-in-law / зять'],
  [2, 'līber~ī -ōrum m [!sg t1]', 'children / дети'],
  [2, 'vir virī m', 'man / мужчина', [
    ['vir', 'vir~ī', 'vir~ō', 'vir~um', 'vir~ō', 'vir'],
    ['vir~ī', 'vir~ōrum', 'vir~īs', 'vir~ōs', 'vir~īs', 'vir~ī'],
  ]],
  [2, 'fīli~us -ī m', 'son / сын', {
    sg: { 6: 'fīl^ī' }
  }],

  [3, 'regi-ō -ōn~is f', 'region / регион, край'],
  [3, 'calamit-ās -āt~is f', 'calamity / бедствие'],
  [3, 'p-āx pāc~is f', 'peace / мир'],
  [3, 'l-ēx lēg~is f', 'law / закон'],
  [3, 'sap-ō -ōn~is m', 'soap / мыло'],
  [3, 'iuven~is -is m', 'young man / юноша', {
    pl: { 2: 'iuven~um' }
  }],
  [3, 'on-us -er~is n', 'burden / бремя'],
  [3, 'carm-en -in~is n', 'song / песня'],
  [3, 'poēm-a -at~is n', 'poem / стихотворение', {
    pl: { 3: 'poēmat~ibus/poēmat~īs', 5: 'poēmat~ibus/poēmat~īs' }
  }],
  [3, 'can~is -is mf', 'dog / собака', {
    pl: { 2: 'can~um' }
  }],
  [3, 'pa-ter -tr~is m', 'father / отец', {
    pl: { 2: 'patr~um' }
  }],
  [3, 'host~is -is m', 'enemy / враг'],
  [3, 'fēl~ēs -is f', 'cat / кошка'],
  [3, 'urb-s urb~is f', 'city / город'],
  [3, 'o-s oss~is n', 'bone / кость'],
  [3, 'vectīg-al -āl~is n', 'tax / налог'],
  [3, 'lacūn-ar -ār~is n', 'ceiling / потолок'],
  [3, 'rēt~e -is n', 'net / сеть'],
  [3, 'sit~is -is f [!pl v2a]', 'thirst / жажда'],
  [3, 'pupp~is -is f [v2b]', 'stern / корма'],

  [4, 'curr~us -ūs m', 'chariot / колесница'],
  [4, 'cās~us -ūs m', 'falling / падение'],
  [4, 'sēns~us -ūs m', 'sense / чувство'],
  [4, 'grad~us -ūs m', 'step / шаг'],
  [4, 'magistrāt~us -ūs m', 'magistrate / сановник, чиновник'],
  [4, 'exit~us -ūs m', 'egress, outlet / выход'],
  [4, 'sin~us -ūs m', 'curve, fold / изгиб, складка'],
  [4, 'rīt~us -ūs m', 'rite / обряд'],
  [4, 'portic~us -ūs f', 'arcade, colonnade / портик, коллонада', {
    pl: { 4: 'portic~ūs/portic~ōs' }
  }],
  [4, 'man~us -ūs f', 'hand / рука'],
  [4, 'nur~us -ūs f', 'daughter-in-law / невестка'],
  [4, 'dom~us -ūs f', 'house, home / дом', {
    sg: { 3: 'dom~uī/dom~ō', 5: 'dom~ū/dom~ō' },
    pl: { 2: 'dom~uum/dom~ōrum', 4: 'dom~ūs/dom~ōs' }
  }],
  [4, 'lac~us -ūs m', 'lake / озеро', {
    pl: { 3: 'lac~ibus/lac~ubus', 5: 'lac~ibus/lac~ubus' }
  }],
  [4, 'art~us -ūs m', 'joint / сочленение, сустав', {
    pl: { 3: 'art~ibus/art~ubus', 5: 'art~ibus/art~ubus' }
  }],
  [4, 'trib~us -ūs f', 'tribe / племя', {
    pl: { 3: 'trib~ubus', 5: 'trib~ubus' }
  }],
  [4, 'Īd~ūs -uum f [!sg t1]', 'Ides / иды'],
  [4, 'gel~ū -ūs n', 'frost, cold / мороз, стужа'],
  [4, 'gen~ū -ūs n', 'knee / колено'],
  [4, 'corn~ū -ūs n', 'horn / рог'],
  [4, 'ver~ū -ūs n', 'spit, broach / вертел', {
    pl: { 3: 'ver~ibus/ver~ubus', 5: 'ver~ibus/ver~ubus' }
  }],

  [5, 'seri~ēs -ēī f', 'row, series / ряд, вереница'],
  [5, 'faci~ēs -ēī f', 'face / лицо'],
  [5, 'superfici~ēs -ēī f', 'surface / поверхность'],
  [5, 'di~ēs -ēī mf', 'day / день'],
  [5, 'merīdi~ēs -ēī m', 'noon / полдень'],
  [5, 'speci~ēs -ēī f', 'look / взгляд'],
  [5, 'aci~ēs -ēī f', 'sharp edge / остриё'],
  [5, 'effigi~ēs -ēī f', 'image, effigy / образ, подобие'],
  [5, 'ēluvi~ēs -ēī f', 'inundation; ravine / разлив; рытвина'],
  [5, 'glaci~ēs -ēī f', 'ice / лёд'],
  [5, 'pernici~ēs -ēī f [!pl]', 'ruin, bane / погибель'],
  [5, 'luxuri~ēs -ēī f [!pl]', 'luxury, luxuriance / роскошь'],
  [5, 'māteri~ēs -ēī f [!pl]', 'matter, substance / вещество, материя'],
  [5, 'rabi~ēs -ēī f [!pl]', 'rage, frenzy / бешенство'],
  [5, 'cari~ēs -ēī f [!pl]', 'decay / гниение'],
  [5, 'caesari~ēs -ēī f [!pl]', 'long hair, tresses / пышные волосы, кудри'],
  [5, 'r~ēs reī f', 'thing; matter / вещь; дело'],
  [5, 'sp~ēs -eī f', 'hope / надежда'],
  [5, 'fid~ēs -eī f [!pl]', 'trust, faith / вера, доверие'],
  [5, 'plēb~ēs -eī f [!pl]', 'common people / простой народ'],

  [6, 'ancill~a [1 f] bon~a [1 f]', 'good maiden / хорошая служанка'],
  [6, 'olīv~a [1 f] vir-ēns [3 -ent~is f v2c]', 'verdant olive / зеленеющая олива', {
    sg: { 5: 'olīv~ā virent~e' }
  }],
  [6, 'hort~us [2 m] amoen~us [2 m]', 'lovely garden / прелестный сад'],
  [6, 'ātri~um [2 n] rēgi~um [2 n]', 'regal hall / царский чертог'],
  [6, 'paradīs~us [2 m] terrestr~is [3 m v2c]', 'earthly paradise / земной рай'],
  [6, 'hom-ō [3 -in~is m] mendā-x [3 -c~is m v2c]', 'lying man / лживый человек'],
  [6, 'vectīg-al [3 -āl~is n] ing-ēns [3 -ent~is n v2c]', 'enormous tax / огромный налог'],
  [6, 'clāv~is [3 f] aēne~a [1 f]', 'copper key / медный ключ'],
  [6, 'lū-x [3 -c~is f] obscūr~a [1 f]', 'dusky light / сумеречный свет'],
  [6, 'secūr~is [3 f v2a] cruent~a [1 f]', 'blood-stained axe / окровавленная секира'],
  [6, 'pisc~is [3 m] rār~us [2 m]', 'rare fish / редкая рыба'],
  [6, 'p-ēs [3 -ed~is m] dex-ter [2 -tr~i m]', 'right foot / правая нога'],
  [6, 'sedīl~e [3 n] lapide~um [2 n]', 'stone seat / каменное седалище'],
  [6, 'conclāv~e [3 n] claus~um [2 n]', 'closed room / закрытая комната'],
  [6, 'exercit~us [4 m] magn~us [2 m]', 'big army / большое войско'],
  [6, 'text~us [4 m] Latīn~us [2 m]', 'Latin text / латинский текст'],
  [6, 'sēns~us [4 m] āc-er [3 -r~is m v2c]', 'keen sense / острое чувство'],
  [6, 'gel~ū [4 n] boreāl~e [3 n]', 'northern frost / северная стужа'],
  [6, 'glaci~ēs [5 f] lūbric~a [1 f]', 'slippery ice / скользкий лёд'],
  [6, 'r~ēs [5 f] molest~a [1 f]', 'unpleasant thing / неприятная вещь'],

  [7, 'ego', 'I / я', [
    ['ego', 'meī', 'mihi', 'mē', 'mē', 'ego'],
    [],
  ]],
  [7, 'tū', 'you (<b>sg</b>) / ты', [
    ['tū', 'tuī', 'tibi', 'tē', 'tē', 'tū'],
    [],
  ]],
  [7, 'nōs', 'we / мы', [
    [],
    ['nōs', 'nostrī/nostrum', 'nōbīs', 'nōs', 'nōbīs', 'nōs'],
  ]],
  [7, 'vōs', 'you (<b>pl</b>) / вы', [
    [],
    ['vōs', 'vestrī/vestrum', 'vōbīs', 'vōs', 'vōbīs', 'vōs'],
  ]],
  [7, 'is m [e]', 'this, that / этот, тот', {
    sg: { 2: 'e~ius' },
    pl: { 1: 'e~ī/i~ī', 3: 'e~īs/i~īs', 5: 'e~īs/i~īs' }
  }],
  [7, 'e~a f', 'this, that / эта, та', {
    sg: { 2: 'e~ius' },
    pl: { 3: 'e~īs/i~īs', 5: 'e~īs/i~īs' }
  }],
  [7, 'id n [e]', 'this, that / это, то', {
    sg: { 2: 'e~ius' },
    pl: { 3: 'e~īs/i~īs', 5: 'e~īs/i~īs' }
  }],
  [7, 'ill~e m', 'that / тот'],
  [7, 'ill~a f', 'that / та'],
  [7, 'ill~ud n', 'that / то'],
  [7, 'ist~e m', 'that of yours / этот твой'],
  [7, 'ist~a f', 'that of yours / эта твоя'],
  [7, 'ist~ud n', 'that of yours / это твоё'],
  [7, 'ips~e m', 'oneself / сам'],
  [7, 'ips~a f', 'oneself / сама'],
  [7, 'ips~um n', 'itself / само'],
  [7, 'h~ic m', 'this / этот', {
    sg: { 2: 'h~uius', 3: 'h~uic', 4: 'h~unc', 5: 'h~ōc' }
  }],
  [7, 'h~aec f', 'this / эта', {
    sg: { 2: 'h~uius', 3: 'h~uic', 4: 'h~anc', 5: 'h~āc' }
  }],
  [7, 'h~oc n', 'this / это', {
    sg: { 2: 'h~uius', 3: 'h~uic', 5: 'h~ōc' },
    pl: { 1: 'h~aec' }
  }],
  [7, 'qu~ī m', 'who, that / который', {
    sg: { 2: 'cu~ius', 3: 'cu~i', 4: 'qu~em' },
    pl: { 3: 'qu~ibus', 5: 'qu~ibus' }
  }],
  [7, 'qu~ae f', 'who, that / которая', {
    sg: { 2: 'cu~ius', 3: 'cu~i' },
    pl: { 3: 'qu~ibus', 5: 'qu~ibus' }
  }],
  [7, 'qu~od n', 'which, that / которое', {
    sg: { 2: 'cu~ius', 3: 'cu~i' },
    pl: { 1: 'qu~ae', 3: 'qu~ibus', 5: 'qu~ibus' }
  }],
  [7, 'qu~is m', 'who? / кто?', {
    sg: { 2: 'cu~ius', 3: 'cu~i', 4: 'qu~em' },
    pl: { 3: 'qu~ibus', 5: 'qu~ibus' }
  }],
  [7, 'qu~id n', 'what? / что?', {
    sg: { 2: 'cu~ius', 3: 'cu~i' },
    pl: { 1: 'qu~ae', 3: 'qu~ibus', 5: 'qu~ibus' }
  }],
  [7, 'alter m', '(an)other / другой'],
  [7, 'alter~a f', '(an)other / другая'],
  [7, 'alter~um n', '(an)other / другое'],
  [7, 'ali~us m', 'other / другой', {
    sg: { 2: 'alter~īus', 3: 'ali~ī/ali~ō' }
  }],
  [7, 'ali~a f', 'other / другая', {
    sg: { 2: 'alter~īus', 3: 'ali~ī/ali~ae' }
  }],
  [7, 'ali~ud n', 'other / другое', {
    sg: { 2: 'alter~īus', 3: 'ali~ī/ali~ō' }
  }],
  [7, 'uter m [utr]', 'which or either (of two) / который или какой-л. (из двух)'],
  [7, 'utr~a f', 'which or either (of two) / которая или какая-л. (из двух)'],
  [7, 'utr~um n', 'which or either (of two) / которое или какое-л. (из двух)'],
  [7, 'neuter m [neutr]', 'neither (of two) / ни тот ни другой, ни один (из двух)'],
  [7, 'neutr~a f', 'neither (of two) / ни та ни другая, ни одна (из двух)'],
  [7, 'neutr~um n', 'neither (of two) / ни то ни другое, ни одно (из двух)'],

  [8, 'ūn~us m [2#]', 'one / один', {
    sg: { 2: 'ūn~īus', 3: 'ūn~ī' }
  }],
  [8, 'ūn~a f [1#]', 'one / одна', {
    sg: { 2: 'ūn~īus', 3: 'ūn~ī' }
  }],
  [8, 'ūn~um n [2#]', 'one / одно', {
    sg: { 2: 'ūn~īus', 3: 'ūn~ī' }
  }],
  [8, 'du~o m [2]', 'two / два', {
    pl: { 3: 'du~ōbus', 5: 'du~ōbus' }
  }],
  [8, 'du~ae f [1]', 'two / две', {
    pl: { 3: 'du~ābus', 5: 'du~ābus' }
  }],
  [8, 'du~o n [2]', 'two / два', {
    pl: { 3: 'du~ōbus', 5: 'du~ōbus' }
  }],
  [8, 'tr~ēs m [3 v2c]', 'three / три'],
  [8, 'tr~ēs f [3 v2c]', 'three / три'],
  [8, 'tr~ia n [3 v1]', 'three / три'],
  [8, 'ducent~ī m [2]', 'two hundred / двести'],
  [8, 'ducent~ae f [1]', 'two hundred / двести'],
  [8, 'ducent~a n [2]', 'two hundred / двести'],
  [8, 'trecent~ī m [2]', 'three hundred / триста'],
  [8, 'trecent~ae f [1]', 'three hundred / триста'],
  [8, 'trecent~a n [2]', 'three hundred / триста'],
  [8, 'mīl~ia n [3 v1]', 'thousand(s) / тысяч(и)'],
];
