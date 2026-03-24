/* lightbox.js — shared across all project pages */
(function () {
  // ── Inject CSS ────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .img-wrap img.loaded { cursor: zoom-in; }

    #lb-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9000;
      background: rgba(0,0,0,0.92);
      backdrop-filter: blur(6px);
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.25rem;
      padding: 2rem;
    }
    #lb-overlay.open { display: flex; }

    #lb-img {
      max-width: min(92vw, 1200px);
      max-height: 78vh;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      box-shadow: 0 8px 60px rgba(0,0,0,0.8);
    }

    #lb-caption {
      font-family: 'Space Mono', monospace;
      font-size: 0.72rem;
      color: #e8e8f0;
      letter-spacing: 0.08em;
      text-align: center;
      max-width: 680px;
      line-height: 1.6;
    }

    #lb-close {
      position: fixed;
      top: 1.25rem;
      right: 1.5rem;
      background: none;
      border: 1px solid #2a2a3a;
      color: #888898;
      font-family: 'Space Mono', monospace;
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      padding: 0.35rem 0.75rem;
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s;
      z-index: 9001;
    }
    #lb-close:hover { color: #e8ff47; border-color: #e8ff47; }

    #lb-hint {
      font-family: 'Space Mono', monospace;
      font-size: 0.58rem;
      color: #444455;
      letter-spacing: 0.08em;
      position: fixed;
      bottom: 1.25rem;
      left: 50%;
      transform: translateX(-50%);
    }

    /* PDF canvas click affordance */
    #pdfCanvas { cursor: pointer; }
    .pdf-open-hint {
      font-family: 'Space Mono', monospace;
      font-size: 0.6rem;
      color: #444455;
      letter-spacing: 0.08em;
      text-align: center;
      margin-top: 0.4rem;
    }
  `;
  document.head.appendChild(style);

  // ── Build overlay DOM ─────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = `
    <button id="lb-close">ESC / close ×</button>
    <img id="lb-img" src="" alt="">
    <p id="lb-caption"></p>
    <span id="lb-hint">click outside or press Esc to close</span>
  `;
  document.body.appendChild(overlay);

  const lbImg     = document.getElementById('lb-img');
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

  // ── Hook loaded images ────────────────────────────────────────────────────
  function attachToImage(img) {
    const figure  = img.closest('figure');
    const caption = figure ? (figure.querySelector('figcaption')?.textContent.trim() ?? '') : (img.alt ?? '');
    img.addEventListener('click', () => open(img.src, caption));
  }

  // Images already loaded when script runs
  document.querySelectorAll('.img-wrap img.loaded').forEach(attachToImage);

  // Images that load after script runs (MutationObserver on class changes)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        const img = m.target;
        if (img.classList.contains('loaded')) attachToImage(img);
      }
    });
  });
  document.querySelectorAll('.img-wrap img').forEach(img => {
    observer.observe(img, { attributes: true });
  });

  // ── PDF canvas: click to open in new tab ─────────────────────────────────
  const pdfCanvas = document.getElementById('pdfCanvas');
  if (pdfCanvas) {
    // Find the PDF URL from the existing inline script (stored on the canvas element)
    // Fall back to scanning for a .pdf src reference in the page
    function findPdfUrl() {
      const scripts = document.querySelectorAll('script');
      for (const s of scripts) {
        const m = s.textContent.match(/PDF_URL\s*=\s*['"]([^'"]+)['"]/);
        if (m) return m[1];
      }
      return null;
    }

    const pdfUrl = findPdfUrl();
    if (pdfUrl) {
      pdfCanvas.title = 'Click to open full PDF';

      // Add hint label below the canvas wrap
      const wrap = pdfCanvas.closest('.pdf-canvas-wrap') ?? pdfCanvas.parentElement;
      const hint = document.createElement('p');
      hint.className = 'pdf-open-hint';
      hint.textContent = 'click to open full PDF ↗';
      wrap.parentElement.insertBefore(hint, wrap.nextSibling);

      pdfCanvas.addEventListener('click', () => {
        window.open(pdfUrl, '_blank', 'noopener');
      });
    }
  }
})();
