/* Sweet Luxury — animaciones e interacciones compartidas
   Cargar en todas las páginas después del CSS. No depende de librerías externas. */
(function () {
  'use strict';

  function rafThrottle(fn) {
    var ticking = false;
    return function () {
      if (ticking) return;
      ticking = true;
      var args = arguments;
      var ctx = this;
      requestAnimationFrame(function () {
        fn.apply(ctx, args);
        ticking = false;
      });
    };
  }

  /* ---------- Barra de progreso de scroll ---------- */
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    var update = rafThrottle(function () {
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop || 0;
      var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = Math.max(0, Math.min(100, pct)) + '%';
    });
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Header: sombra al hacer scroll ---------- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var update = rafThrottle(function () {
      if (window.scrollY > 12) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    });
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = null;
  function getRevealObserver() {
    if (revealObserver) return revealObserver;
    if (!('IntersectionObserver' in window)) return null;
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    return revealObserver;
  }

  function observeReveals(root) {
    root = root || document;
    var obs = getRevealObserver();
    var items = root.querySelectorAll
      ? Array.prototype.slice.call(root.querySelectorAll('[data-reveal]:not([data-reveal-bound])'))
      : [];
    if (root.hasAttribute && root.matches('[data-reveal]') && !root.hasAttribute('data-reveal-bound')) {
      items.unshift(root);
    }
    items.forEach(function (el) {
      el.setAttribute('data-reveal-bound', '1');
      if (obs) obs.observe(el);
      else el.classList.add('is-visible');
    });
  }

  function applyStagger(container, selector, stepMs, maxSteps) {
    if (!container) return;
    var els = container.querySelectorAll(selector);
    Array.prototype.forEach.call(els, function (el, i) {
      var step = maxSteps ? i % maxSteps : i;
      el.style.setProperty('--reveal-delay', step * stepMs + 'ms');
    });
  }

  /* ---------- Vitrina: carrusel deslizable ---------- */
  function initShowcaseScroll() {
    var wraps = document.querySelectorAll('.showcase-scroll-wrap');
    Array.prototype.forEach.call(wraps, function (wrap) {
      var scroller = wrap.querySelector('.showcase-scroll');
      if (!scroller) return;
      var prevBtn = wrap.querySelector('.showcase-arrow.prev');
      var nextBtn = wrap.querySelector('.showcase-arrow.next');

      function cardStep() {
        var card = scroller.querySelector('.piece-card');
        var gap = 28;
        return card ? card.getBoundingClientRect().width + gap : 320;
      }
      var updateArrows = rafThrottle(function () {
        if (!prevBtn || !nextBtn) return;
        prevBtn.disabled = scroller.scrollLeft <= 4;
        nextBtn.disabled = scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 4;
      });
      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          scroller.scrollBy({ left: -cardStep(), behavior: 'smooth' });
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          scroller.scrollBy({ left: cardStep(), behavior: 'smooth' });
        });
      }
      scroller.addEventListener('scroll', updateArrows, { passive: true });
      window.addEventListener('resize', updateArrows);
      updateArrows();

      /* Arrastrar con mouse (drag-to-scroll). El scroll táctil nativo se deja intacto. */
      var isDown = false,
        startX = 0,
        startScroll = 0,
        moved = false;
      scroller.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch') return;
        isDown = true;
        moved = false;
        startX = e.clientX;
        startScroll = scroller.scrollLeft;
        scroller.classList.add('dragging');
      });
      window.addEventListener('pointermove', function (e) {
        if (!isDown) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 6) moved = true;
        scroller.scrollLeft = startScroll - dx;
      });
      window.addEventListener('pointerup', function () {
        if (isDown) {
          isDown = false;
          scroller.classList.remove('dragging');
        }
      });
      scroller.addEventListener(
        'click',
        function (e) {
          if (moved) {
            e.preventDefault();
            e.stopPropagation();
            moved = false;
          }
        },
        true
      );
    });
  }

  /* ---------- "De la mina a tus manos": línea de progreso ---------- */
  function initProcessLine() {
    var section = document.querySelector('.process-section');
    if (!section) return;
    var fill = section.querySelector('.process-line-fill');
    if (!fill) return;
    var update = rafThrottle(function () {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var total = rect.height + vh * 0.5;
      var progressed = vh * 0.75 - rect.top;
      var pct = Math.max(0, Math.min(1, total > 0 ? progressed / total : 0));
      fill.style.height = pct * 100 + '%';
    });
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Observar tarjetas del catálogo que se regeneran al filtrar ---------- */
  function initGridObserver() {
    var grid = document.getElementById('grid');
    if (!grid || !('MutationObserver' in window)) return;
    var mo = new MutationObserver(function () {
      applyStagger(grid, '.piece-card', 55, 12);
      observeReveals(grid);
    });
    mo.observe(grid, { childList: true });
  }

  /* ---------- Preloader: pantalla de logo mientras carga la página ---------- */
  function initPreloader() {
    var pre = document.getElementById('preloader');
    if (!pre) return;
    var MIN_MS = 550;
    var shown = Date.now();
    function hide() {
      var wait = Math.max(0, MIN_MS - (Date.now() - shown));
      setTimeout(function () {
        pre.classList.add('is-hidden');
        setTimeout(function () {
          if (pre.parentNode) pre.parentNode.removeChild(pre);
        }, 650);
      }, wait);
    }
    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide);
    }
  }
  initPreloader();

  function init() {
    initScrollProgress();
    initHeaderScroll();

    applyStagger(document, '.trust-item', 90, 6);
    applyStagger(document, '.why-item', 90, 6);
    applyStagger(document, '.level-card', 90, 6);
    applyStagger(document, '.glossary-item', 90, 8);
    applyStagger(document, '.contact-card', 80, 8);
    applyStagger(document, '.showcase-scroll .piece-card', 90, 6);
    applyStagger(document, '.process-step', 140, 8);

    observeReveals(document);
    initShowcaseScroll();
    initProcessLine();
    initGridObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SLAnim = { observeReveals: observeReveals, applyStagger: applyStagger };
})();

