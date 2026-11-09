// 관리자 데모용 저장소: 이 기기의 브라우저(localStorage)에만 저장됩니다.
// 실제 서비스에서는 이 부분을 서버(예: Supabase)로 바꾸면 모든 손님에게 보입니다.
var SalonStore = (function () {
  var KEY = 'salonDemo.v2';
  var MENUS = [
    { en: 'Hair', ko: '헤어', items: [['디자인 커트', '샴푸 · 드라이 포함'], ['새치 커버 컬러', '두피 자극을 줄인 저자극 약제'], ['볼륨 · C컬 펌', '정수리 볼륨과 자연스러운 컬'], ['모발 클리닉', '손상 정도에 따라 단계별 진행'], ['두피 스파', '각질 · 혈행 케어, 약 [시간]']] },
    { en: 'Brow', ko: '눈썹 반영구', items: [['자연 결눈썹', '한 올씩 그리는 결 표현'], ['섀도우 눈썹', '은은한 메이크업 효과'], ['콤보 눈썹', '결과 섀도우를 함께'], ['잔흔 커버', '변색된 기존 문신 보정, 상담 후 결정'], ['리터치', '[리터치 기간 · 조건]']] }
  ];
  var SEED = {
    posts: [
      { id: 2, title: '[예시] 연말 휴무 안내', body: '[휴무 날짜]는 쉬어갑니다. 예약은 네이버 예약이나 카카오톡으로 남겨주세요.', img: 'img/c3.jpg', date: '예시' },
      { id: 1, title: '[예시] 가을 두피 케어 이벤트', body: '[이벤트 내용과 기간을 적어주세요.]', img: 'img/k3.jpg', date: '예시' }
    ],
    works: [
      { id: 106, title: '레이어드 단발', cat: 'hair', img: 'img/pf1.jpg' },
      { id: 105, title: '자연 결눈썹', cat: 'brow', img: 'img/pf4.jpg' },
      { id: 104, title: 'C컬 미디엄 펌', cat: 'hair', img: 'img/pf2.jpg' },
      { id: 103, title: '그레이 헤어 스타일링', cat: 'hair', img: 'img/pf3.jpg' },
      { id: 102, title: '섀도우 눈썹', cat: 'brow', img: 'img/pf5.jpg' },
      { id: 101, title: '롱 스트레이트', cat: 'hair', img: 'img/pf6.jpg' }
    ],
    prices: {}
  };
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var d = JSON.parse(raw); d.posts = d.posts || []; d.works = d.works || []; d.prices = d.prices || {}; return d; }
    } catch (e) {}
    return JSON.parse(JSON.stringify(SEED));
  }
  function save(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; }
  }
  return { MENUS: MENUS, load: load, save: save, reset: reset };
})();
