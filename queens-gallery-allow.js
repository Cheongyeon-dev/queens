/**
 * 퀸즈 에셋 갤러리 · cast(preview-cast.html) + CODES.md 1차 공개 기준
 * raw/manifest에 파일이 있어도 isAllowed() false면 표시하지 않음
 */
(function (global) {
  var CAST_EXTRA_CODES = {
    VC: 1, LU: 1, LA: 1, AM: 1, CM: 1, BR: 1, HO: 1, HN: 1, HG: 1, YS: 1, OB: 1, MY: 1, MI: 1, RO: 1,
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

  var YURI_FI = { BK: 1, BE: 1, AR: 1, BL: 1, CT: 1, DH: 1, SH: 1, YU: 1 };
  var YURI_F01F02 = { BK: 1, BE: 1, AR: 1, BL: 1, CT: 1, DH: 1, SH: 1, YU: 1, RS: 1 };
  var NSFW_N = { BK: 1, BE: 1, AR: 1, BL: 1, CT: 1, DH: 1, SH: 1, YU: 1 };

  var ACADEMY = {
    CM: 1, AR: 1, MI: 1, EM: 1, BR: 1, YU: 1, HG: 1, RX: 1, SL: 1, YS: 1, CT: 1, GI: 1, SH: 1, RN: 1, SD: 1, HO: 1, HN: 1,
  };

  var PHASE1 = {
    "0": 1, "1": 1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "7": 1, "8": 1, "9": 1,
    FW: 1, CL02: 1, C01: 1, ALL: 1, BT: 1,
    A01: 1, A02: 1, A03: 1,
    N01: 1, N02: 1, N03: 1, N04: 1,
    FI: 1, F01: 1, F02: 1,
  };

  var PHASE1_FILTER_ORDER = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "FW", "CL02", "C01", "ALL", "BT",
    "A01", "A02", "A03",
    "N01", "N02", "N03", "N04",
    "FI", "F01", "F02",
  ];

  function isExtraOrMaleNoSit(charCode) {
    return !!(CAST_EXTRA_CODES[charCode] || CAST_MALE_NO_SITUATION[charCode]);
  }

  function situationPrefix(assetCode) {
    return String(assetCode || "").replace(/-\d+$/, "");
  }

  function isAllowed(charCode, situation) {
    charCode = String(charCode || "").toUpperCase();
    situation = String(situation || "");

    if (!charCode || !situation) return false;
    if (charCode === "LE") return false;
    if (CAST_ASSET_PENDING_CODES[charCode]) return false;

    if (isExtraOrMaleNoSit(charCode)) {
      return situation === charCode + "01";
    }

    if (!PHASE1[situation]) return false;

    if (CAST_YURI_ONLY_CODES[charCode]) {
      if (situation === "FI" || /^N0[1-4]$/.test(situation)) return false;
      if (situation === "F01" || situation === "F02") return true;
      if (["A01", "A02", "A03"].includes(situation)) return false;
      return true;
    }

    if (situation === "FI") return !!YURI_FI[charCode];
    if (situation === "F01" || situation === "F02") return !!YURI_F01F02[charCode];
    if (/^N0[1-4]$/.test(situation)) return !!NSFW_N[charCode];
    if (["A01", "A02", "A03"].includes(situation)) {
      return !!(ACADEMY[charCode] || charCode === "BK");
    }

    return true;
  }

  global.QueensGalleryAllow = {
    CAST_EXTRA_CODES: CAST_EXTRA_CODES,
    CAST_MALE_NO_SITUATION: CAST_MALE_NO_SITUATION,
    CAST_ASSET_PENDING_CODES: CAST_ASSET_PENDING_CODES,
    CAST_YURI_ONLY_CODES: CAST_YURI_ONLY_CODES,
    PHASE1_FILTER_ORDER: PHASE1_FILTER_ORDER,
    situationPrefix: situationPrefix,
    isAllowed: isAllowed,
  };
})(typeof window !== "undefined" ? window : globalThis);
