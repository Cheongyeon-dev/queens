/**
 * 퀸즈 에셋 갤러리 · CODES.md 1차 공개 (2026-06-10) · cast 라벨
 *
 * 메인(1차 26명 − RO 갤러리 제한): PHASE1 전체 — N01~N04·표정·카지노 등 manifest 있으면 노출
 * 도시 엑스트라·남캐: 0(프로필)+1(기본)만 — raw에 2~9 있어도 갤러리 미표시 (RO·MY·VC 등)
 * 아카데미 엑스트라·pending: 0·1 + A01~A03·HM
 * RS: F01·F02 + PHASE1(단 N·FI·A01~A03 불가)
 */

(function (global) {
  /** 도시·NPC 엑스트라 — 갤러리 0·1만 (로잘리 등 raw 표정 있어도 숨김) */
  var CAST_EXTRA_CODES = {
    VC: 1, LU: 1, LA: 1, AM: 1, OB: 1, MY: 1, RO: 1,
  };

  var CAST_MALE_NO_SITUATION = {
    VC: 1, YS: 1, HO: 1, HN: 1, HG: 1,
  };

  var CAST_ASSET_PENDING_CODES = {
    BR: 1, MI: 1, VA: 1, GI: 1, AN: 1,
  };

  var CAST_YURI_ONLY_CODES = {
    RS: 1,
  };

  var ACADEMY_EXTRAS = {
    BR: 1, HO: 1, HN: 1, HG: 1, YS: 1,
  };

  var ACADEMY_SIT = { A01: 1, A02: 1, A03: 1 };

  var ACADEMY_HM = {
    BK: 1, CM: 1, AR: 1, MI: 1, EM: 1, BR: 1, YU: 1, HG: 1, RX: 1, SL: 1, YS: 1, CT: 1, GI: 1, SH: 1, RN: 1, SD: 1, HO: 1, HN: 1,
  };

  var ACADEMY = {
    CM: 1, AR: 1, MI: 1, EM: 1, BR: 1, YU: 1, HG: 1, RX: 1, SL: 1, YS: 1, CT: 1, GI: 1, SH: 1, RN: 1, SD: 1, HO: 1, HN: 1,
  };

  var PHASE1 = {
    "0": 1, "1": 1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "7": 1, "8": 1, "9": 1,
    FW: 1, CL02: 1, C01: 1, ALL: 1, BT: 1,
    A01: 1, A02: 1, A03: 1, HM: 1,
    N01: 1, N02: 1, N03: 1, N04: 1,
    FI: 1, F01: 1, F02: 1,
  };

  var PHASE1_FILTER_ORDER = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "FW", "CL02", "C01", "ALL", "BT",
    "A01", "A02", "A03", "HM",
    "N01", "N02", "N03", "N04",
    "FI", "F01", "F02",
  ];

  function isExtraOrMaleNoSit(charCode) {
    return !!(CAST_EXTRA_CODES[charCode] || CAST_MALE_NO_SITUATION[charCode]);
  }

  /** 엑스트라·남캐: 0(등장·프로필) + 1(기본) */
  function extraBaseAllowed(charCode, situation) {
    return situation === "0" || situation === "1" || situation === charCode + "01";
  }

  function academyExtraAllowed(charCode, situation) {
    return extraBaseAllowed(charCode, situation) || !!ACADEMY_SIT[situation];
  }

  function pendingLimitedAllowed(charCode, situation) {
    if (ACADEMY_EXTRAS[charCode]) {
      return academyExtraAllowed(charCode, situation) || (ACADEMY_HM[charCode] && situation === "HM");
    }
    return false;
  }

  function extraAllowed(charCode, situation) {
    if (ACADEMY_EXTRAS[charCode]) {
      if (academyExtraAllowed(charCode, situation)) return true;
      if (ACADEMY_HM[charCode] && situation === "HM") return true;
      return false;
    }
    return extraBaseAllowed(charCode, situation);
  }

  function situationPrefix(assetCode) {
    return String(assetCode || "").replace(/-\d+$/, "");
  }

  function isAllowed(charCode, situation) {
    charCode = String(charCode || "").toUpperCase();
    situation = String(situation || "");

    if (!charCode || !situation) return false;
    if (charCode === "LE") return false;

    if (situation === "HM") {
      return !!ACADEMY_HM[charCode];
    }

    if (CAST_ASSET_PENDING_CODES[charCode]) {
      return pendingLimitedAllowed(charCode, situation);
    }

    if (CAST_YURI_ONLY_CODES[charCode]) {
      if (situation === "FI" || /^N0[1-4]$/.test(situation)) return false;
      if (situation === "F01" || situation === "F02") return true;
      if (ACADEMY_SIT[situation]) return false;
      return !!PHASE1[situation];
    }

    if (isExtraOrMaleNoSit(charCode)) {
      return extraAllowed(charCode, situation);
    }

    if (!PHASE1[situation]) return false;

    if (ACADEMY_SIT[situation]) {
      return !!(ACADEMY[charCode] || charCode === "BK");
    }

    return true;
  }

  global.QueensGalleryAllow = {
    CAST_EXTRA_CODES: CAST_EXTRA_CODES,
    CAST_MALE_NO_SITUATION: CAST_MALE_NO_SITUATION,
    CAST_ASSET_PENDING_CODES: CAST_ASSET_PENDING_CODES,
    CAST_YURI_ONLY_CODES: CAST_YURI_ONLY_CODES,
    ACADEMY_EXTRAS: ACADEMY_EXTRAS,
    ACADEMY_HM: ACADEMY_HM,
    PHASE1_FILTER_ORDER: PHASE1_FILTER_ORDER,
    situationPrefix: situationPrefix,
    isAllowed: isAllowed,
  };
})(typeof window !== "undefined" ? window : globalThis);
