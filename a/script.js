import Relays from './relay.js';
import audio from './audio.js';

const $ = (selector, ctx = document) => ctx.querySelector(selector);

const video = $('#min-vid');
const vidPath = 'https://misc-lang.github.io/eng_phonetics/vids/';

new Relays($('#v-relays'), function() {
  video.src = vidPath + this.src + '.mp4';
});

new Relays($('#a-relays'), function() {
  const {src, author, title} = this.target.dataset;
  audio._setName(author, title);
  audio._setText(this.target.firstElementChild.innerHTML);
  audio._init(src);
});