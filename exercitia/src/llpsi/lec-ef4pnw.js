$_GET({
  title: 'Lectio',
  keys: 'Á É Í Ó Ú Ý | Ā́ Ḗ Ī́ Ṓ Ū́ Ȳ́ Ǽ Œ́',
  html: /*html*/`
    <div class="row">
      <style>
        :root {--fft: "Times New Roman", Times, serif;}
        .keyboard__body {min-width: 100%; display: none; flex-direction: column; row-gap: 2px; order: 1;}
        .keyboard__body.__shown {display: flex;}
        .keyboard__key {font-family: var(--fft);}
        .area {font-family: var(--fft); font-size: .9em;}
        .row {line-height: 1.4;}
        #tip {font-family: var(--fft);}
      </style>
      <div><b>Разделить на слоги, проставить ударения, прочитать.</b></div>
      <div><br></div>
      <div style="pointer-events: none;"><i>Exemplum</i>:<span style="white-space: pre;">	</span>vorāgō <div class="area" tabindex="-1">водоворот</div> →</div>
      <div style="pointer-events: none;"><span style="white-space: pre;">			</span>vorāgō <div class="area" tabindex="-1">vo-rā́-gō</div></div>
      <div><br></div>
      <div><span style="white-space: pre;">	</span>I</div>
      <div><br></div>
      <div>Phrygia <div class="area" data-key="Phrý-gi-a">Фригия</div></div>
      <div>proelium <div class="area" data-key="prœ́-li-um">битва</div></div>
      <div>iānua <div class="area" data-key="iā́-nu-a">дверь</div></div>
      <div>Latium <div class="area" data-key="Lá-ti-um">Лаций</div></div>
      <div>Aegyptus <div class="area" data-key="Ae-gýp-tus">Египет</div></div>
      <div>triumphus <div class="area" data-key="tri-úm-phus">триумф</div></div>
      <div>honestus <div class="area" data-key="ho-nés-tus">честный</div></div>
      <div>aeternus <div class="area" data-key="ae-tér-nus">вечный</div></div>
      <div>December <div class="area" data-key="De-cém-ber">декабрь</div></div>
      <div>propinquus <div class="area" data-key="pro-pín-quus">близкий</div></div>
      <div>Minerva <div class="area" data-key="Mi-nér-va">Минерва</div></div>
      <div>Daedalus <div class="area" data-key="Dǽ-da-lus">Дедал</div></div>
      <div>Germānus <div class="area" data-key="Ger-mā́-nus">германец</div></div>
      <div>Euboea <div class="area" data-key="Eu-bœ́-a">Эвбея <i>(остров в Эгейском море)</i></div></div>
      <div>syllaba <div class="area" data-key="sýl-la-ba">слог</div></div>
      <div>cerebrum <div class="area" data-key="cé-re-brum">мозг</div></div>
      <div>dēclārō <div class="area" data-key="dē-clā́-rō">объявляю</div></div>
      <div>Caucasus <div class="area" data-key="Cáu-ca-sus">Кавказ</div></div>
      <div>Ноmērus <div class="area" data-key="Ho-mḗ-rus">Гомер</div></div>
      <div>Cicerō <div class="area" data-key="Cí-ce-rō">Цицерон</div></div>
      <div>Аthēnае <div class="area" data-key="A-thḗ-nae">Афины</div></div>
      <div>poētа <div class="area" data-key="po-ḗ-ta">поэт</div></div>
      <div>māchinа <div class="area" data-key="mā́-chi-na">механизм, машина</div></div>
      <div>aquila <div class="area" data-key="á-qui-la">орёл</div></div>
      <div>amīca <div class="area" data-key="a-mī́-ca">подруга</div></div>
      <div>candidus <div class="area" data-key="cán-di-dus">белоснежный</div></div>
      <div>occidō <div class="area" data-key="óc-ci-dō">падаю</div></div>
      <div>occīdō <div class="area" data-key="oc-cī́-dō">убиваю</div></div>
      <div>Iuppiter <div class="area" data-key="Iúp-pi-ter">Юпитер</div></div>
      <div>incola <div class="area" data-key="ín-co-la">житель</div></div>
      <div>saeculum <div class="area" data-key="sǽ-cu-lum">век</div></div>
      <div>iūstitia <div class="area" data-key="iūs-tí-ti-a">правосудие</div></div>
      <div>symphōnia <div class="area" data-key="sym-phṓ-ni-a">гармония</div></div>
      <div>adverbium <div class="area" data-key="ad-vér-bi-um">наречие</div></div>
      <div>argūmentum <div class="area" data-key="ar-gū-mén-tum">довод</div></div>
      <div>elephantus <div class="area" data-key="e-le-phán-tus">слон</div></div>
      <div>labyrinthus <div class="area" data-key="la-by-rín-thus">лабиринт</div></div>
      <div>ōceanus <div class="area" data-key="ō-cé-a-nus">океан</div></div>
      <div>Dēmosthenēs <div class="area" data-key="Dē-mós-the-nēs">Демосфен</div></div>
      <div>Dēmocritus <div class="area" data-key="Dē-mó-cri-tus">Демокрит</div></div>
      <div>Epicūrus <div class="area" data-key="E-pi-cū́-rus">Эпикур</div></div>
      <div>Thermopylae <div class="area" data-key="Ther-mó-py-lae">Фермопилы</div></div>
      <div><br></div>
      <div><span style="white-space: pre;">	</span>II</div>
      <div><br></div>
      <div><div>Patroclus <div class="area" data-key="Pá-tro-clus">Патрокл</div></div>
      <div>Achillēs <div class="area" data-key="A-chíl-lēs">Ахилл</div></div>
      <div>ligneus <div class="area" data-key="líg-ne-us">деревянный</div></div>
      <div>lagoena <div class="area" data-key="la-gœ́-na">бутыль</div></div>
      <div>pōculum <div class="area" data-key="pṓ-cu-lum">бокал, чаша</div></div>
      <div>hirundō <div class="area" data-key="hi-rún-dō">ласточка</div></div>
      <div>tribūnus <div class="area" data-key="tri-bū́-nus">трибун</div></div>
      <div>Eumenidēs <div class="area" data-key="Eu-mé-ni-dēs">эвмениды (фурии)</div></div>
      <div>aurōra <div class="area" data-key="au-rṓ-ra">заря</div></div>
      <div>angustiae <div class="area" data-key="an-gús-ti-ae">ущелье</div></div>
      <div>Gnaeus <div class="area" data-key="Gnǽ-us">Гней</div></div>
      <div>imperātōrēs <div class="area" data-key="im-pe-rā-tṓ-rēs">императоры</div></div>
      <div>mercātūra <div class="area" data-key="mer-cā-tū́-ra">торговля</div></div>
      <div>kalendae <div class="area" data-key="ka-lén-dae">калéнды (1-й день мемяца)</div></div>
      <div>philosophus <div class="area" data-key="phi-ló-so-phus">философ</div></div>
      <div>equus <div class="area" data-key="é-quus">конь</div></div>
      <div>Actaeōn <div class="area" data-key="Ac-tǽ-ōn">Актеон</div></div>
      <div>Pyrrhus <div class="area" data-key="Pýr-rhus">Пирр</div></div>
      <div>Carthāgō <div class="area" data-key="Car-thā́-gō">Карфаген</div></div>
      <div>bellicōsus <div class="area" data-key="bel-li-cṓ-sus">воинственный</div></div>
      <div>iūdicium <div class="area" data-key="iū-dí-ci-um">суд, суждение</div></div>
      <div>pulcherrimus <div class="area" data-key="pul-chér-ri-mus">красивейший</div></div>
      <div>āvertere <div class="area" data-key="ā-vér-te-re">отводить, отвращать</div></div>
      <div>arcēre <div class="area" data-key="ar-cḗ-re">удерживать, препятствовать</div></div>
      <div>tempestās <div class="area" data-key="tem-pés-tās">буря, непогода</div></div>
      <div>Aeolus <div class="area" data-key="Ǽ-o-lus">Эóл</div></div>
      <div>procella <div class="area" data-key="pro-cél-la">буря, шторм</div></div>
      <div>intereā <div class="area" data-key="in-té-re-ā">между тем</div></div>
      <div>Aenēās <div class="area" data-key="Ae-nḗ-ās">Эней</div></div>
      <div>Rōmānī <div class="area" data-key="Rō-mā́-nī">римляне</div></div>
      <div>mulierēs <div class="area" data-key="mu-lí-e-rēs">женщины</div></div>
      <div>amphora <div class="area" data-key="ám-pho-ra">амфора</div></div>
      <div>Hannibal <div class="area" data-key="Hán-ni-bal">Ганнибал</div></div>
      <div>Scīpiō <div class="area" data-key="Scī́-pi-ō">Сципион</div></div>
      <div>ex foedere <div class="area" data-key="ex fœ́-de-re">по договору</div></div>
      <div>Corinthus <div class="area" data-key="Co-rín-thus">Коринф</div></div>
    </div>
  `
});

(function() {
  'use strict';

  document.addEventListener('focusin', clearValue);

  window.addEventListener('hashchange', function route(e) {
    this.removeEventListener(e.type, route);
    document.removeEventListener('focusin', clearValue);
  });

  function clearValue(e) {
    const trg = e.target;
    if (!trg.matches('.area') || trg.__isInterracted) return;

    trg.__isInterracted = true;
    trg.textContent = '';
  }
})();
