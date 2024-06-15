(function() {
  'use strict';

  const basePath = atob('aHR0cHM6Ly9sZS1tYXJpbi5naXRodWIuaW8vR0wv');

  if (!document.getElementById('refs')) return;

  let pdfView = document.createElement('div');
  pdfView.innerHTML = /*html*/`
    <div class="pdf-view" data-action="hide-pdf">
      <div class="pdf-shell">
        <button class="pdf-close" data-action="hide-pdf">&times;</button>
        <iframe class="pdf"></iframe>
      </div>
    </div>
  `;
  pdfView = pdfView.firstElementChild;

  const frame = pdfView.firstElementChild.lastElementChild;

  document.addEventListener('click', function(e) {
    const {dataset} = e.target;
    const {action} = dataset;

    if (action === 'hide-pdf') return closePDF();
    if (action === 'open-pdf') {
      e.preventDefault();
      const path = dataset.abbr === 'g' ? 'grammatica/' : 'LLPSI/extra/';
      openPDF(path, dataset.pdfId);
    }
  });

  function openPDF(path, id) {
    frame.src = basePath + path + id + '.html';

    pdfView.classList.add('__shown');
    if (!document.contains(pdfView)) document.body.appendChild(pdfView);

    document.addEventListener('keydown', function handler(e) {
      if (e.key !== 'Escape') return;
      this.removeEventListener(e.type, handler);
      closePDF();
    });
  }

  function closePDF() {
    pdfView.classList.remove('__shown');
  }
})();