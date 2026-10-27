/* 티쳐포유 — 간편선택 팝업 (생성기 출력물: 생성기 폴더, 본문은 지역과외/quickpick.js 공용). 손으로 고치지 말 것. */
window.QCFG={"ep":"https://script.google.com/macros/s/AKfycbx7cFmG03i-dpfj7IWynETu5Z2af_dla1qaA-Kt8KbFF28H-4Re684VpmO7vBSeaILU/exec","tab":"티쳐포유","site":"티쳐포유","area":"","tel":"010-5577-3067","telRaw":"01055773067","hasVisit":true,"dongs":[],"tiles":[["국어과외","📖","국어 내신·시험 대비를 학교 기준으로 준비합니다"],["영어과외","🔤","영어 내신·시험 대비를 학교 기준으로 준비합니다"],["수학과외","📐","수학 내신·시험 대비를 학교 기준으로 준비합니다"],["사회과외","🗺️","사회 내신·시험 대비를 학교 기준으로 준비합니다"],["과학과외","🔬","과학 내신·시험 대비를 학교 기준으로 준비합니다"],["한국사과외","🏯","한국사 내신·시험 대비를 학교 기준으로 준비합니다"],["물리과외","⚛️","물리 내신·시험 대비를 학교 기준으로 준비합니다"],["화학과외","🧪","화학 내신·시험 대비를 학교 기준으로 준비합니다"],["생물과외","🧬","생물 내신·시험 대비를 학교 기준으로 준비합니다"],["코딩과외","💻","코딩 내신·시험 대비를 학교 기준으로 준비합니다"],["영어회화과외","💬","원어민·교포 선생님과 전화·화상으로"]],"grades":["초1","초2","초3","초4","초5","초6","중1","중2","중3","고1","고2","고3·재수생","성인"],"links":[["학교찾기","https://teacher4u.co.kr/pages/학교찾기.html"],["선생님 보기","https://teacher4u.co.kr/teachers.html"],["회화 과외","https://teacher4u.co.kr/conversation/index.html"]]};
try { if (/[?&]nopop/.test(location.search)) sessionStorage.setItem('qpick', '1'); } catch (_) {}

