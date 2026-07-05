/* site.js — shared behavior for all pages */
(function () {
  'use strict';

  // ── Mobile nav toggle ─────────────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.addEventListener('click', e => {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // ── Scroll reveal ─────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ── Image load detection (placeholders + lightbox hook) ──────────
  document.querySelectorAll('.img-wrap img').forEach(img => {
    if (img.complete && img.naturalWidth > 0) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'));
  });

  // ── Video sound buttons ───────────────────────────────────────────
  document.querySelectorAll('.video-sound-btn[data-video]').forEach(button => {
    const video = document.getElementById(button.dataset.video);
    if (!video) return;
    button.addEventListener('click', () => {
      video.muted = !video.muted;
      button.textContent = video.muted ? 'sound: off' : 'sound: on';
      button.classList.toggle('unmuted', !video.muted);
    });
  });

  // ── Skill → project filter (homepage only) ────────────────────────
  const pills = document.querySelectorAll('.skill-pill[data-skill]');
  const cards = document.querySelectorAll('.card[data-skills]');
  const filterStatus = document.getElementById('filterStatus');
  if (!pills.length || !cards.length || !filterStatus) return;

  const grid = document.querySelector('.projects-grid');
  const filterTags = document.getElementById('filterTags');
  const filterClear = document.getElementById('filterClear');
  const originalOrder = [...cards];
  let activeSkill = null;

  const skillLabel = {};
  pills.forEach(p => { skillLabel[p.dataset.skill] = p.textContent.trim(); });

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const skill = pill.dataset.skill;
      activeSkill = (activeSkill === skill) ? null : skill;
      pills.forEach(p => p.classList.toggle('active', p.dataset.skill === activeSkill && activeSkill !== null));
      update();
      if (activeSkill) {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  filterClear.addEventListener('click', () => {
    activeSkill = null;
    pills.forEach(p => p.classList.remove('active'));
    update();
  });

  function update() {
    if (!activeSkill) {
      originalOrder.forEach(card => {
        card.classList.remove('skill-match', 'skill-dim');
        grid.appendChild(card);
      });
      filterStatus.classList.remove('visible');
      return;
    }

    filterStatus.classList.add('visible');
    filterTags.textContent = skillLabel[activeSkill] || activeSkill;

    const matched = [];
    const rest = [];
    originalOrder.forEach(card => {
      const has = card.dataset.skills.split(',').includes(activeSkill);
      card.classList.toggle('skill-match', has);
      card.classList.toggle('skill-dim', !has);
      (has ? matched : rest).push(card);
    });
    matched.concat(rest).forEach(card => grid.appendChild(card));
  }
})();
