/* 티쳐포유 — 상담 신청 → 구글 시트 "웹 문의" (허브 Apps Script, sheet=티쳐포유)  ※ 생성기 출력물(생성기 폴더) — 손으로 고치지 말 것
   탭 이름을 바꾸려면 sites.js 의 sheetTab 을 고치고 재생성. 오타가 나면 시트에 새 탭이 조용히 생긴다. */
var SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbx7cFmG03i-dpfj7IWynETu5Z2af_dla1qaA-Kt8KbFF28H-4Re684VpmO7vBSeaILU/exec";
var SHEET_TAB = "티쳐포유";
var SITE_NAME = "티쳐포유";
(function(){
  function val(id){ var el = document.getElementById(id); return el ? String(el.value).trim() : ""; }
  function send(payload){
    return fetch(SHEET_ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body: new URLSearchParams(payload).toString() });
  }
  var tParam = new URLSearchParams(location.search).get("t") || "";
  [].slice.call(document.querySelectorAll("form[id]")).forEach(function(form){
    var id = form.id;
    if (!document.getElementById(id + "_name")) return;
    if (tParam) { var memo = document.getElementById(id + "_memo"); if (memo && !memo.value) memo.value = "선생님 번호 " + tParam + " 상담 희망"; }
    form.addEventListener("submit", async function(e){
      e.preventDefault();
      var req = ["_name","_phone","_school","_grade","_subject"];
      for (var i = 0; i < req.length; i++){
        if (!val(id + req[i])) { alert("필수 항목을 모두 입력해 주세요."); var el = document.getElementById(id + req[i]); if (el) el.focus(); return; }
      }
      var payload = {
        sheet: SHEET_TAB, _form: SITE_NAME, _time: new Date().toLocaleString("ko-KR"),
        사이트: SITE_NAME, 지역: val(id+"_area"),
        이름: val(id+"_name"), 연락처: val(id+"_phone"), 학교: val(id+"_school"),
        학년: val(id+"_grade"), 과목: val(id+"_subject"), 수업방식: val(id+"_mode"),
        읍면동: val(id+"_area"), 선생님성별: val(id+"_gender"), 남길말: val(id+"_memo"),
        신청페이지: location.origin + location.pathname,
        /* 영문 이름 — 티쳐포유 Apps Script 는 영문 키만 읽는다(2026-10-27). 한글 키와 같이 보낸다 */
        name: val(id+"_name"), phone: val(id+"_phone"), grade: val(id+"_grade"), subject: val(id+"_subject"), address: val(id+"_area"),
        memo: "학교: " + val(id+"_school") + (val(id+"_mode") ? " / " + val(id+"_mode") : "") + (val(id+"_gender") ? " / 선생님 " + val(id+"_gender") : "") + (val(id+"_memo") ? " / " + val(id+"_memo") : "") + " / " + location.pathname
      };
      var btn = form.querySelector('button[type="submit"]'); var orig = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "접수 중…"; }
      try { await send(payload); } catch (_) {}
      var ok = document.getElementById(id + "_ok"); if (ok) ok.style.display = "block";
      if (btn) btn.textContent = "신청 완료 ✓";
      if (typeof gtag === "function") gtag("event", "form_submit", { form: id });
    });
  });
})();
