(function(){
  var EMAIL = 'sanikasuryawanshi0305@gmail.com';
  var toastEl = document.getElementById('toast'), tt;
  function toast(msg){
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(tt); tt = setTimeout(function(){ toastEl.classList.remove('show'); }, 2200);
  }

  /* copy email */
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click', function(){
      var done = function(){ toast('Email copied'); };
      if (navigator.clipboard && window.isSecureContext){
        navigator.clipboard.writeText(EMAIL).then(done, fallback);
      } else fallback();
      function fallback(){
        var t = document.createElement('textarea'); t.value = EMAIL; t.style.position='fixed'; t.style.opacity='0';
        document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); done(); } catch(e){ toast('Copy failed. The email is ' + EMAIL); }
        document.body.removeChild(t);
      }
    });
  });

  /* send note */
  var note = document.getElementById('note'), hint = document.getElementById('hint');
  var fromEmail = document.getElementById('from-email');
  document.getElementById('send').addEventListener('click', function(){
    var body = note.value.trim();
    var email = (fromEmail && fromEmail.value || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      hint.style.color = '#B3245F'; hint.textContent = 'Add a valid email so Sanika can reply.';
      if (fromEmail) fromEmail.focus(); return;
    }
    if (!body){ hint.style.color = '#B3245F'; hint.textContent = 'Write a note first, then send it.'; note.focus(); return; }
    hint.style.color = '#5B4A70';
    hint.textContent = 'Sending your note…';
    var sendBtn = document.getElementById('send');
    sendBtn.disabled = true;
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: body, email: email })
    }).then(function(r){ return r.json().then(function(d){ return { ok: r.ok, d: d }; }); })
      .then(function(res){
        sendBtn.disabled = false;
        if (res.ok){ note.value = ''; if (fromEmail) fromEmail.value = ''; hint.textContent = ''; toast('Sent! Your note landed in the inbox.'); }
        else { hint.style.color = '#B3245F'; hint.textContent = (res.d && res.d.error) || 'Could not send right now. Please email directly.'; }
      })
      .catch(function(){ sendBtn.disabled = false; hint.style.color = '#B3245F'; hint.textContent = 'Network error. Please email me directly instead.'; });
  });
  note.addEventListener('input', function(){ if (note.value.trim()) hint.textContent = ''; });
  if (fromEmail) fromEmail.addEventListener('input', function(){ if (fromEmail.value.trim()) hint.textContent = ''; });

  /* playful visitor cursor label — follows across the entire page */
  var you = document.querySelector('.you');
  if (you && window.matchMedia('(pointer: fine)').matches){
    window.addEventListener('pointermove', function(e){
      you.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      you.classList.add('on');
    }, {passive:true});
    document.addEventListener('mouseleave', function(){ you.classList.remove('on'); });
    window.addEventListener('blur', function(){ you.classList.remove('on'); });
  }

  /* keep stacked project cards the same height so tabs line up cleanly */
  var bodies = document.querySelectorAll('.proj-body');
  function equalize(){
    bodies.forEach(function(b){ b.style.minHeight = ''; });
    if (window.innerWidth <= 760) return;
    var bar = 64;
    var avail = window.innerHeight - bar - 40;   /* room a sticky card can occupy */
    var h = 0; bodies.forEach(function(b){ h = Math.max(h, b.offsetHeight); });
    if (avail > 260) h = Math.min(h, avail);     /* never taller than the viewport */
    bodies.forEach(function(b){ b.style.minHeight = h + 'px'; });
  }
  equalize(); window.addEventListener('resize', equalize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalize);

  /* draggable stickers */
  var board = document.getElementById('board'), z = 5;
  var stickers = board.querySelectorAll('.sticker');
  stickers.forEach(function(el){
    var ox = 0, oy = 0, sx, sy, base, bRect, on = false;
    el.addEventListener('pointerdown', function(e){
      on = true; el.setPointerCapture(e.pointerId); el.classList.remove('tidy'); el.classList.add('drag');
      el.style.zIndex = ++z;
      ox = parseFloat(el.style.getPropertyValue('--dx')) || 0;
      oy = parseFloat(el.style.getPropertyValue('--dy')) || 0;
      sx = e.clientX - ox; sy = e.clientY - oy;
      var r = el.getBoundingClientRect(); bRect = board.getBoundingClientRect();
      base = { l: r.left - ox, t: r.top - oy, r: r.right - ox, b: r.bottom - oy };
    });
    el.addEventListener('pointermove', function(e){
      if (!on) return;
      var nx = e.clientX - sx, ny = e.clientY - sy, pad = 8;
      nx = Math.max(bRect.left - base.l + pad, Math.min(bRect.right - base.r - pad, nx));
      ny = Math.max(bRect.top - base.t + pad, Math.min(bRect.bottom - base.b - pad, ny));
      el.style.setProperty('--dx', nx + 'px'); el.style.setProperty('--dy', ny + 'px');
    });
    function end(){ on = false; el.classList.remove('drag'); }
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  });
  document.getElementById('tidy').addEventListener('click', function(){
    stickers.forEach(function(el){ el.classList.add('tidy'); el.style.setProperty('--dx','0px'); el.style.setProperty('--dy','0px'); });
    toast('All tidy');
  });
})();

