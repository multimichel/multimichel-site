/* Spec overlay. Reads live computed tokens and live element geometry — it
   measures the page rather than describing it, so it can disagree with the
   design and that disagreement is the useful part. Toggle: G, or the button. */
(function () {
  var root = getComputedStyle(document.documentElement);
  var tok = function (n) { return root.getPropertyValue(n).trim(); };
  var num = function (n) { return parseFloat(tok(n)) || 0; };

  var layer = document.createElement('div');
  layer.className = 'gridlayer';
  layer.setAttribute('aria-hidden', 'true');

  layer.appendChild(el('div', 'baseline'));
  layer.appendChild(el('div', 'baseline-major'));
  layer.appendChild(el('div', 'railfill left'));
  layer.appendChild(el('div', 'railfill right'));

  // Guides are viewport-absolute now that the layer is fixed.
  var rail = num('--rail-width');
  var contentStart = num('--content-start');
  var marker = num('--block-marker');
  var inset = num('--block-inset');
  guide(inset, 'block ' + inset, false);
  guide(inset + marker, 'block end ' + (inset + marker), false);
  guide(rail, 'paper ' + rail, true);
  guide(contentStart, 'text ' + contentStart, false);

  function guide(x, label, isRail) {
    var g = el('div', 'vline' + (isRail ? ' rail' : ''));
    g.style.left = x + 'px';
    g.setAttribute('data-label', label);
    layer.appendChild(g);
  }
  function el(tag, cls) { var e = document.createElement(tag); e.className = cls; return e; }

  var legend = document.createElement('div');
  legend.className = 'gridlegend';

  var btn = document.createElement('button');
  btn.className = 'gridtoggle';
  btn.type = 'button';
  btn.textContent = 'Grid';
  btn.setAttribute('aria-pressed', 'false');
  btn.title = 'Hide spec overlay (G)';

  // Square-geometry A/B. Lives with the overlay because it is a comparison
  // tool, not site behaviour — it only appears once the overlay is summoned.
  var geo = document.createElement('button');
  geo.className = 'geotoggle';
  geo.type = 'button';
  geo.setAttribute('aria-pressed', 'false');

  function geoLabel() {
    var legacy = document.body.classList.contains('geo-legacy');
    geo.textContent = legacy ? 'Square: old' : 'Square: new';
    geo.title = 'Compare desktop square geometry (S) — currently '
              + (legacy ? '16/96, square 88% in the rail' : '40/120, square centred on the seam');
    geo.setAttribute('aria-pressed', String(legacy));
  }

  function setGeo(legacy) {
    document.body.classList.toggle('geo-legacy', legacy);
    try { localStorage.setItem('mm-geo-legacy', legacy ? '1' : '0'); } catch (e) {}
    geoLabel();
  }

  document.body.appendChild(layer);
  document.body.appendChild(legend);
  document.body.appendChild(btn);
  document.body.appendChild(geo);

  // Carry the comparison across page navigations, so the two geometries can be
  // judged on Archive/About too rather than only wherever the toggle was hit.
  try { if (localStorage.getItem('mm-geo-legacy') === '1') document.body.classList.add('geo-legacy'); } catch (e) {}
  geoLabel();

  geo.addEventListener('click', function () {
    setGeo(!document.body.classList.contains('geo-legacy'));
  });

  // Audit every rendered gap against the 8px scale, live.
  // On-grid means divisible by 8 — not membership of a curated list.
  var onGrid = function (n) { return n % 8 === 0; };

  function audit() {
    var probes = [
      ['rail', rail],
      ['paper→text', contentStart - rail],
      ['marker', marker],
      ['header block', num('--block-header-w') + '×' + num('--block-header-h')],
      ['row height', num('--row-height')],
      ['label→rows', num('--gap-label-to-rows')]
    ];
    var offGrid = [];
    document.querySelectorAll('#writing,#speaking,#work,#media,#about').forEach(function (s) {
      var pt = Math.round(parseFloat(getComputedStyle(s).paddingTop));
      if (pt && !onGrid(pt)) offGrid.push(s.id + ' ' + pt);
    });
    // Token-level values that must also sit on the grid.
    [['row-height', num('--row-height')], ['marker', marker], ['rail', rail]].forEach(function (p) {
      if (p[1] && !onGrid(p[1])) offGrid.push(p[0] + ' ' + p[1]);
    });

    var rows = probes.map(function (p) {
      return '<dt>' + p[0] + '</dt><dd>' + p[1] + '</dd>';
    }).join('');

    legend.innerHTML =
      '<b>Spec overlay</b>' +
      '<dl>' + rows + '</dl>' +
      '<div style="margin-top:12px;opacity:.6">8px grid · 32px major</div>' +
      (offGrid.length
        ? '<div style="margin-top:8px;color:#FF6C00">off-scale: ' + offGrid.join(', ') + '</div>'
        : '<div style="margin-top:8px;color:#7ED321">all section gaps on scale</div>');
  }

  function set(on) {
    document.body.classList.toggle('grid-on', on);
    btn.setAttribute('aria-pressed', String(on));
    if (on) audit();
  }

  btn.addEventListener('click', function () {
    set(!document.body.classList.contains('grid-on'));
  });

  document.addEventListener('keydown', function (e) {
    var k = e.key;
    if (k !== 'g' && k !== 'G' && k !== 's' && k !== 'S') return;
    var t = e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
    if (e.target.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (k === 'g' || k === 'G') set(!document.body.classList.contains('grid-on'));
    else setGeo(!document.body.classList.contains('geo-legacy'));
  });
})();
