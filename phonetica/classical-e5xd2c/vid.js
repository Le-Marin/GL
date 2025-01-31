(function(shellNode) {
  'use strict';

  if (!shellNode) return;

  const [prevArrow, body, nextArrow] = shellNode.children;
  const target = body.firstElementChild;
  const stack = body.dataset.ids.split(' | ');

  shellNode.addEventListener('click', function(e) {
    const trg = e.target;
    const {action} = trg.dataset;
    if (action) return video[action]();
  });

  let currentIndex = 0;

  const video = {
    next() {
      if (currentIndex + 1 >= stack.length) return;
      this.init(++currentIndex);
    },
    prev() {
      if (!currentIndex) return;
      this.init(--currentIndex);
    },
    init(index) {
      nextArrow.style.visibility = index + 1 < stack.length ? 'visible' : '';
      prevArrow.style.visibility = index ? 'visible' : '';
      target.src = stack[index];
    }
  };

  video.init(0);
})(document.getElementById('vid-shell'));