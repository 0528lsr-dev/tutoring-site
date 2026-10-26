// 선생님 페이지: 검색 + 필터 + 목록
(function () {
  var list = document.getElementById('tutor-list');
  if (!list || typeof TEACHERS === 'undefined') return;

  var PAGE = 30;
  var COLORS = ['#e94f78', '#3f9b6e', '#e8873a', '#7b6fd6', '#2f8fc4', '#c2509d', '#b08a1e'];
  var state = { mode: '', subject: '', region: '', gender: '', q: '', shown: PAGE };

  var countEl = document.getElementById('tutor-count');
  var emptyEl = document.getElementById('tutor-empty');
  var moreBtn = document.getElementById('tutor-more');
  var input = document.getElementById('tutor-q');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // 검색 색인(teachers-search.js)은 늦게 로드될 수 있어 매번 확인
  function haystack(t) {
    var extra = (window.TSEARCH && t.id && window.TSEARCH[t.id]) || '';
    return [t.name, t.gender + '선생님', t.mode, t.kid ? '유아·아동 유아 아동' : '', extra]
      .concat(t.subjects.map(function (s) { return s.join(' '); }))
      .concat(t.regions.length ? t.regions : ['전국 화상'])
      .join(' ').toLowerCase();
  }

  function matches(t) {
    if (state.mode === '방문+화상' && t.mode !== '방문+화상') return false;
    if (state.mode && state.mode !== '방문+화상' && t.mode.indexOf(state.mode) < 0) return false;
    if (state.subject === '유아·아동') { if (!t.kid) return false; }
    else if (state.subject && !t.subjects.some(function (s) { return s[0] === state.subject; })) return false;
    if (state.region && !t.regions.some(function (r) { return r.indexOf(state.region) === 0; })) return false;
    if (state.gender && t.gender !== state.gender) return false;
    if (state.q) {
      var h = haystack(t);
      var words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!words.every(function (w) { return h.indexOf(w) >= 0; })) return false;
    }
    return true;
  }

  function card(t, i) {
    var color = COLORS[i % COLORS.length];
    var tags = (t.kid ? '<span class="tag tag-kid">유아·아동</span>' : '') + t.subjects.map(function (s) {
      return '<span class="tag">' + esc(s[0] + ' ' + s[1]) + '</span>';
    }).join('');
    var who = (t.gender ? esc(t.gender) + '선생님' : '선생님') + ' · ' + esc(t.mode);
    var where = t.regions.length ? t.regions.join(', ') : '전국 화상 수업';
    return '<article class="tutor">' +
      '<div class="tutor-top"><div class="avatar" style="color:' + color + ';border-color:' + color + '55">' + esc(t.name.charAt(0)) + '</div>' +
      '<div><b>' + esc(t.name) + ' 선생님</b><span>' + who + '</span></div></div>' +
      '<div class="tags">' + tags + '</div>' +
      '<p class="where">📍 ' + esc(where) + '</p>' +
      '<div class="tutor-foot"><span class="muted-sm">무료 체험 수업 가능</span>' +
      '<a href="contact.html?subject=' + encodeURIComponent(t.subjects[0] ? t.subjects[0][0] : '') + '">상담하기 →</a></div>' +
      '</article>';
  }

  function render() {
    var found = TEACHERS.filter(matches);
    countEl.textContent = found.length.toLocaleString();
    list.innerHTML = found.slice(0, state.shown).map(card).join('');
    emptyEl.style.display = found.length ? 'none' : 'block';
    moreBtn.style.display = found.length > state.shown ? 'inline-flex' : 'none';
    document.querySelectorAll('.filter-row').forEach(function (row) {
      var key = row.dataset.key;
      row.querySelectorAll('.chip').forEach(function (c) {
        c.classList.toggle('active', c.dataset.value === state[key]);
      });
    });
  }

  document.querySelectorAll('.filter-row').forEach(function (row) {
    row.addEventListener('click', function (e) {
      var c = e.target.closest('.chip');
      if (!c) return;
      state[row.dataset.key] = c.dataset.value;
      state.shown = PAGE;
      render();
    });
  });

  document.getElementById('tutor-search').addEventListener('submit', function (e) {
    e.preventDefault();
    state.q = input.value.trim();
    state.shown = PAGE;
    render();
  });
  input.addEventListener('input', function () {
    state.q = input.value.trim();
    state.shown = PAGE;
    render();
  });

  moreBtn.addEventListener('click', function () {
    state.shown += PAGE;
    render();
  });

  // 메인 검색이나 과목 페이지에서 넘어온 조건 적용
  var params = new URLSearchParams(location.search);
  state.subject = params.get('subject') || '';
  var region = params.get('region') || '';
  if (region === '온라인 수업') state.mode = '화상';
  else state.region = region;

  // 검색 색인 로드가 끝나면 teachers-search.js 가 이 함수를 호출
  window.__tRefresh = render;

  render();
})();
