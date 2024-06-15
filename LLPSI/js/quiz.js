(function() {
  'use strict';

  const origin = 'https://quizlet.com';
  const link = document.getElementById('quiz');

  if (!link) return;

  const {pass, src} = link.dataset;

  if (!pass) return;

  let view = document.createElement('div');

  view.innerHTML = /*html*/`
    <div class="quiz-view">
      <h4 class="quiz-heading">Пароль к словарю</h4>
      <div class="quiz-pass-shell">
        <input class="quiz-pass" type="text" value="${pass}" readonly>
        <button class="quiz-copy"></button>
      </div>
      <div>
        Перейти на
        <a class="quiz-link" href="${origin + src}" target="_blank">Quizlet</a>
      </div>
    </div>
  `;

  view = view.firstElementChild;

  const passElem = view.children[1].firstElementChild;
  const copyButton = passElem.nextElementSibling;

  const close = () => view.remove();

  link.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    show();

    document.addEventListener('click', close, { once: true });
    document.addEventListener('keydown', function handler(e) {
      if (e.key !== 'Escape') return;
      this.removeEventListener(e.type, handler);
      close();
    });
  });

  view.addEventListener('click', (e) => e.stopPropagation());

  copyButton.addEventListener('click', function(e) {
    passElem.select();
    document.execCommand('copy');
    this.classList.add('__done');
    setTimeout(() => this.classList.remove('__done'), 2e3);
  });

  function show(path) {
    const {x, y, width} = link.getBoundingClientRect();
    document.body.appendChild(view);

    const viewWidth2 = view.offsetWidth/2;
    let left = Math.max(0, x + width/2 - viewWidth2);
    left = left || Math.max(0, document.documentElement.clientWidth/2 - viewWidth2);
    const top = Math.max(0, y + window.scrollY - view.offsetHeight);

    view.style.left = `${~~left}px`;
    view.style.top = `${~~top}px`;
  }
})();