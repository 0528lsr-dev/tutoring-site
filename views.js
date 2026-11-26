// ===== 글 조회수 — 티쳐포유 =====
(function () {
  var HOOK = "https://script.google.com/macros/s/AKfycbx0OYTlYeAL3Cx7zomYSOr0jc6uzZ4p7nTQ1y8Qw9LFm0r6q0rYs7LdYT4yULmJheIm/exec";
  var els = [].slice.call(document.querySelectorAll('.views[data-v]'));
  if (!els.length) return;
  function show(map) {
    els.forEach(function (el) { var n = map[el.getAttribute('data-v')]; if (n == null) return; el.querySelector('b').textContent = Number(n).toLocaleString('ko-KR'); el.hidden = false; });
  }
  var ua = navigator.userAgent || '', bot = navigator.webdriver || /bot|crawl|spider|slurp|yeti|daum|lighthouse|headless|preview|externalhit|meta-external/i.test(ua);
  var mine = false; try { mine = !!localStorage.getItem('novisit'); } catch (e) {}
  var hitEl = document.querySelector('.views[data-hit]'), id = hitEl && hitEl.getAttribute('data-v'), seen = false;
  try { seen = !!sessionStorage.getItem('vw_' + id); } catch (e) {}
  var url = (hitEl && !bot && !mine && !seen) ? HOOK + '?a=hit&id=' + encodeURIComponent(id)
    : HOOK + '?ids=' + encodeURIComponent(els.map(function (el) { return el.getAttribute('data-v'); }).join(','));
  fetch(url).then(function (r) { return r.json(); }).then(function (map) {
    if (hitEl) { try { sessionStorage.setItem('vw_' + id, '1'); } catch (e) {} }
    show(map);
  }).catch(function () {});
})();
