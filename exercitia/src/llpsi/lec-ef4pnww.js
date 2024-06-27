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
      <div><b>1. Выделить ударный слог.</b></div>
      <div><br></div>
      <div style="pointer-events: none;"><i>Exemplum</i>:<span style="white-space: pre;"> </span>vorāgō <div class="area" tabindex="-1">водоворот</div> →</div>
      <div style="pointer-events: none;"><span style="white-space: pre;">     </span>vorāgō <div class="area" tabindex="-1">rā</div></div>
      <div><br></div>
      <div>Аthēnае <div class="area" data-key="thē">Афины</div></div>
      <div>māchinа <div class="area" data-key="mā">механизм, машина</div></div>
      <div>aquila <div class="area" data-key="a">орёл</div></div>
      <div>candidus <div class="area" data-key="can">белоснежный</div></div>
      <div>occidō <div class="area" data-key="oc">падаю</div></div>
      <div>occīdō <div class="area" data-key="cī">убиваю</div></div>
      <div>Iuppiter <div class="area" data-key="Iup">Юпитер</div></div>
      <div>incola <div class="area" data-key="in">житель</div></div>
      <div>saeculum <div class="area" data-key="sae">век</div></div>
      <div>symphōnia <div class="area" data-key="phō">гармония</div></div>
      <div>argūmentum <div class="area" data-key="men">довод</div></div>
      <div>ōceanus <div class="area" data-key="ce">океан</div></div>
      <div>Dēmosthenēs <div class="area" data-key="mos">Демосфен</div></div>
      <div>Dēmocritus <div class="area" data-key="mo">Демокрит</div></div>
      <div>Epicūrus <div class="area" data-key="cū">Эпикур</div></div>
      <div><br></div>
      <div><br></div>
      <div><b>2. Верно ли дано ударение и деление на слоги? Да (v) или нет (x).</b></div>
      <div><br></div>
      <div style="pointer-events: none;"><i>Exemplum</i>:<span style="white-space: pre;"> </span><b>vorāgō</b> <i>(водоворот)</i> : vo-rā́-gō : <div class="area" tabindex="-1">v</div></div>
      <div style="pointer-events: none;"><span style="white-space: pre;">     </span><b>vorāgō</b> <i>(водоворот)</i> : vo-rā-gṓ : <div class="area" tabindex="-1">x</div></div>
      <div><br></div>
      <div><span style="white-space: pre;"> </span>I</div>
      <div><br></div>
      <div><div><b>Patroclus</b> <i>(Патрокл)</i> : Pat-róc-lus : <div class="area" data-key="x"></div></div>
      <div><b>Achillēs</b> <i>(Ахилл)</i> : A-chíl-lēs : <div class="area" data-key="v"></div></div>
      <div><b>ligneus</b> <i>(деревянный)</i> : lig-neus : <div class="area" data-key="x"></div></div>
      <div><b>lagoena</b></b> <i>(бутыль)</i> : la-gó-e-na : <div class="area" data-key="x"></div></div>
      <div><b>pōculum</b> <i>(чаша)</i> : 'pṓ-cu-lum : <div class="area" data-key="v"></div></div>
      <div><b>hirundō</b> <i>(ласточка)</i> : hi-run-dṓ : <div class="area" data-key="x"></div></div>
      <div><b>Eumenidēs</b> <i>(эвмениды, фурии)</i> : Eu-me-ní-dēs : <div class="area" data-key="x"></div></div>
      <div><b>aurōra</b> <i>(заря)</i> : au-rṓ-ra : <div class="area" data-key="v"></div></div>
      <div><b>angustiae</b> <i>(ущелье)</i> : an-gús-tiae : <div class="area" data-key="x"></div></div>
      <div><b>Gnaeus</b> <i>(Гней)</i> : Gnǽ-us : <div class="area" data-key="v"></div></div>
      <div><b>mercātūra</b> <i>(торговля)</i> : mer-cā-tū́-ra : <div class="area" data-key="v"></div></div>
      <div><b>equus</b> <i>(конь)</i> : e-qu-us : <div class="area" data-key="x"></div></div>
      <div><b>Actaeōn</b> <i>(Актеон)</i> : Ac-tǽ-ōn : <div class="area" data-key="v"></div></div>
      <div><b>Aenēās</b> <i>(Эней)</i> : Ae-nēās : <div class="area" data-key="x"></div></div>
      <div><b>Pyrrhus</b> <i>(Пирр)</i> : Pyrr-hus : <div class="area" data-key="x"></div></div>
      <div><br></div>
      <div><br></div>
      <div><b>3. Разделить на слоги, проставить ударения, прочитать.</b></div>
      <div><br></div>
      <div style="pointer-events: none;"><i>Exemplum</i>:<span style="white-space: pre;">	</span>vorāgō <div class="area" tabindex="-1">водоворот</div> →</div>
      <div style="pointer-events: none;"><span style="white-space: pre;">			</span>vorāgō <div class="area" tabindex="-1">vo-rā́-gō</div></div>
      <div><br></div>
      <div><span style="white-space: pre;">	</span>I</div>
      <div><br></div>
      <div>Phrygia <div class="area" data-key="Phrý-gi-a">Фригия</div></div>
      <div>proelium <div class="area" data-key="prœ́-li-um">битва</div></div>
      <div>iānua <div class="area" data-key="iā́-nu-a">дверь</div></div>
      <div>Aegyptus <div class="area" data-key="Ae-gýp-tus">Египет</div></div>
      <div>triumphus <div class="area" data-key="tri-úm-phus">триумф</div></div>
      <div>honestus <div class="area" data-key="ho-nés-tus">честный</div></div>
      <div>propinquus <div class="area" data-key="pro-pín-quus">близкий</div></div>
      <div>Daedalus <div class="area" data-key="Dǽ-da-lus">Дедал</div></div>
      <div>Germānus <div class="area" data-key="Ger-mā́-nus">германец</div></div>
      <div>Euboea <div class="area" data-key="Eu-bœ́-a">Эвбея <i>(остров в Эгейском море)</i></div></div>
      <div>syllaba <div class="area" data-key="sýl-la-ba">слог</div></div>
      <div>cerebrum <div class="area" data-key="cé-re-brum">мозг</div></div>
      <div>dēclārō <div class="area" data-key="dē-clā́-rō">объявляю</div></div>
      <div>Caucasus <div class="area" data-key="Cáu-ca-sus">Кавказ</div></div>
      <div>Cicerō <div class="area" data-key="Cí-ce-rō">Цицерон</div></div>
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
