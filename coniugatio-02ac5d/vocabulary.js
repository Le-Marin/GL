const VOCABULARY = [
  [1, 'aedific~āre', 'build / строить'],
  [1, 'am~āre', 'love / любить'],
  [1, 'cant~āre', 'sing / петь'],
  [1, 'clām~āre', 'cry, shout / кричать'],
  [1, 'iter~āre', 'repeat / повторять'],
  [1, 'lev~āre', 'elevate / поднимать, повышать'],
  [1, 'nōmin~āre', 'name / называть'],
  [1, 'numer~āre', 'count / считать'],
  [1, 'rog~āre', 'ask / спрашивать'],
  [1, 'salūt~āre', 'greet / приветствовать'],
  [1, 'serv~āre', 'save / спасать'],
  [1, 'voc~āre', 'call / звать'],
  [1, 'sec~ō -u~ī sect~um -āre', 'cut / резать'],
  [1, 'vet~ō -u~ī -it~um -āre', 'prohibit / запрещать'],

  [2, 'arc~ēre', 'hold off / (у, с)держивать'],
  [2, 'hab~ēre', 'have / иметь'],
  [2, 'terr~ēre', 'terrify / устрашать'],
  [2, 'compl~eō -ēv~ī -ēt~um -ēre', 'fill up / заполнять'],
  [2, 'dēl~eō -ēv~ī -ēt~um -ēre', 'destroy / уничтожать'],
  [2, 'fov~eō fōv~ī fōt~um -ēre', 'keep warm / согревать'],
  [2, 'misc~eō -u~ī mixt~um -ēre', 'mix / смешивать'],
  [2, 'mon~ēre', 'advise, admonish / уговаривать, предупреждать'],
  [2, 'mov~eō mōv~ī mōt~um -ēre', 'move / двигать'],
  [2, 'respond~eō respond~ī respōns~um -ēre', 'answer / отвечать'],
  [2, 'ten~eō -u~ī tent~um -ēre', 'hold / держать'],
  [2, 'con-tin~eō -tinu~ī -tent~um -ēre', 'contain / содержать'],
  [2, 'terg~eō ters~ī ters~um -ēre', 'wipe / протирать'],
  [2, 'torr~eō -u~ī tost~um -ēre', 'dry, parch / сушить, жечь'],
  [2, 'vid~eō vīd~ī vīs~um -ēre', 'see / видеть'],

  [3.1, 'ag~ō ēg~ī āct~um -ere', 'do / делать'],
  [3.1, 'cern~ō crēv~ī crēt~um -ere', 'discern / различать, замечать'],
  [3.1, 'crēd~ō crēdid~ī -it~um -ere', 'believe / верить'],
  [3.1, 'em~ō ēm~ī ēmpt~um -ere', 'buy / покупать'],
  [3.1, 'fall~ō fefell~ī fals~um -ere', 'deceive / обманывать'],
  [3.1, 'ger~ō gess~ī gest~um -ere', 'carry; wear / носить'],
  [3.1, 'lūd~ō lūs~ī lūs~um -ere', 'play / играть'],
  [3.1, 'pell~ō pepul~ī puls~um -ere', 'drive away / гнать, прогонять'],
  [3.1, 'sūm~ō sūmps~ī sūmpt~um -ere', 'take / брать'],
  [3.1, 'toll~ō sustul~ī sublāt~um -ere', 'lift, raise / поднимать'],
  [3.1, 'veh~ō vex~ī vect~um -ere', 'carry, convey / нести, везти'],
  [3.1, 'verr~ō verr~ī vers~um -ere', 'sweep / мести, подметать'],
  [3.1, 'vert~ō vers~ī vers~um -ere', 'turn / вертеть, поворачивать'],
  [3.1, 'dīc~ō dīx~ī dict~um -ere', 'say / говорить, сказать', {
    13: {
      sg: { 2: 'dīc' }
    }
  }],
  [3.1, 'dūc~ō dūx~ī duct~um -ere', 'lead / вести', {
    13: {
      sg: { 2: 'dūc' }
    }
  }],

  [3.2, 'al-lic~iō -lēx~ī -lēct~um -ere', 'draw, attract / привлекать, приманивать'],
  [3.2, 'a-spic~iō -spex~ī -spect~um -ere', 'look / глядеть'],
  [3.2, 'cōn-spic~iō -spex~ī -spect~um -ere', 'get sight of / заметить'],
  [3.2, 'cap~iō cēp~ī capt~um -ere', 'take, take hold of / брать, хватать'],
  [3.2, 'ac-cip~iō -cēp~ī -cept~um -ere', 'accept / принимать'],
  [3.2, 'cup~iō -īv~ī -īt~um -ere', 'desire, long for / желать, жаждать'],
  [3.2, 'iac~iō iēc~ī iact~um -ere', 'throw / кидать'],
  [3.2, 'ad-ic~iō -iēc~ī -iect~um -ere', 'add / добавлять'],
  [3.2, 'par~iō peper~ī part~um -ere', 'give birth / рож(д)ать'],
  [3.2, 'rap~iō -u~ī rapt~um -ere', 'seize; carry off / хватать; похищать'],
  [3.2, 'ē-rip~iō -ripu~ī -rept~um -ere', 'pull out / вырывать, выхватывать'],
  [3.2, 'af-fic~iō -fēc~ī -fect~um -ere', 'affect / причинять'],
  [3.2, 'cōn-fic~iō -fēc~ī -fect~um -ere', 'complete / завершать'],
  [3.2, 'inter-fic~iō -fēc~ī -fect~um -ere', 'kill / убивать'],
  [3.2, 'fac~iō fēc~ī fact~um -ere', 'make / делать', {
    13: {
      sg: { 2: 'fac' },
    }
  }],

  [4, 'aud~īre', 'hear; listen / слышать; слушать'],
  [4, 'fer~īre', 'strike, smite / ударять, поражать'],
  [4, 'fīn~īre', 'limit / ограничивать'],
  [4, 'lin~īre', 'smear / смазывать'],
  [4, 'moll~īre', 'soften / размягчать'],
  [4, 'mūn~īre', 'fortify / укреплять'],
  [4, 'pol~īre', 'polish / полировать'],
  [4, 'pūn~īre', 'punish / наказывать'],
  [4, 'sc~īre', 'know / знать'],
  [4, 'vest~īre', 'dress / одевать'],
  [4, 'haur~iō haus~ī haust~um -īre', 'draw; drink up / черпать; выпивать'],
  [4, 'oper~iō -u~ī opert~um -īre', 'cover / покрывать'],
  [4, 'sent~iō sēns~ī sēns~um -īre', 'feel, sense / чувствовать, ощущать'],
  [4, 'sepel~iō -īv~ī sepult~um -īre', 'bury, inter / хоронить, погребать'],
  [4, 'vinc~iō vīnx~ī vīnct~um -īre', 'tie, bind / связывать, сковывать'],

  [5, 'sum fu~ī esse(3.1)', 'be / быть', {
    1: [
      ['su~m', 'es', 'es~t'],
      ['su~mus', 'es~tis', 'su~nt'],
    ],
    3: [
      ['er^a~m', 'er^ā~s', 'er^a~t'],
      ['er^ā~mus', 'er^ā~tis', 'er^a~nt'],
    ],
    5: [
      ['er~ō', 'er:i~s', 'er:i~t'],
      ['er:i~mus', 'er:i~tis', 'er:u~nt'],
    ],
    13: {
      sg: { 2: 'es' },
      pl: { 2: 'es~te' }
    },
    15: {
      sg: { 2: 'es~tō', 3: 'es~tō' },
      pl: { 2: 'es~tōte', 3: 'su~ntō' }
    },
    17: [
      ['si~m', 'sī~s', 'si~t'],
      ['sī~mus', 'sī~tis', 'si~nt'],
    ]
  }],
  [5, 'possum potu~ī posse(3.1)', 'can, may / мочь'],
  [5, 'e~ō i~ī it~um īre(4)', 'go / идти, ехать', {
    1: [
      ['e~ō', 'ī~s', 'i~t'],
      ['ī~mus', 'ī~tis', 'eu~nt'],
    ],
    3: [
      ['ī^ba~m', 'ī^bā~s', 'ī^ba~t'],
      ['ī^bā~mus', 'ī^bā~tis', 'ī^ba~nt'],
    ],
    5: [
      ['ī^b~ō', 'ī^b:i~s', 'ī^b:i~t'],
      ['ī^b:i~mus', 'ī^b:i~tis', 'ī^b:u~nt'],
    ],
    7: {
      sg: { 2: 'ī~stī' },
      pl: { 2: 'ī~stis' }
    },
    13: {
      sg: { 2: 'ī' },
      pl: { 2: 'ī~te' }
    },
    15: {
      sg: { 2: 'ī~tō', 3: 'ī~tō' },
      pl: { 2: 'ī~tōte', 3: 'eu~ntō' }
    },
    17: [
      ['ea~m', 'eā~s', 'ea~t'],
      ['eā~mus', 'eā~tis', 'ea~nt'],
    ],
    23: [
      ['īsse~m', 'īssē~s', 'īsse~t'],
      ['īssē~mus', 'īssē~tis', 'īsse~nt'],
    ]
  }],
  [5, 'vol~ō -u~ī velle(3.1)', 'want / хотеть', {
    1: {
      sg: { 2: 'vī~s', 3: 'vul~t/vol~t' },
      pl: { 1: 'vol:u~mus', 2: 'vul~tis/vol~tis', 3: 'vol:u~nt' }
    },
    17: {
      sg: { 1: 'vel^i~m', 2: 'vel^ī~s', 3: 'vel^i~t' },
      pl: { 1: 'vel^ī~mus', 2: 'vel^ī~tis', 3: 'vel^i~nt' }
    }
  }],
  [5, 'nōl~ō -u~ī nōlle(3.1)', 'not want / не хотеть', {
    1: {
      sg: { 2: 'nōn vī~s', 3: 'nōn vul~t' },
      pl: { 1: 'nōl:u~mus', 2: 'nōn vul~tis', 3: 'nōl:u~nt' }
    },
    13: {
      sg: { 2: 'nōl|ī' },
      pl: { 2: 'nōl|ī~te' }
    },
    15: {
      sg: { 2: 'nōl:i~tō', 3: 'nōl:i~tō' },
      pl: { 2: 'nōl:i~tōte', 3: 'nōl:u~ntō' }
    },
    17: {
      sg: { 1: 'nōl^i~m', 2: 'nōl^ī~s', 3: 'nōl^i~t' },
      pl: { 1: 'nōl^ī~mus', 2: 'nōl^ī~tis', 3: 'nōl^i~nt' }
    }
  }],
  [5, 'māl~ō -u~ī mālle(3.1)', 'prefer / предпочитать', {
    1: {
      sg: { 2: 'māvī~s', 3: 'māvul~t' },
      pl: { 1: 'māl:u~mus', 2: 'māvul~tis', 3: 'māl:u~nt' }
    },
    17: {
      sg: { 1: 'māl^i~m', 2: 'māl^ī~s', 3: 'māl^i~t' },
      pl: { 1: 'māl^ī~mus', 2: 'māl^ī~tis', 3: 'māl^i~nt' }
    }
  }],
  [5, 'ed~ō ēd~ī ēs~um edere/ēsse(3.1)', 'eat / есть, кушать', {
    1: {
      sg: { 2: 'ed:i~s/ēs', 3: 'ed:i~t/ēs~t' },
      pl: { 2: 'ed:i~tis/ēs~tis' }
    },
    2: {
      sg: { 3: 'ed:i~tur/ēs~tur' }
    },
    13: {
      sg: { 2: 'ed:e/ēs' },
      pl: { 2: 'ed:i~te/ēs~te' }
    },
    15: {
      sg: { 2: 'ed:i~tō/ēs~tō', 3: 'ed:i~tō/ēs~tō' },
      pl: { 2: 'ed:i~tōte/ēs~tōte' }
    }
  }],
  [5, 'fer~ō tul~ī lāt~um ferre(3.1)', 'carry / носить, нести', {
    1: {
      sg: { 2: 'fer~s', 3: 'fer~t' },
      pl: { 2: 'fer~tis' }
    },
    2: {
      sg: { 2: 'fer~ris', 3: 'fer~tur' }
    },
    13: {
      sg: { 2: 'fer' },
      pl: { 2: 'fer~te' }
    },
    14: {
      sg: { 2: 'fer~re' }
    },
    15: {
      sg: { 2: 'fer~tō', 3: 'fer~tō' },
      pl: { 2: 'fer~tōte' }
    },
    16: {
      sg: { 2: 'fer~tor', 3: 'fer~tor' },
    }
  }],

  [6, 'arbitr~ārī(1)', 'consider, suppose / считать, полагать'],
  [6, 'cōnsōl~ārī(1)', 'comfort / утешать'],
  [6, 'mīr~ārī(1)', 'marvel, be amazed / дивиться, удивляться'],
  [6, 'intu~ērī(2)', 'look, stare / пристально глядеть, всматриваться'],
  [6, 'pollic~ērī(2)', 'promise / обещать'],
  [6, 'ver~ērī(2)', 'dread; revere / опасаться; чтить'],
  [6, 'loqu~or locūt~um -ī(3.1)', 'speak, talk / говорить, разговаривать'],
  [6, 'quer~or quest~um -ī(3.1)', 'complain / жаловаться'],
  [6, 'ūt~or ūs~um -ī(3.1)', 'use / пользоваться'],
  [6, 'ē-gred~ior -gress~um -ī(3.2)', 'come out, step out / выходить, выступать'],
  [6, 'mor~ior mortu~um -ī(3.2)', 'die / умирать'],
  [6, 'pat~ior pass~um -ī(3.2)', 'endure, suffer / терпеть, претерпевать'],
  [6, 'ex-per~ior -pert~um -īrī(4)', 'try, experience / пробовать, испытывать'],
  [6, 'opper~īrī(4)', 'wait for / ждать, дожидаться'],
  [6, 'ment~īrī(4)', 'lie, tell lies about / лгать, выдумывать'],
  [6, 'f~īō fact~um fier~ī(3.2)', 'become / становиться', {
    1: {
      sg: { 3: 'f|i~t' }
    },
    13: {
      sg: { 2: 'f|ī' }
    }
  }],
];