/* animated background: faint dot grid, blinking pixels, and small falling pixel blocks */
(function(){
  var cv = document.getElementById('bgfx');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var STEP = 22, SIZE = 4;
  var COLORS = ['63,162,255','139,143,255','69,211,156','255,212,71'];
  var SHAPES = [[[0,0],[1,0],[2,0],[1,1]],[[0,0],[0,1],[1,1],[2,1]],[[0,0],[1,0],[0,1],[1,1]],
                [[0,0],[1,0],[2,0],[3,0]],[[0,0],[1,0],[1,1],[2,1]],[[0,0],[0,1],[0,2],[1,2]]];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W, H, dpr, cols, rows, dots, raf = 0, last = 0, nextFall = 0;
  var blinks = [], falls = [];

  function rnd(a, b){ return a + Math.random() * (b - a); }
  function pick(a){ return a[(Math.random() * a.length) | 0]; }
  function tint(){ return Math.random() < 0.18 ? { rgb: pick(COLORS), peak: rnd(.45,.7) } : { rgb: '255,255,255', peak: rnd(.18,.38) }; }

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cols = Math.ceil(W / STEP) + 1; rows = Math.ceil(H / STEP) + 1;
    dots = document.createElement('canvas'); dots.width = cv.width; dots.height = cv.height;
    var d = dots.getContext('2d'); d.scale(dpr, dpr); d.fillStyle = 'rgba(255,255,255,.075)';
    for (var x = 0; x < cols; x++) for (var y = 0; y < rows; y++){
      d.beginPath(); d.arc(x * STEP + 11, y * STEP + 11, 1.15, 0, 6.2832); d.fill();
    }
    blinks = blinks.filter(function(b){ return b.x < cols && b.y < rows; });
    if (reduce) drawStill();
  }

  function cell(x, y, rgb, a){
    if (a <= 0) return;
    ctx.fillStyle = 'rgba(' + rgb + ',' + a.toFixed(3) + ')';
    ctx.fillRect(x * STEP + 9, y * STEP + 9, SIZE, SIZE);
  }

  function base(){
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(dots, 0, 0, W, H);
  }

  function drawStill(){
    base();
    var n = Math.round(cols * rows / 90);
    for (var i = 0; i < n; i++){ var c = tint(); cell((Math.random()*cols)|0, (Math.random()*rows)|0, c.rgb, c.peak * .8); }
  }

  function frame(t){
    raf = requestAnimationFrame(frame);
    if (t - last < 33) return;
    last = t;
    base();

    var target = Math.round(cols * rows / 65);
    for (var s = 0; s < 3 && blinks.length < target; s++){
      var c = tint();
      blinks.push({ x: (Math.random()*cols)|0, y: (Math.random()*rows)|0, rgb: c.rgb, peak: c.peak, t0: t, dur: rnd(900, 2800) });
    }
    blinks = blinks.filter(function(b){
      var p = (t - b.t0) / b.dur;
      if (p >= 1) return false;
      cell(b.x, b.y, b.rgb, b.peak * Math.sin(Math.PI * p));
      return true;
    });

    if (t > nextFall && falls.length < 4){
      var c2 = Math.random() < 0.45 ? { rgb: pick(COLORS), peak: .6 } : { rgb: '255,255,255', peak: .42 };
      falls.push({ x: (Math.random() * (cols - 4)) | 0, y: (Math.random() * rows * .6) | 0, shape: pick(SHAPES),
                   rgb: c2.rgb, peak: c2.peak, t0: t, step: rnd(200, 320), steps: 5 + ((Math.random() * 5) | 0) });
      nextFall = t + rnd(1400, 3200);
    }
    falls = falls.filter(function(f){
      var e = (t - f.t0) / f.step, k = Math.floor(e);
      if (k >= f.steps) return false;
      var a = f.peak * Math.min(1, e) * Math.min(1, (f.steps - e) / 2);
      f.shape.forEach(function(p){
        cell(f.x + p[0], f.y + p[1] + k, f.rgb, a);
        cell(f.x + p[0], f.y + p[1] + k - 1, f.rgb, a * .28);
      });
      return true;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  if (!reduce){
    raf = requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', function(){
      if (document.hidden){ cancelAnimationFrame(raf); raf = 0; }
      else if (!raf){ last = 0; raf = requestAnimationFrame(frame); }
    });
  }
})();