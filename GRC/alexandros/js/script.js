import tip from './tip.js?v=2c';

const thisScript = document.currentScript || [...document.scripts].pop();
const src = (thisScript || {src: ''}).src;
const ver = (src.match(/[?&]v=([^&]+)/) || [Date.now()])[1];

if (location.protocol === 'file:') loadScript('_edit.js');
if (!document.hasOwnProperty('_TIP_')) {
  document._TIP_ = tip;
  tip.__init__();
}

function loadScript(src) {
  const script = document.createElement('script');
  script.src = src + '?v=' + ver;
  document.head.appendChild(script).remove();
}