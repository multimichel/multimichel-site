// Shared header behaviour: the orange masthead square doubles as the mobile
// menu control, and every orange section marker can copy a permalink to its
// section. Both are additive — no page depends on this file to render.
(function(){

  // ---------- mobile menu ----------
  var btn = document.querySelector('.brand-menu');
  var panel = document.getElementById('mobile-nav');
  if (btn && panel) {
    // Everything outside the menu that must not be reachable while it is open.
    // <header> is excluded: the trigger itself lives there.
    var outside = [document.getElementById('main'), document.querySelector('footer.site')]
      .filter(Boolean);
    var scrollY = 0;

    function isMobile(){
      return window.innerWidth <= 900;
    }

    function focusables(){
      return panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    }

    function setOutsideInert(on){
      outside.forEach(function(el){
        if (on) {
          el.inert = true;                        // no focus, no pointer, no AT
          el.setAttribute('aria-hidden', 'true'); // for engines without inert
        } else {
          el.inert = false;
          el.removeAttribute('aria-hidden');
        }
      });
    }

    function openMenu(){
      // position:fixed on <html> alone still lets iOS scroll the page behind
      // the panel, so the scroll position is pinned and restored by hand.
      scrollY = window.scrollY || window.pageYOffset || 0;
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close menu');
      panel.classList.add('is-open');
      setOutsideInert(true);
      document.body.style.position = 'fixed';
      document.body.style.top = -scrollY + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      var first = focusables()[0];
      if (first) first.focus();
    }

    function closeMenu(opts){
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
      panel.classList.remove('is-open');
      setOutsideInert(false);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      // instant, never smooth: html has scroll-behavior:smooth, which turns
      // restoring a locked position into a visible animated jump (and reads
      // back as 0 until it finishes).
      window.scrollTo({top: scrollY, left: 0, behavior: 'instant'});
      // Focus returns to the trigger — except when a menu link was followed,
      // where the browser is already navigating and stealing focus is wrong.
      if (!(opts && opts.silent)) btn.focus();
    }

    function isOpen(){
      return btn.getAttribute('aria-expanded') === 'true';
    }

    btn.addEventListener('click', function(){
      if (!isMobile()) return;
      if (isOpen()) closeMenu(); else openMenu();
    });

    panel.addEventListener('click', function(e){
      if (e.target.tagName === 'A') closeMenu({silent:true});
    });

    document.addEventListener('keydown', function(e){
      if (!isOpen()) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key !== 'Tab') return;

      // Focus trap. inert already blocks the rest of the page, but Tab can
      // still reach browser chrome and the trigger, so the cycle is closed
      // explicitly across the panel plus its trigger.
      var items = Array.prototype.slice.call(focusables());
      items.push(btn);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    function syncMenuMode(){
      var mobile = isMobile();
      btn.disabled = !mobile;
      if (mobile) btn.removeAttribute('aria-hidden');
      else {
        btn.setAttribute('aria-hidden', 'true');
        if (isOpen()) closeMenu({silent:true});
      }
    }
    window.addEventListener('resize', syncMenuMode);
    syncMenuMode();
  }

  // ---------- section-marker permalinks ----------
  // Only decorates markers that sit inside a <section id="…">. Doesn't touch
  // the existing "All writing →" / "All talks →" links.
  var tabs = document.querySelectorAll('.sechead .tab');
  for (var i = 0; i < tabs.length; i++) {
    (function(tab){
      var section = tab.closest('section[id]');
      if (!section) return;

      var heading = section.querySelector('h2');
      var label = heading ? heading.textContent : section.id;

      var copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'tab-copy';
      copy.setAttribute('aria-label', 'Copy link to ' + label + ' section');
      copy.innerHTML = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">'
        + '<path d="M6.6 9.4L9.4 6.6M7.3 4.4L8.3 3.4a2.1 2.1 0 013 3l-1 1M8.7 11.6L7.7 12.6a2.1 2.1 0 01-3-3l1-1" '
        + 'fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

      var status = document.createElement('span');
      status.className = 'tab-copy-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');

      tab.appendChild(copy);
      tab.appendChild(status);

      copy.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var url = location.origin + location.pathname + '#' + section.id;

        function confirmCopy(){
          status.textContent = 'Link copied';
          tab.classList.add('is-copied');
          clearTimeout(tab._copyTimer);
          tab._copyTimer = setTimeout(function(){
            tab.classList.remove('is-copied');
            status.textContent = '';
          }, 1600);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(confirmCopy, confirmCopy);
        } else {
          var ta = document.createElement('textarea');
          ta.value = url;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (err) {}
          document.body.removeChild(ta);
          confirmCopy();
        }
      });
    })(tabs[i]);
  }

  // ---------- ambient product video ----------
  // These are product demonstrations, not video content: they play themselves,
  // silently, on loop, with no chrome. Autoplay is granted by JS rather than the
  // markup attribute so that prefers-reduced-motion is honoured on first paint —
  // an `autoplay` attribute would start playing before script could stop it.
  // Reduced motion falls back to the poster frame plus real controls, so the
  // demo is still watchable on demand rather than simply lost.
  var ambient = document.querySelectorAll('video.ambient');
  if (ambient.length) {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    function calm(v){
      v.controls = true;
      v.autoplay = false;
      v.removeAttribute('autoplay');
      try { v.pause(); v.currentTime = 0; } catch (e) {}
    }
    function animate(v){
      v.controls = false;
      v.muted = true;          // re-assert: browsers only allow muted autoplay
      v.autoplay = true;
      var p = v.play();
      // A rejected play() is not an error worth surfacing — hand the viewer
      // controls instead of leaving a frozen frame with no way in.
      if (p && p.catch) p.catch(function(){ v.controls = true; });
    }

    function apply(){
      for (var i = 0; i < ambient.length; i++) {
        if (mq.matches) calm(ambient[i]); else animate(ambient[i]);
      }
    }
    apply();
    // React to the OS setting changing mid-session.
    if (mq.addEventListener) mq.addEventListener('change', apply);
    else if (mq.addListener) mq.addListener(apply);

    // Only run what's on screen — offscreen loops burn battery for nothing.
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries){
        if (mq.matches) return;
        entries.forEach(function(en){
          var v = en.target;
          if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function(){}); }
          else v.pause();
        });
      }, {threshold: 0.25});
      for (var j = 0; j < ambient.length; j++) io.observe(ambient[j]);
    }
  }
})();
