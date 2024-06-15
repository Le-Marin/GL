(function() {
  'use strict';

  if (document.getElementById('footer')) return;

  const css = /*css*/`
    body {
      box-sizing: border-box;
      min-height: 100vh;
      position: relative;
      padding-bottom: 9rem;
    }
    #footer {
      box-sizing: border-box;
      font-family: "Times New Roman", Times, serif;
      font-size: 1.8rem;
      height: 5em;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 calc(50vw - 30em);
      padding: 0 max(3%, 50vw - 30em);
      background: linear-gradient(90deg, transparent, #f4f4f4 30% 70%, transparent);
      z-index: 10;
    }
    #footer::before {
      content: "";
      height: 1px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      background: linear-gradient(90deg, transparent, #aaa 30% 70%, transparent);
    }
    #footer a {
      color: #4c536a;
      text-decoration: none;
    }
    #footer a:hover {
      color: #284cbc;
    }
    .footer__item {
      display: flex;
      align-items: center;
      column-gap: 0.3em;
    }
    .footer__tg {
      font-size: 2em;
      width: 1em;
      height: 1em;
    }
    .footer__pay {
      --s: 1.75em;
      box-sizing: border-box;
      width: var(--s);
      height: var(--s);
      line-height: var(--s);
      text-align: center;
      color: #ddd !important;
      background-color: #222;
      border-radius: 50%;
    }
  `;

  const html = /*html*/`
    <footer id="footer">
      <style>${css}</style>
      <div class="footer__item">
        <svg class="footer__tg" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 22 22" fill="none">
          <path d="M12 4C10.4178 4 8.87103 4.46919 7.55544 5.34824C6.23985 6.22729 5.21447 7.47672 4.60897 8.93853C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM15.93 9.48L14.62 15.67C14.52 16.11 14.26 16.21 13.89 16.01L11.89 14.53L10.89 15.46C10.8429 15.5215 10.7824 15.5715 10.7131 15.6062C10.6438 15.6408 10.5675 15.6592 10.49 15.66L10.63 13.66L14.33 10.31C14.5 10.17 14.33 10.09 14.09 10.23L9.55 13.08L7.55 12.46C7.12 12.33 7.11 12.03 7.64 11.83L15.35 8.83C15.73 8.72 16.05 8.94 15.93 9.48Z" fill="#4d64a6"></path>
        </svg>
        <a href="https://t.me/glossalingua" nofollow>LINGVA LATINA</a>
      </div>
      <div class="footer__item"><a class="footer__pay" href="/pay" nofollow>₽</a></div>
    </footer>
  `;

  const elem = document.createElement('div');
  elem.innerHTML = html;
  document.body.appendChild(elem.firstElementChild);
})();