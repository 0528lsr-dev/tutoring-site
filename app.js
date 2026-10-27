/* 공용 동작 — 모바일 메뉴 · 학교 검색 · 선생님 필터 (생성기 출력물, 손으로 고치지 말 것) */
(function(){
  var norm = function(s){ return String(s||'').replace(/\s+/g,'').toLowerCase(); };
  var mb = document.querySelector('[data-menu]'), mn = document.querySelector('[data-mnav]');
  if (mb && mn) {
    /* 모바일 메뉴: 데스크톱 목록(.nav-links)을 복사해 한 번만 만든다 */
    var built = false;
    mb.addEventListener('click', function(){
      if (!built) {
        built = true; var h = '';
        [].slice.call(document.querySelectorAll('.nav-links > li')).forEach(function(li){
          var a = li.querySelector(':scope > a'); h += '<a href="' + a.getAttribute('href') + '">' + a.textContent + '</a>';
          var sub = li.querySelector('.sub'); if (sub) h += '<div class="m-sub">' + sub.innerHTML + '</div>';
        });
        mn.innerHTML = h + '<a href="' + mn.dataset.tel + '">상담신청 · 010-5577-3067</a>';
      }
      mn.classList.toggle('open');
    });
  }

  /* 학교 목록 검색: 학교 이름 또는 시·군·구 이름으로 거른다. 시군구 이름이 맞으면 그 줄 전체를 보여 준다.
     빈 시군구 줄·빈 시도 묶음은 숨긴다. 주소에 ?q=동래고 가 있으면(search 히어로의 홈 검색창) 바로 거른다. */
  var q = document.getElementById('q'), finder = document.getElementById('finder');
  if (q && finder) {
    var cities = [].slice.call(finder.querySelectorAll('[data-city]')), blocks = [].slice.call(finder.querySelectorAll('[data-block]'));
    var cnt = document.getElementById('cnt');
    var run = function(){
      var v = norm(q.value), n = 0;
      cities.forEach(function(c){
        var cityHit = v && norm(c.querySelector('h3 a').textContent).indexOf(v) > -1, any = false;
        [].slice.call(c.querySelectorAll('.sgrid a')).forEach(function(a){
          var ok = !v || cityHit || norm(a.textContent).indexOf(v) > -1;
          a.classList.toggle('is-off', !ok); if (ok) { any = true; n++; }
        });
        c.classList.toggle('is-off', !any);
      });
      blocks.forEach(function(b){ b.classList.toggle('is-off', !b.querySelector('[data-city]:not(.is-off)')); });
      if (cnt) {
        if (!v) cnt.innerHTML = '';
        else if (n) cnt.textContent = n + '개 학교';
        else if (q.dataset.other) cnt.innerHTML = '없습니다 — <a href="' + q.dataset.other + '?q=' + encodeURIComponent(q.value) + '">' + q.dataset.otherName + '에서 찾기 →</a>';
        else cnt.textContent = '없습니다';
      }
    };
    q.addEventListener('input', run);
    try { var pre = new URLSearchParams(location.search).get('q'); if (pre) { q.value = pre; run(); } } catch (_) {}
  }

  /* 시도 탭 (홈 지역 목록): 버튼을 누르면 그 시도 상자만 보인다 (HTML 에는 전부 들어 있어 검색엔진은 다 읽는다) */
  [].slice.call(document.querySelectorAll('[data-tabs]')).forEach(function(bar){
    var panels = [].slice.call(bar.parentNode.querySelectorAll('[data-panel]'));
    bar.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b) return;
      [].slice.call(bar.children).forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      panels.forEach(function(p){ p.classList.toggle('is-off', p.dataset.panel !== b.dataset.tab); });
    });
  });

  /* 선생님 필터 */
  var grid = document.getElementById('tgrid');
  if (grid) {
    var cards = [].slice.call(grid.children), state = { s: '', c: '', sd: '' }, tc = document.getElementById('tcnt');
    var apply = function(){
      var n = 0;
      cards.forEach(function(c){
        var ok = (!state.s || (c.dataset.s||'').split(',').indexOf(state.s) > -1) && (!state.c || (c.dataset.c||'').indexOf(state.c) > -1) && (!state.sd || c.dataset.sd === state.sd || (state.c !== '방문' && c.dataset.sd === '전국'));
        c.classList.toggle('hidden', !ok); if (ok) n++;
      });
      if (tc) tc.textContent = n;
    };
    [].slice.call(document.querySelectorAll('[data-filter]')).forEach(function(group){
      var key = group.dataset.filter;
      group.addEventListener('click', function(e){
        var b = e.target.closest('button'); if (!b) return;
        [].slice.call(group.children).forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        state[key] = b.dataset.v || ''; apply();
      });
    });
  }

  /* 상담 페이지 — 채팅 카드는 채널톡 버튼을 눌러 준다 */
  var chat = document.querySelector('[data-way="실시간 채팅"]');
  if (chat) chat.addEventListener('click', function(e){ e.preventDefault(); var b = document.querySelector('.ch-fab'); if (b) b.click(); });
})();
