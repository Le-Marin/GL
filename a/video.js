(function() {
  'use strict';

  const target = document.getElementById('video');

  if (!target) return;

  const shellNode = target.closest('.shell');
  const [prevArrow, container, nextArrow] = shellNode.children;
  const stack = target.parentNode.dataset.ids.split(' | ');

  shellNode.addEventListener('click', function(e) {
    const trg = e.target;
    const {action} = trg.dataset;
    if (action) return video[action]();
  });

  const video = new (class Video {
    constructor() {
      this.currentIndex = 0;
    }

    next() {
      if (this.currentIndex + 1 >= stack.length) return;
      this.init(++this.currentIndex);
    }

    prev() {
      if (!this.currentIndex) return;
      this.init(--this.currentIndex);
    }

    init(index) {
      nextArrow.classList.toggle('_hidden', index + 1 >= stack.length);
      prevArrow.classList.toggle('_hidden', !index);
      target.src = `https://www.youtube.com/embed/${stack[index]}`;
    }

    get stack() {
      return stack;
    }

    get target() {
      return target;
    }
  });

  video.init(0);
})();