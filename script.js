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

// 선생님 페이지: 과목 필터
var tutorList = document.getElementById('tutor-list');
if (tutorList) {
  var chips = document.querySelectorAll('.chip');
  var empty = document.getElementById('tutor-empty');

  function filter(subject) {
    var shown = 0;
    tutorList.querySelectorAll('.tutor').forEach(function (t) {
      var match = !subject || t.dataset.subject === subject;
      t.hidden = !match;
      if (match) shown++;
    });
    chips.forEach(function (c) { c.classList.toggle('active', c.dataset.subject === subject); });
    empty.style.display = shown ? 'none' : 'block';
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () { filter(c.dataset.subject); });
  });

  var params = new URLSearchParams(location.search);
  filter(params.get('subject') || '');
}

// 상담 신청서: 아직 접수 서버가 없어 화면에만 완료 메시지를 보여줍니다.
var contactForm = document.getElementById('contact-form');
if (contactForm) {
  var params2 = new URLSearchParams(location.search);
  if (params2.get('subject')) contactForm.subject.value = params2.get('subject');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('form-msg').style.display = 'block';
    contactForm.reset();
  });
}
