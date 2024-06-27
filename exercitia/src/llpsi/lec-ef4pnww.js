$_GET({
  title: 'Lectio (new)',
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
      <div><div><b>1. Выделить ударный слог.</b></div>
      <div><br><i>Exemplum</i>:<span style="white-space: pre;">	</span>vorāgō <i>(водоворот)</i> : <div class="area">rā</div><br><br><font face="var(--fft)">Аthēnае </font><i>(Афины)</i> : <div class="area" data-key="thē"></div><br></div>
      <div>māchinа <i>(механизм, машина)</i> : <div class="area" data-key="mā"></div></div>
      <div>aquila <i>(орёл)</i> : <div class="area" data-key="a"></div></div>
      <div>candidus <i>(белоснежный)</i> : <div class="area" data-key="can"></div></div>
      <div>occidō <i>(падаю)</i> : <div class="area" data-key="oc"></div></div>
      <div>occīdō <i>(убиваю)</i> : <div class="area" data-key="cī"></div></div>
      <div>Iuppiter <i>(Юпитер)</i> : <div class="area" data-key="Iup"></div></div>
      <div>incola <i>(житель)</i> : <div class="area" data-key="in"></div></div>
      <div>saeculum <i>(век)</i> : <div class="area" data-key="sae"></div></div>
      <div>symphōnia <i>(гармония)</i> : <div class="area" data-key="phō"></div></div>
      <div>argūmentum <i>(довод)</i> : <div class="area" data-key="men"></div></div>
      <div>ōceanus <i>(океан)</i> : <div class="area" data-key="ce"></div></div>
      <div>Dēmosthenēs <i>(Демосфен)</i> : <div class="area" data-key="mos"></div></div>
      <div>Dēmocritus <i>(Демокрит)</i> : <div class="area" data-key="mo"></div></div>
      <div>Epicūrus <i>(Эпикур)</i> : <div class="area" data-key="cū"></div></div></div>
    </div>
    <div class="row">
      <div><b>2. Верно ли дано ударение и деление на слоги? Да</b> (v) <b>или нет</b> (x).<br><br><div><i>Exemplum</i>:<span style="white-space: pre;">	</span><b>vorāgō </b><i>(водоворот)</i> : <span class="cb">vo-rā́-gō</span> : <div class="area">v</div></div>
      <div><span style="white-space: pre;">			</span><b>vorāgō </b><i>(водоворот)</i> : <span class="cb"></span>vo-rā-gṓ : <div class="area">x</div></div><br><b>Patroclus</b> <i>(Патрокл)</i> : <span class="cb">Pat-róc-lus</span> : <div class="area" data-key="x"></div></div>
      <div><b>Achillēs</b> <i>(Ахилл)</i> : <span class="cb">A-chíl-lēs</span> : <div class="area" data-key="v"></div></div>
      <div><b>ligneus</b> <i>(деревянный)</i> : <span class="cb">lig-neus</span> : <div class="area" data-key="x"></div></div>
      <div><b>lagoena</b> <i>(бутыль)</i> : <span class="cb">la-gó-e-na</span> : <div class="area" data-key="x"></div></div>
      <div><b>pōculum</b> <i>(чаша)</i> : <span class="cb">pṓ-cu-lum</span> : <div class="area" data-key="v"></div></div>
      <div><b>hirundō</b> <i>(ласточка)</i> : <span class="cb">hi-run-dṓ</span> : <div class="area" data-key="x"></div></div>
      <div><b>Eumenidēs</b> <i>(эвмениды, фурии)</i> : <span class="cb">Eu-me-ní-dēs</span> : <div class="area" data-key="x"></div></div>
      <div><b>aurōra</b> <i>(заря)</i> : <span class="cb">au-rṓ-ra</span> : <div class="area" data-key="v"></div></div>
      <div><b>angustiae</b> <i>(ущелье)</i> : <span class="cb">an-gús-tiae</span> : <div class="area" data-key="x"></div></div>
      <div><b>Gnaeus</b> <i>(Гней)</i> : <span class="cb">Gnǽ-us</span> : <div class="area" data-key="v"></div></div>
      <div><b>mercātūra</b> <i>(торговля)</i> : <span class="cb">mer-cā-tū́-ra</span> : <div class="area" data-key="v"></div></div>
      <div><b>equus</b> <i>(конь)</i> : <span class="cb">é-qu-us</span> : <div class="area" data-key="x"></div></div>
      <div><b>Actaeōn</b> <i>(Актеон)</i> : <span class="cb">Ac-tǽ-ōn</span> : <div class="area" data-key="v"></div></div>
      <div><b>Aenēās</b> <i>(Эней)</i> : <span class="cb">Ae-nḗ-ās</span> : <div class="area" data-key="v"></div></div>
      <div><b>Pyrrhus</b> <i>(Пирр)</i> : <span class="cb">Pyrr-hus</span> : <div class="area" data-key="x"></div><br><br></div>
    </div>
    <div class="row">
      <div><b>3. Разделить на слоги, проставить ударения.</b></div>
      <div><br></div>
      <div><i>Exemplum</i>:<span style="white-space: pre;">	</span>vorāgō (водоворот) : <div class="area">vō-rā́-gō</div></div>
      <div><br></div>
      <div>Phrygia <i>(Фригия)</i> : <div class="area" data-key="Phrý-gi-a"></div></div>
      <div>proelium <i>(битва)</i> : <div class="area" data-key="prœ́-li-um"></div></div>
      <div>iānua <i>(дверь)</i> : <div class="area" data-key="iā́-nu-a"></div></div>
      <div>Aegyptus <i>(Египет)</i> : <div class="area" data-key="Ae-gýp-tus"></div></div>
      <div>triumphus <i>(триумф)</i> : <div class="area" data-key="tri-úm-phus"></div></div>
      <div>honestus <i>(честный)</i> : <div class="area" data-key="ho-nés-tus"></div></div>
      <div>propinquus <i>(близкий)</i> : <div class="area" data-key="pro-pín-quus"></div></div>
      <div>Daedalus <i>(Дедал)</i> : <div class="area" data-key="Dǽ-da-lus"></div></div>
      <div>Germānus <i>(германец)</i> : <div class="area" data-key="Ger-mā́-nus"></div></div>
      <div>Euboea <i>(Эвбея: остров в Эгейском море)</i> : <div class="area" data-key="Eu-bœ́-a"></div></div>
      <div>syllaba <i>(слог)</i> : <div class="area" data-key="sýl-la-ba"></div></div>
      <div>cerebrum <i>(мозг)</i> : <div class="area" data-key="cé-re-brum"></div></div>
      <div>dēclārō <i>(объявляю)</i> : <div class="area" data-key="dē-clā́-rō"></div></div>
      <div>Caucasus <i>(Кавказ)</i> : <div class="area" data-key="Cáu-ca-sus"></div></div>
      <div>Cicerō <i>(Цицерон)</i> : <div class="area" data-key="Cí-ce-rō"></div></div>
    </div>
  `
});