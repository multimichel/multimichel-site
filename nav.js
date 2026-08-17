// Shared header behaviour: the orange masthead square doubles as the mobile
// menu control, and every orange section marker can copy a permalink to its
// section. Both are additive — no page depends on this file to render.
(function(){

  // ---------- mobile menu ----------
  var btn = document.querySelector('.brand-menu');
  var panel = document.getElementById('mobile-nav');
  if (btn && panel) {
    function isMobile(){
      return window.innerWidth <= 900;
    }
    function closeMenu(){
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
      panel.classList.remove('is-open');
      document.documentElement.style.overflow = '';
    }
    function openMenu(){
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close menu');
      panel.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';
    }
    btn.addEventListener('click', function(){
      if (!isMobile()) return;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu(); else openMenu();
    });
    panel.addEventListener('click', function(e){
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') closeMenu();
    });
    function syncMenuMode(){
      var mobile = isMobile();
      btn.disabled = !mobile;
      if (mobile) btn.removeAttribute('aria-hidden');
      else {
        btn.setAttribute('aria-hidden', 'true');
        if (btn.getAttribute('aria-expanded') === 'true') closeMenu();
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
