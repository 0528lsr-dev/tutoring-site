// 선생님 목록 데이터
// 선생님을 추가하려면 아래 형식 그대로 한 줄씩 추가하세요.
//   name     : 표시할 이름 (예: "이○선")
//   gender   : "여" 또는 "남"
//   mode     : "방문", "화상", "방문+화상" 중 하나
//   subjects : [["과목", "대상"], ...]  과목은 유아·아동/국어/영어/수학/과학/사회/코딩
//   regions  : 방문 가능 지역 (예: ["서울 강남구", "경기 성남시 분당구"]). 화상만 하면 []
var TEACHERS = [
  { name: "박○옥", gender: "여", mode: "방문", subjects: [["영어", "초2~고3"]], regions: ["경북 포항 남구", "경북 포항 북구"] },
  { name: "오○아", gender: "여", mode: "화상", subjects: [["영어", "중3~고3"]], regions: [] },
  { name: "정○현", gender: "여", mode: "화상", subjects: [["국어", "초2~고3"], ["수학", "초2~고3"], ["사회", "초1~고2"]], regions: [] },
  { name: "안○희", gender: "여", mode: "화상", subjects: [["수학", "초1~고1"]], regions: [] },
  { name: "임○우", gender: "남", mode: "화상", subjects: [["수학", "초1~고3"]], regions: [] },
  { name: "박○진", gender: "여", mode: "화상", subjects: [["과학", "초1~고3"]], regions: [] },
  { name: "박○명", gender: "남", mode: "방문+화상", subjects: [["수학", "초4~고3"], ["과학", "중1~고3"]], regions: ["경기 남양주"] },
  { name: "김○원", gender: "남", mode: "화상", subjects: [["국어", "초1~고3"], ["영어", "초1~고3"], ["수학", "초1~고3"], ["과학", "초1~고3"], ["사회", "초1~고3"]], regions: [] },
  { name: "박○주", gender: "여", mode: "화상", subjects: [["영어", "초1~고3"]], regions: [] },
  { name: "최○수", gender: "남", mode: "방문+화상", subjects: [["과학", "초5~고3"]], regions: ["서울 송파구"] },
  { name: "권○현", gender: "남", mode: "화상", subjects: [["국어", "초3~고3"], ["영어", "초1~고3"], ["수학", "초1~고3"], ["과학", "초1~고3"], ["사회", "초1~고3"]], regions: [] },
  { name: "도○정", gender: "여", mode: "화상", subjects: [["영어", "초1~고1"], ["수학", "초1~고1"]], regions: [] }
];
