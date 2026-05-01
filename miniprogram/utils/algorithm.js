// ===== WBTI KNN 匹配算法 =====
var data = require('./data');
var DIMS = data.DIMS;
var TYPE_DETAILS = data.TYPE_DETAILS;

// 离散化：每维度得分列表 → L/M/H
function discretize(scores) {
  var result = {};
  DIMS.forEach(function(d) {
    var arr = scores[d] || [];
    var sum = arr.reduce(function(a, b) { return a + b; }, 0);
    var avg = arr.length > 0 ? sum / arr.length : 2;
    if (avg <= 1.5) result[d] = 'L';
    else if (avg <= 2.5) result[d] = 'M';
    else result[d] = 'H';
  });
  return result;
}

// KNN匹配
function findBestMatch(discrete) {
  var minDist = Infinity;
  var bestMatch = null;
  var bestHits = 0;
  var typeKeys = Object.keys(TYPE_DETAILS).filter(function(k) { return k !== 'SHEN' && TYPE_DETAILS[k].pattern; });

  typeKeys.forEach(function(key) {
    var pattern = TYPE_DETAILS[key].pattern;
    var dist = 0;
    var hits = 0;
    DIMS.forEach(function(d) {
      var pVal = pattern[d] || 2;
      var uVal = discrete[d] === 'L' ? 1 : discrete[d] === 'M' ? 2 : 3;
      if (pVal === uVal) hits++;
      dist += Math.abs(pVal - uVal);
    });
    if (dist < minDist || (dist === minDist && hits > bestHits)) {
      minDist = dist;
      bestMatch = key;
      bestHits = hits;
    }
  });

  return {
    code: bestMatch,
    similarity: Math.max(0, Math.round((1 - minDist / 12) * 100)),
    hits: bestHits
  };
}

module.exports = {
  discretize: discretize,
  findBestMatch: findBestMatch
};
