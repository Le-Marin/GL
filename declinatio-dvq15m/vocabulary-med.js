const VOCABULARY_MED = [
  [1, 'cost~a -ae f', 'rib / ребро'],
  [1, 'āl~a -ae f', 'wing / крыло'],
  [1, 'aort~a -ae f', 'aorta / аорта'],
  [1, 'clāvicul~a -ae f', 'collar-bone / ключица'],
  [1, 'maxill~a -ae f', '(upper) jaw / (верхняя) челюсть'],
  [1, 'tōnsill~a -ae f', 'tonsil / миндалина'],
  [1, 'foss~a -ae f', 'pit, groove / ямка, углубление'],
  [1, 'glandul~a -ae f', 'gland / железá'],
  [1, 'vēsīc~a -ae f', 'bladder / пузырь'],
  [1, 'palpebr~a -ae f', 'eyelid / веко'],
  [1, 'frāctūr~a -ae f', 'fracture / перелом'],
  [1, 'scapul~a -ae f', 'shoulder blade / лопатка'],
  [1, 'vertebr~a -ae f', 'vertebra / позвонок'],
  [1, 'cyst~a -ae f', 'cyst / киста'],
  [1, 'allergi~a -ae f', 'allergy / аллергия'],
  [1, 'pneumoni~a -ae f [!pl]', 'pneumonia / пневмония'],
  [1, 'gutt~a -ae f', 'drop / капля'],
  [1, 'gemma~a -ae f', 'bud, burgeon / почка (растения)'],
  [1, 'herb~a -ae f', 'herb / трава'],
  [1, 'Menth~a -ae f [!pl]', 'mint / мята'],

  [2, 'coll~um -ī n', 'neck / шея'],
  [2, 'cili~um -ī n', 'eyelash / ресница'],
  [2, 'ligāment~um -ī n', 'ligament / связка'],
  [2, 'ole~um -ī n', 'oil / масло'],
  [2, 'antidot~um -ī n', 'antidote / противоядие'],
  [2, 'medicāment~um -ī n', 'medicine / лекарство'],
  [2, 'gangli~on -ī n', 'ganglion / ганглий, нервный узел'],
  [2, 'encephal~on -ī n', 'encephalon / головной мозг'],
  [2, 'vīr~us -ī n', 'venom; virus / яд; вирус'],
  [2, 'digit~us -ī m', 'finger / палец'],
  [2, 'ocul~us -ī m', 'eye / глаз'],
  [2, 'ventricul~us -ī m', 'ventricle / желудочек'],
  [2, 'lob~us -ī m', 'lobe / доля'],
  [2, 'morb~us -ī m', 'disease / болезнь, заболевание'],
  [2, 'spasm~us -ī m', 'spasm / спазм(а)'],
  [2, 'icter~us -ī m [!pl]', 'jaundice / желтуха'],
  [2, 'Sorb~us -ī f', 'sorb, rowan / рябина'],
  [2, 'Ricin~us -ī f', 'castor oil plant / клещевина'],
  [2, 'can-cer -cr~ī m [!pl]', 'cancer / рак, раковая опухоль'],
  [2, 'morbill~ī -ōrum m [!sg]', 'measles / корь'],

  [3, 'cavit-ās -āt~is f', 'cavity / полость, впадина'],
  [3, 'rād-īx -īc~is f', 'root / корень'],
  [3, 'solūti-ō -ōn~is f', 'solution / раствор'],
  [3, 'cort-ex -ic~is m', 'cortex; bark / кора'],
  [3, 'pari-ēs -et~is m', 'paries, wall / стенка'],
  [3, 'flō-s flōr~is m', 'flower / цветок'],
  [3, 'rēn rēn~is m', 'kidney / почка'],
  [3, 'traum-a -at~is n', 'trauma / травма'],
  [3, 'tub-er -er~is n', 'protuberance / бугорок'],
  [3, 'corp-us -or~is n', 'body / тело'],
  [3, 'vās vās~is n', 'vessel / сосуд', {
    pl: { 2: 'vās~ōrum', 3: 'vās~īs', 5: 'vās~īs' }
  }],
  [3, 'pūb~ēs -is f', 'pubis, pubic bone / лобок, лобковая кость'],
  [3, 'aur~is -is f', 'ear / ухо'],
  [3, 'par-s part~is f', 'part / часть'],
  [3, 'o-s oss~is n', 'bone / кость'],
  [3, 'cor- cord~is n', 'heart / сердце', {
    pl: { 2: 'cord~um/cord~ium' }
  }],
  [3, 'calc-ar -ār~is n', 'spur-like projection / шпора'],
  [3, 'rēt~e -is n', 'net / сеть'],
  [3, 'bas~is -is f [v2a]', 'base, foundation / основание'],
  [3, 'dos~is -is f [v2a]', 'dose / доза'],

  [4, 'cās~us -ūs m', 'case / случай'],
  [4, 'sēns~us -ūs m', 'sense / чувство'],
  [4, 'abscess~us -ūs m', 'abscess / абсцесс, гнойник'],
  [4, 'dēcubit~us -ūs m', 'decubitus ulcer / пролежень'],
  [4, 'dēfect~us -ūs m', 'defect / дефект'],
  [4, 'prōcess~us -ūs m', 'process, projection / отросток'],
  [4, 'sin~us -ūs m', 'sinus / пазуха'],
  [4, 'plex~us -ūs m', 'plexus / сплетение'],
  [4, 'arc~us -ūs m', 'arch / дуга'],
  [4, 'meāt~us -ūs m', 'passage / проход'],
  [4, 'stāt~us -ūs m', 'state / состояние'],
  [4, 'abort~us -ūs m', 'abortion, miscarriage / аборт, выкидыш'],
  [4, 'frūct~us -ūs m', 'fruit / плод'],
  [4, 'spīrit~us -ūs m', 'spirits / спирт'],
  [4, 'part~us -ūs m [!pl]', '(child)birth / роды'],
  [4, 'vomit~us -ūs m [!pl]', 'vomit(ing) / рвота'],
  [4, 'man~us -ūs f', 'hand / рука'],
  [4, 'Querc~us -ūs f', 'oak / дуб'],
  [4, 'gen~ū -ūs n', 'knee / колено'],
  [4, 'corn~ū -ūs n', 'horn / рог'],

  [5, 'faci~ēs -ēī f', 'face; surface / лицо; поверхность'],
  [5, 'superfici~ēs -ēī f', 'surface / поверхность'],
  [5, 'di~ēs -ēī mf', 'day / день'],
  [5, 'seri~ēs -ēī f', 'row, series / ряд, серия'],
  [5, 'aci~ēs -ēī f', 'sharp edge / остриё'],
  [5, 'glaci~ēs -ēī f', 'ice / лёд'],
  [5, 'speci~ēs -ēī f', 'species / вид, разновидность'],
  [5, 'māteri~ēs -ēī f [!pl]', 'matter, substance / вещество, материя'],
  [5, 'rabi~ēs -ēī f [!pl]', 'rabies / бешенство'],
  [5, 'scabi~ēs -ēī f [!pl]', 'scabies, itch / чесотка'],
  [5, 'cari~ēs -ēī f [!pl]', 'caries, decay / кариес, гниение'],
  [5, 'r~ēs reī f', 'thing; matter / вещь; дело'],

  [6, 'tunic~a [1 f] mūcōs~a [1 f]', 'mucous membrane / слизистая оболочка'],
  [6, 'dūr~a [1 f] mā-ter [3 -tr~is f]', 'dura mater / твёрдая мозговая оболочка', {
    pl: { 2: 'dūr~ārum mātr~um' }
  }],
  [6, 'bol~us [2 f !pl] alb~a [1 f !pl]', 'white clay / белая глина'],
  [6, 'extract~um [2 n] fluid~um [2 n]', 'fluid extract / жидкий экстракт'],
  [6, 'acid~um [2 n !pl] arsenic~um [2 n !pl]', 'arsenic acid / мышьяковая кислота'],
  [6, 'muscul~us [2 m] levāt-or [3 -ōr~is m]', 'levator (muscle) / мышца-подниматель'],
  [6, 'o-s [3 oss~is n] temporāl~e [3 n]', 'temporal bone / височная кость'],
  [6, 'regi-ō [3 -ōn~is f] anteri-or [3 -ōr~is f con]', 'front region / передняя область'],
  [6, 'variet-ās [3 -āt~is f] rārissim~a [1 f]', 'rarest variety / редчайшая разновидность'],
  [6, 'sangu-is [3 -in~is m !pl] rec-ēns [3 -ent~is m v2c !pl]', 'fresh blood / свежая кровь'],
  [6, 'pelv~is [3 f v2a] rēnāl~is [3 f v2c]', 'renal pelvis / почечная лоханка'],
  [6, 'canāl~is [3 m] carotic~us [2 m]', 'carotid canal / сонный канал'],
  [6, 'p-ēs [3 ped~is m] sinis-ter [2 -tr~i m]', 'left foot / левая нога'],
  [6, 'sēm-en [3 -in~is n] amār~um [2 n]', 'bitter seed / горькое семя'],
  [6, 'text~us [4 m] osse~us [2 m]', 'bone tissue / костная ткань'],
  [6, 'duct~us [4 m] lymphatic~us [2 m]', 'lymphatic duct / лимфатический проток'],
  [6, 'exit~us [4 m] lētāl~is [3 m v2c]', 'fatal outcome / летальный исход'],
  [6, 'gen~ū [4 n] laes~um [2 n]', 'injured knee / повреждённое колено'],
  [6, 'faci~ēs [5 f] intern~a [1 f]', 'internal surface / внутренняя поверхность'],
  [6, 'cari~ēs [5 f !pl] chronic~a [1 f !pl]', 'chronic caries / хронический кариес'],
];