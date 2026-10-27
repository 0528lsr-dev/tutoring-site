// Google Analytics 4 — 측정 ID 를 발급받으면 sites.js 의 gaId 에 넣고 재생성 ()
(function () {
  var GA_ID = "";
  if (!GA_ID) return;
  var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || []; function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag; gtag('js', new Date()); gtag('config', GA_ID);
})();
// 네이버 애널리틱스 — 사이트 ID 는 sites.js 의 naverWa (2026-10-21, 네이버 검색어별 유입을 보려고 추가. 구글은 네이버 검색어를 못 본다)
(function () {
  var WA = "";
  if (!WA) return;
  window.wcs_add = window.wcs_add || {}; window.wcs_add["wa"] = WA;
  var s = document.createElement('script'); s.src = 'https://wcs.pstatic.net/wcslog.js';
  s.onload = function () { if (window.wcs) { try { window.wcs_do(); } catch (e) {} } };
  document.head.appendChild(s);
})();

