// 현재 페이지 메뉴에 표시
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// 메인 검색: 선택한 과목으로 선생님 페이지 이동
var search = document.getElementById('search-form');
if (search) {
  search.addEventListener('submit', function (e) {
    e.preventDefault();
    var subject = search.subject.value;
    var region = search.region.value;
    var q = [];
    if (subject) q.push('subject=' + encodeURIComponent(subject));
    if (region) q.push('region=' + encodeURIComponent(region));
    location.href = 'tutors.html' + (q.length ? '?' + q.join('&') : '');
  });
}

// 상담 신청서: 구글 시트(Apps Script)로 보내고 페이지 이동 없이 결과를 보여줍니다.
// Apps Script가 저장 후 'ok'를 돌려줄 때만 접수 완료로 안내합니다.
var SHEET_URL = 'https://script.google.com/macros/s/AKfycbx7cFmG03i-dpfj7IWynETu5Z2af_dla1qaA-Kt8KbFF28H-4Re684VpmO7vBSeaILU/exec';
var contactForm = document.getElementById('contact-form');
if (contactForm) {
  var params2 = new URLSearchParams(location.search);
  var subjectSelect = contactForm.querySelector('[name="subject"]');
  if (params2.get('subject')) subjectSelect.value = params2.get('subject');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = document.getElementById('form-msg');
    var btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = '보내는 중...';

    fetch(SHEET_URL, {
      method: 'POST',
      body: new URLSearchParams(new FormData(contactForm))
    }).then(function (res) {
      return res.text();
    }).then(function (text) {
      if (text.trim() !== 'ok') throw new Error('sheet: ' + text);
      msg.style.color = 'var(--accent)';
      msg.textContent = '신청이 접수되었습니다. 곧 연락드릴게요!';
      contactForm.reset();
    }).catch(function () {
      msg.style.color = '#c62828';
      msg.textContent = '전송에 실패했습니다. 잠시 후 다시 시도하시거나 010-5577-3067로 전화 주세요.';
    }).then(function () {
      msg.style.display = 'block';
      btn.disabled = false;
      btn.textContent = '상담 신청하기';
    });
  });
}
