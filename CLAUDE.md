# 티쳐포유 (tutoring-site) — 전국 학교×과목 과외 사이트

- 도메인: teacher4u.co.kr (CNAME). 정적 사이트(GitHub Pages 등), 빌드 없음(.nojekyll).
- **이 폴더의 거의 모든 파일은 생성기 출력물이다**(생성기 폴더의 sites.js 설정 · run.js 실행). 손으로 고치면 재생성 때 덮어써진다. 고칠 게 있으면 생성기를 고치고 `ONLY=tutoring-site` 로 재생성.
- 새 글은 `data/posts/{blog|admissions}/{slug}.json` 에만 쓴다 — { slug, date, cat, title, desc, keywords, body(HTML) }. 그다음 `새글.js tutoring-site` 를 돌리면 글 페이지·목록·홈·RSS·sitemap-main 이 다시 그려진다(1~2초). blog/·admissions/ 의 HTML 을 손으로 쓰지 않는다.
- 구조: 홈 / regions.html(지역과외) / pages/학교찾기.html·중학교찾기.html / pages/{약칭}-과외.html(학교 허브) / pages/{약칭}-{과목}-과외.html / pages/{시도}-{시군구}-과외.html / pages/{과목}과외-전체.html / teachers.html + t/{id}.html / conversation/ (회화 4개 언어) / blog.html / admissions.html / contact.html
- 학교 이름 규칙: 제목·URL 은 약칭, 본문 첫 문장에 정식 명칭. 약칭이 겹치는 학교는 `약칭-지역` 파일명. **발행 뒤 제목·주소를 바꾸지 않는다.**
- 상담: 폼 → Apps Script(run.js 의 HUB, `sheet=티쳐포유`) · 채널톡(sites.js channelKey, 비어 있으면 버튼 없음) · 카카오 오픈채팅(kakao) · 전화(sites.js TEL).
- 사이트맵: sitemap.xml(index) → sitemap-main / sitemap-high / sitemap-mid / sitemap-teachers. IndexNow 키 파일 `673887ea8690d0052e5f93b06b69facd.txt`.
- CSS/JS 를 고치면 `?v=` 올리기(생성기 build.js head() 의 style.css?v=).
