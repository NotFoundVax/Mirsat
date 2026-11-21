// Mirsat page script: WhatsApp messages, the phone menu, the footer year, Arabic labels for the loop buttons.
(function () {
  // Each WhatsApp link opens a chat with its own first message. The number lives in the links' href
  // (966500000000 is a stand-in: replace it in index.html with the real number).
  var MESSAGES = {
    trial: 'مرحبًا، أبغى أبدأ التجربة المجانية لمِرساة.',
    basic: 'مرحبًا، أبغى أبدأ بباقة مِرساة الأساسية.',
    pro: 'مرحبًا، أبغى أبدأ بباقة مِرساة الاحترافية.',
    biz: 'مرحبًا، أبغى أعرف أكثر عن باقة مِرساة للأعمال.',
    help: 'مرحبًا، عندي سؤال عن مِرساة.'
  };
  document.querySelectorAll('a[data-wa]').forEach(function (a) {
    var text = MESSAGES[a.dataset.wa];
    if (!text) return;
    var url = new URL(a.href);
    url.searchParams.set('text', text);
    a.href = url.toString();
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Phone and tablet menu: a full-screen sheet; any tap on a link closes it, so does Esc.
  var nav = document.getElementById('nav');
  var toggle = nav.querySelector('.nav__toggle');
  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'القائمة');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
  nav.querySelectorAll('.nav__links a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', function (e) { if (e.matches) setOpen(false); });

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // motion.js names its pause buttons in English; give them the page's language.
  var AR = { 'Pause animation': 'إيقاف الحركة', 'Play animation': 'تشغيل الحركة' };
  function translate(btn) {
    var label = btn.getAttribute('aria-label');
    if (AR[label]) { btn.setAttribute('aria-label', AR[label]); btn.title = AR[label]; }
  }
  new MutationObserver(function (records) {
    records.forEach(function (r) {
      if (r.type === 'attributes' && r.target.classList && r.target.classList.contains('loop-pause')) translate(r.target);
      r.addedNodes && r.addedNodes.forEach(function (n) { if (n.classList && n.classList.contains('loop-pause')) translate(n); });
    });
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-label'] });
})();
