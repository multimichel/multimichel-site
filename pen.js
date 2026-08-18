/* Pen draw-on.
 *
 * Underlines are drawn left-to-right, once, as they enter view. The mark
 * itself is CSS and exists without this file — .js-pen is only added here, so
 * a failed or blocked script leaves every underline present, just undrawn.
 *
 * Deliberately NOT IntersectionObserver. The failure mode matters more than
 * the elegance here: if the observer never fires, every link is left at zero
 * width and the underlines disappear entirely. A plain rAF-throttled geometry
 * check is a handful of lines, is verifiable, and degrades to "draw it" rather
 * than "hide it". There are a dozen links on a page, not a thousand.
 *
 * Reduced motion is handled in CSS, so the end state is identical either way. */
(function () {
  var SEL = '.penline, .lede a, .prose a, .aside-note-link, .quote-source a';
  var pending = Array.prototype.slice.call(document.querySelectorAll(SEL));
  if (!pending.length) return;

  document.documentElement.classList.add('js-pen');

  function drawAll() {
    pending.forEach(function (el) { el.classList.add('is-drawn'); });
    pending = [];
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    drawAll();
    return;
  }

  // Stagger within a block so a paragraph's links read as one gesture.
  var lastParent = null, n = 0;
  pending.forEach(function (el) {
    var parent = el.closest('p, li, figcaption, div') || document.body;
    if (parent !== lastParent) { n = 0; lastParent = parent; }
    el._penDelay = Math.min(n++ * 60, 240);
  });

  var ticking = false;
  function check() {
    ticking = false;
    if (!pending.length) return;
    var h = window.innerHeight || document.documentElement.clientHeight;
    var still = [];
    pending.forEach(function (el) {
      var r = el.getBoundingClientRect();
      // Visible, and clear of the very bottom edge so it draws after it has
      // properly arrived rather than while it is still sliding in.
      var visible = r.top < h * 0.9 && r.bottom > 0;
      if (visible) setTimeout(function () { el.classList.add('is-drawn'); }, el._penDelay);
      else still.push(el);
    });
    pending = still;
    if (!pending.length) teardown();
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(check);
  }

  function teardown() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // The first check must wait for layout to settle. Running it synchronously
  // measured a half-built page — every link reported as on-screen and the
  // whole page drew itself at once, which is exactly the effect this is
  // supposed to avoid.
  function start() { requestAnimationFrame(check); }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });

  // Safety net: whatever happens, nothing stays invisible.
  setTimeout(drawAll, 4000);
})();
