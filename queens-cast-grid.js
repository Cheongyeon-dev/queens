(function (global) {
  "use strict";

  var CAST_FACTIONS = [
    { id: "academy", title: "아르카나 아카데미", short: "아카데미", note: "테이블 등장(AR·RN)은 손님 · 소속은 아카데미", chars: [
      { code: "CM", name: "카미유", en: "Camille", role: "학장 · 마도공학" },
      { code: "AR", name: "아르카나", en: "Arcana", role: "교수 · 타로 · 아르카나 마법 · 블랙잭 메인 테이블", cardFile: "queens_아르카나.png" },
      { code: "MI", name: "미하엘", en: "Michael", role: "본관 기숙사 사감 · 아카데미 경비대장", cardFile: "queens_Michael_미하엘.png" },
      { code: "EM", name: "엠마", en: "Emma", role: "별관 기숙사 사감", cardFile: "queens_Emma_엠마.png" },
      { code: "BR", name: "블레어", en: "Blair", role: "교수 · 점성술 · 마검술" },
      { code: "YU", name: "유리엔", en: "Yurien", role: "학생회장 · 4학년", cardFile: "queens_Yurien_유리엔.png" },
      { code: "HG", name: "휴고", en: "Hugo", role: "4학년 · 학생회", cardFile: "queens_Hugo_휴고.png" },
      { code: "RX", name: "록산느", en: "Roxanne", role: "4학년 · 전 학생회장", cardFile: "queens_Roxanne_록산느.png" },
      { code: "SL", name: "셀레스테", en: "Celeste", role: "3학년 · 메이저 3대 가문 '태양' 영애", cardFile: "queens_Celeste_셀레스테.png" },
      { code: "YS", name: "유세프", en: "Youssef", role: "3학년 · 포커페이스", cardFile: "queens_Youssef_유세프.png" },
      { code: "CT", name: "캐서린", en: "Catherine", role: "AU · 유학생 · 3학년", cardFile: "queens_Catherine_캐서린.png" },
      { code: "GI", name: "지젤", en: "Giselle", role: "2학년", cardFile: "queens_Giselle_지젤.png" },
      { code: "SH", name: "채서하", en: "Chae Seoha", role: "AU · 유학생 · 2학년", cardFile: "queens_채서하.png" },
      { code: "RN", name: "르네", en: "Rene", role: "2학년 · 블랙잭 퀸즈 단골", cardFile: "queens_르네.png" },
      { code: "SD", name: "서도윤", en: "Seo Doyoon", role: "유학생 · 1학년", cardFile: "queens_서도윤.png" },
      { code: "HO", name: "이성후", en: "Lee Seonghu", role: "1학년 · 유학생 · 쌍둥이(형)", cardFile: "queens_이성후.png" },
      { code: "HN", name: "이성한", en: "Lee Seonghan", role: "1학년 · 유학생 · 쌍둥이(동생)", cardFile: "queens_이성한.png" },
    ]},
    { id: "lerose", title: "르 로즈", short: "르 로즈", chars: [
      { code: "RS", name: "로제타", en: "Rosetta", role: "꽃집 주인 · 아르카나 여사제", cardFile: "queens_Rosetta_로제타.png" },
    ]},
    { id: "lounge", title: "블랙잭 퀸즈 · 라 라핀 루즈", short: "라운지", chars: [
      { code: "LO", name: "루이", en: "Louis", role: "라 라핀 루즈 사장", cardFile: "queens_Louis_루이.png" },
      { code: "LX", name: "렉시", en: "Lexie", role: "매니저 · 바니걸", cardFile: "queens_Lexi_렉시.png" },
      { code: "TX", name: "트릭시", en: "Trixie", role: "서빙 · 바니걸", cardFile: "queens_Trixie_트릭시.png" },
      { code: "NA", name: "애나", en: "Anna", role: "라 라핀 루즈 신입 서버", cardFile: "queens_ANNA_애나.png" },
      { code: "AN", name: "아네스", en: "Agnes", role: "바텐더", cardFile: "queens_Agn_s_아네스.png" },
    ]},
    { id: "casino", title: "블랙잭 퀸즈 · 카지노", short: "카지노", chars: [
      { code: "VA", name: "발레리", en: "Valerie", role: "카지노 핏 보스 · 아르카나 여사제", cardFile: "queens_Valerie_발레리.png" },
      { code: "DH", name: "신도화", en: "Shin Dohwa", role: "방문객 · 뮤지컬 배우 · 오페라 가수 · 라운지 바", cardFile: "queens_신도화.png" },
    ]},
    { id: "table", title: "메인 테이블 · 블랙잭", short: "메인 테이블", chars: [
      { code: "BK", name: "백설아", en: "Baek Seola", role: "딜러", cardFile: "queens_백설아.png" },
      { code: "HY", name: "설하영", en: "Seol Hayoung", role: "관광객 손님", cardFile: "queens_설하영.png" },
    ]},
    { id: "vip", title: "VIP 포커", short: "VIP", chars: [
      { code: "MU", name: "뮤리엘", en: "Muriel", role: "극작가", cardFile: "queens_Muireal_뮤리엘.png" },
      { code: "BL", name: "블랑슈", en: "Blanche", role: "오페라 가수", cardFile: "queens_Blanche_블랑슈.png" },
      { code: "CE", name: "클레망", en: "Clement", role: "도슨트", cardFile: "queens_Cl_men_클레망.png" },
      { code: "LN", name: "셀린", en: "Celine", role: "오페라하우스 오너", cardFile: "queens_C_line_셀린_.png" },
      { code: "LI", name: "릴리스", en: "Lilith", role: "메이저 3대 가문 '악마' 막내 딸", cardFile: "queens_Lilith_릴리스.png" },
    ]},
    { id: "circus", title: "그랑 델리리움", short: "델리리움", chars: [
      { code: "BE", name: "벨라돈나", en: "Belladonna", role: "극단주", cardFile: "queens_Belladonna_벨라돈나.png" },
      { code: "CR", name: "샤를로트", en: "Charlotte", role: "곡예사", cardFile: "queens_Charlotte_샤를로트.png" },
      { code: "VI", name: "비올레트", en: "Violette", role: "곡예사", cardFile: "queens_Violette_비올레트.png" },
      { code: "CA", name: "카르멘", en: "Carmen", role: "마수사육사", cardFile: "queens_Carmen_카르멘.png" },
    ]},
    { id: "city", title: "도시 · 엑스트라", short: "도시", chars: [
      { code: "RO", name: "로잘리", en: "Rosalie", role: "대마녀의 수하인 · 정원사 · 아르카나 여사제", cardFile: "queens_Rosalie_로잘리.png" },
      { code: "MY", name: "마리즈", en: "Maryse", role: "수로 관리인", cardFile: "queens_Maryse_마리즈.png" },
      { code: "AM", name: "아르망", en: "Armand", role: "경비대장 · 집행관", cardFile: "queens_Armand_아르망.png" },
      { code: "OB", name: "오베리아", en: "Oberia", role: "퀸즈로드 경비대원 · 마법부 순경", cardFile: "queens_Oberia_오베리아.png" },
      { code: "LA", name: "로랑", en: "Laurent", role: "호텔 지배인", cardFile: "queens_Laurent_로랑.png" },
      { code: "LU", name: "루시", en: "Lucy", role: "점술가" },
      { code: "VC", name: "뱅상", en: "Vincent", role: "정보상 · 사채업자", cardFile: "queens_Vincent_뱅상.png" },
    ]},
  ];

  var CAST_MALE_NO_SITUATION = { VC: 1, YS: 1, HO: 1, HN: 1, HG: 1 };
  var CAST_ASSET_PENDING_CODES = { BR: 1, MI: 1, VA: 1, GI: 1, AN: 1 };
  var CAST_YURI_ONLY_CODES = { RS: 1 };
  var CAST_NO_SITUATION_LABEL = "상황 에셋 미지원";
  var CAST_ASSET_PENDING_LABEL = "상황 에셋 미지원·추후 업데이트 예정";
  var CAST_YURI_ONLY_LABEL = "여캐플 전용";

  function editorSafeName(value) {
    return String(value || "").replace(/[^\w가-힣.-]+/g, "_");
  }

  function cardFileCandidates(c) {
    var list = [];
    if (c.cardFile) list.push(c.cardFile);
    if (c.en && c.name) list.push("queens_" + editorSafeName(c.en + "_" + c.name) + ".png");
    if (c.name) list.push("queens_" + editorSafeName(c.name) + ".png");
    var seen = {};
    return list.filter(function (file) {
      if (seen[file]) return false;
      seen[file] = true;
      return true;
    });
  }

  function photoHtml(c) {
    var files = cardFileCandidates(c);
    var attr = files.length
      ? ' data-card-files="' + files.join("|").replace(/"/g, "&quot;") + '"'
      : "";
    return '<div class="cast-photo"' + attr + '><span class="cast-ph">' + c.code + " · 0</span></div>";
  }

  function assetPendingHtml(c, factionId) {
    if (factionId === "city") return "";
    var code = c.code;
    if (CAST_YURI_ONLY_CODES[code]) {
      return '<span class="cast-asset-note">' + CAST_YURI_ONLY_LABEL + "</span>";
    }
    if (CAST_ASSET_PENDING_CODES[code]) {
      return '<span class="cast-asset-note">' + CAST_ASSET_PENDING_LABEL + "</span>";
    }
    if (CAST_MALE_NO_SITUATION[code]) {
      return '<span class="cast-asset-note">' + CAST_NO_SITUATION_LABEL + "</span>";
    }
    return "";
  }

  function cardHtml(c, factionId) {
    return '<article class="cast-card">'
      + photoHtml(c)
      + '<div class="cast-meta"><div class="cast-name-row"><strong>' + c.name + "</strong></div>"
      + '<em>' + c.code + " · " + c.en + "</em>"
      + "<p>" + c.role + "</p>"
      + assetPendingHtml(c, factionId) + "</div></article>";
  }

  function bindCastPhotos(root, assetBase) {
    root.querySelectorAll(".cast-photo[data-card-files]").forEach(function (box) {
      var files = box.getAttribute("data-card-files").split("|");
      var ph = box.querySelector(".cast-ph");
      var idx = 0;
      function tryNext() {
        if (idx >= files.length) return;
        var img = new Image();
        img.alt = "";
        img.onload = function () {
          if (ph) ph.remove();
          box.appendChild(img);
        };
        img.onerror = function () {
          idx += 1;
          tryNext();
        };
        img.src = assetBase + files[idx];
      }
      tryNext();
    });
  }

  function mount(options) {
    var root = options.root || document;
    var sectionsEl = root.getElementById ? root.getElementById(options.sectionsId) : root.querySelector("#" + options.sectionsId);
    if (!sectionsEl) return;

    var navEl = null;
    if (options.navId) {
      navEl = root.getElementById ? root.getElementById(options.navId) : root.querySelector("#" + options.navId);
    }

    var assetBase = options.assetBase || "assets/cast/";
    var navHtml = "";
    var bodyHtml = "";

    for (var i = 0; i < CAST_FACTIONS.length; i++) {
      var f = CAST_FACTIONS[i];
      if (navEl) navHtml += '<a href="#faction-' + f.id + '">' + f.short + "</a>";
      bodyHtml += '<section class="faction-block" id="faction-' + f.id + '">';
      bodyHtml += "<h2><span>" + f.title + "</span>";
      if (f.id === "city") {
        bodyHtml += '<span class="faction-section-note">' + CAST_NO_SITUATION_LABEL + "</span>";
      }
      bodyHtml += "</h2>";
      if (f.note) {
        bodyHtml += '<p class="faction-block-note">' + f.note + "</p>";
      }
      bodyHtml += '<div class="cast-grid">';
      for (var j = 0; j < f.chars.length; j++) bodyHtml += cardHtml(f.chars[j], f.id);
      bodyHtml += "</div></section>";
    }

    if (navEl) navEl.innerHTML = navHtml;
    sectionsEl.innerHTML = bodyHtml;
    bindCastPhotos(root, assetBase);
  }

  global.QueensCastGrid = { mount: mount, CAST_FACTIONS: CAST_FACTIONS };
})(typeof window !== "undefined" ? window : globalThis);
