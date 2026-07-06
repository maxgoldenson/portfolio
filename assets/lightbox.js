/* lightbox.js — click-to-zoom for case study figures (light theme) */
(function () {
  'use strict';

  const style = document.createElement('style');
  style.textContent = `
    #lb-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9000;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: saturate(120%) blur(24px);
      -webkit-backdrop-filter: saturate(120%) blur(24px);
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.1rem;
      padding: 2rem;
    }
    #lb-overlay.open { display: flex; }
    #lb-img {
      max-width: min(92vw, 1300px);
      max-height: 80vh;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
    }
    #lb-caption {
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.9);
      letter-spacing: -0.005em;
      text-align: center;
      max-width: 700px;
      line-height: 1.55;
    }
    #lb-close {
      position: fixed;
      top: 1.25rem;
      right: 1.5rem;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 980px;
      color: #1d1d1f;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.45rem 1rem;
      cursor: pointer;
      z-index: 9001;
    }
    #lb-close:hover { background: #fff; }
    #lb-hint {
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.5);
      position: fixed;
      bottom: 1.1rem;
      left: 50%;
      transform: translateX(-50%);
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = `
    <button id="lb-close">Close ✕</button>
    <img id="lb-img" src="" alt="">
    <p id="lb-caption"></p>
    <span id="lb-hint">click outside or press Esc to close</span>
  `;
  document.body.appendChild(overlay);

  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');

  function open(src, caption) {
    lbImg.src = src;
    lbImg.alt = caption;
    lbCaption.textContent = caption;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.getElementById('lb-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  function attachToImage(img) {
    if (img.dataset.lb) return;
    img.dataset.lb = '1';
    const figure = img.closest('figure');
    const caption = figure
      ? (figure.querySelector('.img-caption')?.textContent.trim() ?? img.alt ?? '')
      : (img.alt ?? '');
    img.addEventListener('click', () => open(img.src, caption));
  }

  document.querySelectorAll('.img-wrap img.loaded').forEach(attachToImage);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        const img = m.target;
        if (img.classList.contains('loaded')) attachToImage(img);
      }
    });
  });
  document.querySelectorAll('.img-wrap img:not(.loaded)').forEach(img => {
    observer.observe(img, { attributes: true });
  });

  // PDF canvas: click to open full PDF in a new tab
  const pdfCanvas = document.getElementById('pdfCanvas');
  if (pdfCanvas) {
    const pdfUrl = pdfCanvas.dataset.pdf;
    if (pdfUrl) {
      pdfCanvas.title = 'Click to open full PDF';
      pdfCanvas.addEventListener('click', () => window.open(pdfUrl, '_blank', 'noopener'));
    }
  }
})();