(function(){
  var C = window.QCFG;
  var TILES = C.tiles, GRADES = C.grades;

  function el(tag, cls, html){ var e = document.createElement(tag); if(cls) e.className = cls; if(html != null) e.innerHTML = html; return e; }
  function esc(s){ return String(s == null ? '' : s).replace(/[<>&"]/g, function(c){ return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }

  function build(){
    var box = el('div', 'quick');
    box.innerHTML =
      '<button type="button" class="q-close" aria-label="닫기">✕</button>' +
      '<div class="q-step q-s1 on">' +
        '<div class="q-title">어떤 도움이 필요하세요?<small>과목만 고르시면 맞는 선생님을 찾아 연락드립니다</small></div>' +
        '<div class="q-tiles">' +
          TILES.map(function(t){
            return '<button type="button" data-s="' + esc(t[0]) + '" data-h="' + esc(t[2]) + '"><b>' + t[1] + '</b>' + esc(t[0]) + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="q-step q-s2">' +
        '<button type="button" class="q-back">← 다시 고르기</button>' +
        '<div class="q-chosen"></div><div class="q-hint"></div>' +
        '<span class="q-lbl">학년</span>' +
        '<div class="q-chips q-grades">' + GRADES.map(function(g){ return '<button type="button">' + esc(g) + '</button>'; }).join('') + '</div>' +
        (C.hasVisit ? '<span class="q-lbl">수업 방식</span><div class="q-chips q-modes"><button type="button">방문수업</button><button type="button">화상수업</button><button type="button">상관없음</button></div>' : '') +
        '<span class="q-lbl">연락처</span>' +
        '<div class="q-row2">' +
          '<input type="text" id="q_name" placeholder="이름 *" autocomplete="name">' +
          '<input type="tel" id="q_phone" placeholder="연락처 *" autocomplete="tel">' +
        '</div>' +
        /* 2026-10-04 사용자 요청: 학교·주소·특이사항 모두 필수 */
        '<input type="text" id="q_school" placeholder="학교 *">' +
        '<input type="text" id="q_addr" placeholder="주소 (자택 도로명 주소) *" autocomplete="street-address">' +
        '<textarea id="q_memo" placeholder="특이사항 * (원하시는 요일·시간, 아이 상황 등)"></textarea>' +
        '<button type="button" class="q-submit">바로 신청하기</button>' +
      '</div>' +
      '<div class="q-step q-s3">' +
        '<div class="q-done"><b>✅ 신청이 접수되었습니다</b>' +
          '<p>확인 후 곧 연락드리겠습니다.<br>급하시면 <a href="tel:' + C.telRaw + '">' + C.tel + '</a> 로 전화 주세요.</p>' +
          '<div class="q-links"><div class="q-lt">연락 기다리는 동안 둘러보세요 👀</div><div class="q-llist">' +
            C.links.map(function(l){ return '<a href="' + l[1] + '">' + esc(l[0]) + '</a>'; }).join('') +
          '</div></div>' +
        '</div>' +
      '</div>';
    return box;
  }

  function init(){
    var modal = el('div', 'q-modal');
    var box = build();
    modal.appendChild(box);
    document.body.appendChild(modal);

    var s1 = box.querySelector('.q-s1'), s2 = box.querySelector('.q-s2'), s3 = box.querySelector('.q-s3');
    var subject = '', grade = '', mode = '';
    function show(x){ [s1, s2, s3].forEach(function(e){ e.classList.remove('on'); }); x.classList.add('on'); }
    function open(){ modal.classList.add('open'); if (typeof gtag === 'function') gtag('event', 'quick_open'); }
    function close(){ modal.classList.remove('open'); }

    /* 여는 버튼: 페이지에 #quickOpen 이 있으면 그것, 없으면 왼쪽 아래 작은 버튼 */
    var opener = document.getElementById('quickOpen');
    if (opener) opener.addEventListener('click', open);
    else {
      var fab = el('button', 'q-fab', '⚡ 어떤 도움이 필요하세요?');
      fab.type = 'button';
      fab.addEventListener('click', open);
      document.body.appendChild(fab);
    }
    box.querySelector('.q-close').addEventListener('click', close);
    modal.addEventListener('click', function(e){ if (e.target === modal) close(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });

    /* 처음 들어온 방문자에게만 한 번 자동으로 연다(같은 방문 중에는 다시 열지 않음) */
    try {
      if (!sessionStorage.getItem('qpick')) {
        sessionStorage.setItem('qpick', '1');
        setTimeout(open, 1400);
      }
    } catch (_) {}

    box.querySelectorAll('.q-tiles [data-s]').forEach(function(b){
      b.addEventListener('click', function(){
        subject = b.getAttribute('data-s');
        box.querySelector('.q-chosen').textContent = subject;
        box.querySelector('.q-hint').textContent = b.getAttribute('data-h') || '';
        show(s2);
        if (typeof gtag === 'function') gtag('event', 'quick_pick', { tile: subject });
      });
    });
    box.querySelector('.q-back').addEventListener('click', function(){ show(s1); });

    function chips(sel, set){
      var list = box.querySelectorAll(sel + ' button');
      list.forEach(function(b){
        b.addEventListener('click', function(){
          list.forEach(function(x){ x.classList.remove('sel'); });
          b.classList.add('sel'); set(b.textContent);
        });
      });
    }
    chips('.q-grades', function(v){ grade = v; });
    if (C.hasVisit) chips('.q-modes', function(v){ mode = v; });

    box.querySelector('.q-submit').addEventListener('click', function(){
      var btn = this;
      var v = function(id){ var e = document.getElementById(id); return e ? e.value.trim() : ''; };
      var name = v('q_name'), phone = v('q_phone');
      var need = [['q_name', '이름'], ['q_phone', '연락처'], ['q_school', '학교'], ['q_addr', '주소'], ['q_memo', '특이사항']];
      for (var i = 0; i < need.length; i++) {
        if (!v(need[i][0])) { alert(need[i][1] + '을(를) 입력해 주세요.'); document.getElementById(need[i][0]).focus(); return; }
      }
      btn.disabled = true; btn.textContent = '접수 중…';
      var memo = v('q_memo');
      /* form.js 와 같은 항목 이름으로 보내야 같은 시트 칸에 들어간다  */
      var d = new URLSearchParams({
        sheet: C.tab, _form: C.site, _time: new Date().toLocaleString('ko-KR'),
        사이트: C.site, 지역: C.area,
        이름: name, 연락처: phone, 학교: v('q_school'),
        학년: grade, 과목: subject, 수업방식: (mode || (C.hasVisit ? '' : '화상수업')),
        주소: v('q_addr'), 선생님성별: '',
        남길말: '[간편선택] ' + memo,
        신청페이지: location.origin + location.pathname,
        /* 영문 이름 — 티쳐포유 Apps Script 는 영문 키만 읽는다(2026-10-27). 한글 키와 같이 보낸다 */
        name: name, phone: phone, grade: grade, subject: subject, address: v('q_addr'),
        memo: '[간편선택] 학교: ' + v('q_school') + (mode ? ' / ' + mode : '') + ' / ' + memo + ' / ' + location.pathname
      });
      fetch(C.ep, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: d.toString()
      }).catch(function(){});
      if (typeof gtag === 'function') gtag('event', 'quick_submit', { tile: subject, grade: grade });
      show(s3);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
