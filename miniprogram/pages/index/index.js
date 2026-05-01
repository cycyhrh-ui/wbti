// ===== WBTI 小程序主页逻辑 =====
var data = require('../../utils/data');
var algo = require('../../utils/algorithm');

var DIMS = data.DIMS;
var DIM_LABELS = data.DIM_LABELS;
var DIM_ICONS = data.DIM_ICONS;
var questions = data.questions;
var TYPE_DETAILS = data.TYPE_DETAILS;

Page({
  data: {
    currentPage: 'welcome',
    fakeCount: 287643,
    // 答题
    currentQ: 0,
    totalQ: 0,
    currentScene: '',
    currentOptions: [],
    selectedIdx: -1,
    progressPercent: 0,
    // 结果
    result: {},
    traitBars: [],
    // 分享弹窗
    showShareModal: false
  },

  // 内部状态（不渲染）
  _answers: [],
  _visibleQuestions: [],
  _triggeredDrinker: false,
  _triggeredShen: false,
  _dimScores: {},
  _resultType: null,
  _discrete: null,
  _countTimer: null,

  onLoad: function() {
    var self = this;
    this._countTimer = setInterval(function() {
      self.setData({ fakeCount: 287643 + Math.floor(Math.random() * 8) });
    }, 3000);
  },

  onUnload: function() {
    if (this._countTimer) clearInterval(this._countTimer);
  },

  // ===== 分享配置（小程序原生） =====
  onShareAppMessage: function() {
    var r = this._resultType;
    if (r) {
      return {
        title: '\u3010WBTI\u6b66\u4fa0\u6d4b\u8bd5\u3011\u6211\u662f\u300c' + r.code + ' \u00b7 ' + r.name + '\u300d\u2014\u2014 ' + r.title,
        path: '/pages/index/index',
        imageUrl: '' // 小程序卡片默认截图
      };
    }
    return {
      title: 'WBTI \u6b66\u4fa0\u6027\u683c\u6d4b\u8bd5 \u00b7 \u4f60\u5728\u6c5f\u6e56\u662f\u4ec0\u4e48\u89d2\u8272\uff1f',
      path: '/pages/index/index'
    };
  },

  onShareTimeline: function() {
    var r = this._resultType;
    if (r) {
      return {
        title: '\u6211\u662f\u300c' + r.code + ' \u00b7 ' + r.name + '\u300d \u2014\u2014 ' + r.title,
        query: ''
      };
    }
    return {
      title: 'WBTI \u6b66\u4fa0\u6027\u683c\u6d4b\u8bd5',
      query: ''
    };
  },

  // ===== 开始测试 =====
  startTest: function() {
    this._answers = [];
    this._triggeredDrinker = false;
    this._triggeredShen = false;
    this._dimScores = {};
    this._resultType = null;
    this._discrete = null;
    DIMS.forEach(function(d) { this._dimScores[d] = []; }.bind(this));

    // 构建题目列表
    var regular = questions.filter(function(q) { return !q.isGate; });
    var gates = questions.filter(function(q) { return q.isGate; });
    var gatePos = Math.floor(Math.random() * 10) + 5;
    this._visibleQuestions = regular.slice();
    this._visibleQuestions.splice(gatePos, 0, gates[0]);

    this._renderQ();
    this.setData({
      currentPage: 'question',
      selectedIdx: -1,
      totalQ: this._visibleQuestions.length
    });
  },

  _renderQ: function() {
    var q = this._visibleQuestions[this._answers.length];
    this.setData({
      currentQ: this._answers.length,
      currentScene: q.scene,
      currentOptions: q.options,
      selectedIdx: -1,
      progressPercent: (this._answers.length / this._visibleQuestions.length * 100)
    });
  },

  selectOption: function(e) {
    this.setData({ selectedIdx: e.currentTarget.dataset.index });
  },

  nextQuestion: function() {
    var idx = this.data.selectedIdx;
    if (idx < 0) return;

    var q = this._visibleQuestions[this._answers.length];
    var opt = q.options[idx];
    this._answers.push(idx);

    // 隐藏人格触发
    if (opt.triggerShen) this._triggeredShen = true;

    // 条件题逻辑
    if (opt.trigger === 'drinker') {
      this._triggeredDrinker = true;
      var gate2 = questions.find(function(qq) { return qq.id === 'gate_q2'; });
      this._visibleQuestions.splice(this._answers.length, 0, gate2);
      this.setData({ totalQ: this._visibleQuestions.length });
    }

    // 计分
    if (opt.d && q.dim !== 'hidden' && DIMS.indexOf(q.dim) >= 0) {
      this._dimScores[q.dim].push(opt.d[q.dim] || 2);
    }

    if (this._answers.length < this._visibleQuestions.length) {
      this._renderQ();
    } else {
      this.setData({ currentPage: 'loading' });
      var self = this;
      setTimeout(function() { self._showResult(); }, 2500);
    }
  },

  _showResult: function() {
    var type, similarity = 0, discrete = null;

    if (this._triggeredShen) {
      type = TYPE_DETAILS.SHEN;
    } else {
      discrete = algo.discretize(this._dimScores);
      var match = algo.findBestMatch(discrete);
      type = TYPE_DETAILS[match.code];
      similarity = match.similarity;
    }

    this._resultType = type;
    this._discrete = discrete;

    // 构建六维条形图
    var bars = [];
    if (discrete) {
      DIMS.forEach(function(d) {
        var val = discrete[d] === 'L' ? 25 : discrete[d] === 'M' ? 55 : 85;
        var level = discrete[d] === 'L' ? '\u4f4e' : discrete[d] === 'M' ? '\u4e2d' : '\u9ad8';
        bars.push({
          dim: d,
          label: DIM_LABELS[d] + ' ' + DIM_ICONS[d] + ' ' + level,
          percent: val
        });
      });
    }

    this.setData({
      currentPage: 'result',
      result: {
        emoji: type.emoji,
        code: type.code,
        name: type.name,
        title: type.title,
        quote: type.quote,
        desc: type.desc,
        tags: type.tags,
        strong: type.strong,
        weak: type.weak,
        secret: type.secret,
        similarity: similarity
      },
      traitBars: bars
    });
  },

  retry: function() {
    this.setData({ currentPage: 'welcome' });
  },

  // ===== 分享：Canvas 绘制海报 =====
  shareResult: function() {
    if (!this._resultType) return;
    this.setData({ showShareModal: true });
    var self = this;

    // 延迟绘制确保canvas已渲染
    setTimeout(function() { self._drawShareCard(); }, 300);
  },

  _drawShareCard: function() {
    var ctx = wx.createCanvasContext('shareCanvas', this);
    var t = this._resultType;
    var W = 375, H = 520;
    var d = this._discrete;

    // 背景
    ctx.setFillStyle('#0a0a0f');
    ctx.fillRect(0, 0, W, H);

    // 顶部金色装饰线
    var grd = ctx.createLinearGradient(0, 0, W, 0);
    grd.addColorStop(0, 'rgba(255,215,0,0)');
    grd.addColorStop(0.5, 'rgba(255,215,0,0.8)');
    grd.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.setFillStyle(grd);
    ctx.fillRect(0, 0, W, 2);

    // Emoji
    ctx.setFontSize(48);
    ctx.setTextAlign('center');
    ctx.fillText(t.emoji, W / 2, 60);

    // 代号
    ctx.setFontSize(20);
    ctx.setFillStyle('#ffd700');
    ctx.fillText(t.code, W / 2, 100);

    // 名称
    ctx.setFontSize(28);
    ctx.setFillStyle('#e8e6e3');
    ctx.fillText(t.name, W / 2, 140);

    // 标题
    ctx.setFontSize(14);
    ctx.setFillStyle('#8b8b9e');
    ctx.fillText(t.title, W / 2, 168);

    // 口号
    ctx.setFontSize(13);
    ctx.setFillStyle('#b8962a');
    var quoteLines = this._wrapText(ctx, t.quote, W - 60);
    quoteLines.forEach(function(line, i) {
      ctx.fillText(line, W / 2, 200 + i * 20);
    });

    // 分隔线
    var lineY = 200 + quoteLines.length * 20 + 10;
    ctx.setStrokeStyle('rgba(255,215,0,0.2)');
    ctx.setLineWidth(1);
    ctx.beginPath();
    ctx.moveTo(30, lineY);
    ctx.lineTo(W - 30, lineY);
    ctx.stroke();

    // 六维条形图
    var barY = lineY + 20;
    if (d) {
      DIMS.forEach(function(dim, i) {
        var y = barY + i * 24;
        var level = d[dim] === 'L' ? 25 : d[dim] === 'M' ? 55 : 85;
        var levelText = d[dim] === 'L' ? '\u4f4e' : d[dim] === 'M' ? '\u4e2d' : '\u9ad8';

        // 标签
        ctx.setFontSize(10);
        ctx.setTextAlign('right');
        ctx.setFillStyle('#8b8b9e');
        ctx.fillText(DIM_LABELS[dim] + ' ' + levelText, 90, y + 8);

        // 背景条
        ctx.setFillStyle('#2a2a3e');
        ctx.fillRect(100, y, 240, 8);

        // 填充条
        var barGrd = ctx.createLinearGradient(100, 0, 100 + 240 * level / 100, 0);
        barGrd.addColorStop(0, '#b8962a');
        barGrd.addColorStop(1, '#ffd700');
        ctx.setFillStyle(barGrd);
        ctx.fillRect(100, y, 240 * level / 100, 8);
      });

      barY += DIMS.length * 24 + 10;
    }

    // 描述（截断）
    ctx.setFontSize(11);
    ctx.setTextAlign('left');
    ctx.setFillStyle('#8b8b9e');
    var descText = t.desc.length > 100 ? t.desc.substring(0, 100) + '\u2026\u2026' : t.desc;
    var descLines = this._wrapText(ctx, descText, W - 60);
    descLines.forEach(function(line, i) {
      if (i < 4) ctx.fillText(line, 30, barY + i * 18);
    });

    // 底部水印
    ctx.setFontSize(10);
    ctx.setTextAlign('center');
    ctx.setFillStyle('#555');
    ctx.fillText('WBTI \u6b66\u4fa0\u884c\u4e3a\u7c7b\u578b\u6307\u793a\u5668', W / 2, H - 50);
    ctx.setFontSize(12);
    ctx.setFillStyle('#ffd700');
    ctx.fillText('\u2191 \u626b\u7801\u6d4b\u8bd5\u4f60\u7684\u6c5f\u6e56\u547d\u8fd0 \u2191', W / 2, H - 28);

    ctx.draw();
  },

  _wrapText: function(ctx, text, maxWidth) {
    var lines = [];
    var line = '';
    for (var i = 0; i < text.length; i++) {
      var testLine = line + text[i];
      var metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line.length > 0) {
        lines.push(line);
        line = text[i];
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);
    return lines;
  },

  saveShareImage: function() {
    var self = this;
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      quality: 1,
      fileType: 'png',
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function() {
            wx.showToast({ title: '\u5df2\u4fdd\u5b58\u5230\u76f8\u518c', icon: 'success' });
            self.setData({ showShareModal: false });
          },
          fail: function() {
            wx.showModal({
              title: '\u63d0\u793a',
              content: '\u9700\u8981\u6388\u6743\u4fdd\u5b58\u56fe\u7247\u5230\u76f8\u518c\uff0c\u8bf7\u5728\u8bbe\u7f6e\u4e2d\u5f00\u542f',
              showCancel: false
            });
          }
        });
      },
      fail: function() {
        wx.showToast({ title: '\u751f\u6210\u5931\u8d25', icon: 'none' });
      }
    }, this);
  },

  closeShareModal: function() {
    this.setData({ showShareModal: false });
  }
});
