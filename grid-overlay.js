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
  btn.title = 'Toggle spec overlay (G)';

  document.body.appendChild(layer);
  document.body.appendChild(legend);
  document.body.appendChild(btn);

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
    if (e.key !== 'g' && e.key !== 'G') return;
    var t = e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
    set(!document.body.classList.contains('grid-on'));
  });
})();
