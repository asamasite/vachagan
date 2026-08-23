(function () {
  'use strict';

  // Мобильное меню
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  // Фильтр направлений
  var filters = document.querySelectorAll('.filter');
  var serviceCards = document.querySelectorAll('.service-card');
  var emptyNote = document.querySelector('.cards-empty');

  if (filters.length && serviceCards.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var want = btn.dataset.filter;
        var shown = 0;

        filters.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });

        serviceCards.forEach(function (card) {
          var match = want === 'all' || card.dataset.category === want;
          card.hidden = !match;
          // карточка могла не попасть в наблюдатель, пока была скрыта
          if (match) {
            card.classList.add('is-visible');
            shown++;
          }
        });

        if (emptyNote) emptyNote.hidden = shown > 0;
      });
    });
  }

  // Появление блоков при прокрутке
  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();
