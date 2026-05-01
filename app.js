// ===== WBTI v2.0 =====
// Wushu Behavioral Type Indicator · 武侠行为类型指示器
// 6维度 × 3档 = 离散模式匹配 · 19种人格 · 20道题

// ===== 维度定义 =====
const DIMS = ['yi', 'yong', 'zhi', 'ren', 'kuang', 'yin'];
const DIM_LABELS = { yi: '正义感', yong: '冒险', zhi: '谋略', ren: '共情', kuang: '情绪', yin: '社交' };
const DIM_ICONS = { yi: '⚖️', yong: '🗡️', zhi: '🧠', ren: '💗', kuang: '🔥', yin: '🎭' };

// ===== 题库（20道）=====
const questions = [
  {
    id: 'q01', dim: 'yi',
    scene: '深夜荒路，你看到一个人倒在路边，身上有伤，明显被人追杀过。他昏迷不醒，身无分文。',
    options: [
      { label: 'A', text: '扶起来，找地方给他治伤。不认识归不认识，不能见死不救。', d: { yi: 3, ren: 3, yong: 1 } },
      { label: 'B', text: '看看周围有没有追兵。有——跑。没有——上去看看。命要紧。', d: { zhi: 2, yong: 1, ren: 1 } },
      { label: 'C', text: '翻翻他身上有没有值钱的东西。他要是死了用不上，不如我替他保管。', d: { yi: 1, zhi: 1, ren: 1 } },
      { label: 'D', text: '假装没看见，加快脚步走过去。这年头，管闲事的死得快。', d: { yi: 1, ren: 1 } }
    ]
  },
  {
    id: 'q02', dim: 'yong',
    scene: '你得到消息：一个魔教分舵今晚有大量财宝，但守卫至少三十人，都是好手。',
    options: [
      { label: 'A', text: '三十人而已？冲了！富贵险中求，命是可以赌的。', d: { yong: 3, kuang: 2, yi: 1 } },
      { label: 'B', text: '先踩点三天，摸清换班规律、暗哨位置、撤退路线。然后再决定。', d: { zhi: 3, yong: 2, kuang: 1 } },
      { label: 'C', text: '找几个兄弟一起去。人多力量大……大概。', d: { yin: 2, yong: 2 } },
      { label: 'D', text: '不去了。财宝是别人的命换来的，我犯不上。', d: { yi: 2, yong: 1 } }
    ]
  },
  {
    id: 'q03', dim: 'zhi',
    scene: '你的对手武功比你高，但你发现他练功时有一个致命破绽——只是破绽很小，只有一瞬间的机会。',
    options: [
      { label: 'A', text: '反复研究这个破绽，设计三套方案，反复推演直到万无一失。', d: { zhi: 3, kuang: 1 } },
      { label: 'B', text: '管他什么破绽，正面刚！输了就输了，赢得硬气。', d: { yong: 3, kuang: 2 } },
      { label: 'C', text: '找机会把他的破绽散布出去，让别人去对付他。我坐收渔利。', d: { zhi: 2, yin: 2, yi: 1 } },
      { label: 'D', text: '这个破绽我记住了。暂时不惹他，等哪天非打不可时再说。', d: { zhi: 2, yong: 1 } }
    ]
  },
  {
    id: 'q04', dim: 'ren',
    scene: '你的同门师弟犯了门规，按规矩要逐出师门。他跪在你面前求你帮忙求情。',
    options: [
      { label: 'A', text: '去找师父求情。一次不够就两次。规矩是死的，人是活的。', d: { ren: 3, yi: 2, yin: 2 } },
      { label: 'B', text: '规矩就是规矩。他不守规矩就该受罚，我不帮他。', d: { yi: 3, ren: 1 } },
      { label: 'C', text: '帮他说两句好话，但要他付出代价。人情嘛，不用白不用。', d: { zhi: 2, ren: 2, yi: 1 } },
      { label: 'D', text: '心里同情他，但嘴上什么都不说。别人的事少掺和。', d: { ren: 2, yin: 1 } }
    ]
  },
  {
    id: 'q05', dim: 'kuang',
    scene: '在酒馆里，有人当面嘲笑你的门派和师父。周围人都看着你。',
    options: [
      { label: 'A', text: '拍桌子站起来。骂我？可以。骂我师父？你今天走不出这个门。', d: { kuang: 3, yong: 2, yi: 2 } },
      { label: 'B', text: '面不改色，微笑着给他倒杯酒："你说得对。改天来我们门派，我介绍你认识我师父。他特别喜欢像你这样的学生。"', d: { zhi: 3, kuang: 1, yin: 2 } },
      { label: 'C', text: '低头喝酒，假装没听见。为了一句话打架，不值当。', d: { kuang: 1, yong: 1, yi: 1 } },
      { label: 'D', text: '记住他的脸。改天找机会让他知道嘴欠的代价。不是不报，时候未到。', d: { kuang: 2, zhi: 2, yi: 1 } }
    ]
  },
  {
    id: 'q06', dim: 'yin',
    scene: '武林大会上，各路高手云集。你武功不算顶尖，但也不是无名之辈。有人提议你上台比武。',
    options: [
      { label: 'A', text: '上！紧张什么？台下那么多人看着，我正好展示一下。', d: { yong: 2, yin: 3, kuang: 2 } },
      { label: 'B', text: '婉拒。"在下不才，今日只做观众。"然后找个好位置，仔细观察每个选手的招式。', d: { zhi: 2, yin: 1 } },
      { label: 'C', text: '先看别人打几场再说。摸清所有参赛者的水平后，再决定上不上。', d: { zhi: 3, yin: 2 } },
      { label: 'D', text: '趁大家注意台上的时候，悄悄去后院看看有没有什么好东西。', d: { zhi: 2, yi: 1, yong: 1 } }
    ]
  },
  {
    id: 'q07', dim: 'yi',
    scene: '你发现你的掌门一直在暗中与朝廷勾结，出卖江湖同道。你是门派核心弟子。',
    options: [
      { label: 'A', text: '直接揭发！这种人不配当掌门！', d: { yi: 3, yong: 3, kuang: 2 } },
      { label: 'B', text: '先暗中收集证据，联络其他长老，找好退路。等证据确凿时一击致命。', d: { zhi: 3, yi: 2, yong: 2 } },
      { label: 'C', text: '假装不知道。掌门得罪不起，揭发了我也没好日子过。', d: { yi: 1, yong: 1 } },
      { label: 'D', text: '找掌门摊牌：给我好处，我就保密。没有永远的敌人，只有永远的利益。', d: { yi: 1, zhi: 2, yin: 2 } }
    ]
  },
  {
    id: 'q08', dim: 'yong',
    scene: '你被一群山贼包围了。你数了一下，大概十五个人。你的武功对付三五个没问题。',
    options: [
      { label: 'A', text: '今天不是你死就是我亡！冲！', d: { yong: 3, kuang: 3 } },
      { label: 'B', text: '谈判。"各位好汉，我身上有五十两银子，全给你们，放我走如何？"', d: { zhi: 2, yin: 2 } },
      { label: 'C', text: '打不过就跑。打头阵的那个干掉，制造混乱，趁机跑路。', d: { yong: 2, zhi: 2 } },
      { label: 'D', text: '冷静观察：谁是头目？谁最弱？先干掉最弱的震慑其他人。', d: { zhi: 3, kuang: 1 } }
    ]
  },
  {
    id: 'q09', dim: 'zhi',
    scene: '你得到一本前朝藏宝图，但上面有加密的文字。你破解了一半，发现宝藏的位置在一个绝地——进去容易出来难。',
    options: [
      { label: 'A', text: '继续破解。先把地图完全看懂，把所有可能的危险标注出来。', d: { zhi: 3, kuang: 1 } },
      { label: 'B', text: '拿地图去找懂行的人一起研究。一个人太危险了。', d: { yin: 2, zhi: 2, yong: 1 } },
      { label: 'C', text: '直接出发。计划永远赶不上变化，不如随机应变。', d: { yong: 3, kuang: 1 } },
      { label: 'D', text: '把地图高价卖给别人。让他们去冒险，我拿钱不香吗？', d: { zhi: 2, yi: 1, yin: 2 } }
    ]
  },
  {
    id: 'q10', dim: 'ren',
    scene: '你的好友被人打成了重伤，奄奄一息。他最后的请求是："替我照顾我女儿……"',
    options: [
      { label: 'A', text: '答应。用我的命担保，她不会受任何委屈。', d: { ren: 3, yi: 3, yong: 2 } },
      { label: 'B', text: '心里一百个不愿意。一个孩子？我怎么养？但嘴上说好。', d: { ren: 1, yi: 2, yin: 2 } },
      { label: 'C', text: '把他的女儿安排到一个靠谱的人家，出钱出力但不出人。', d: { zhi: 2, ren: 2, yi: 1 } },
      { label: 'D', text: '"我尽力。"然后该干吗干吗。承诺和执行是两码事。', d: { zhi: 2, ren: 1 } }
    ]
  },
  {
    id: 'q11', dim: 'kuang',
    scene: '你终于找到了当年害你家破人亡的仇人。他现在已是风烛残年的老人，跪在你面前求饶。',
    options: [
      { label: 'A', text: '手起刀落。等了二十年，不是来听你解释的。', d: { kuang: 3, yong: 2, yi: 2 } },
      { label: 'B', text: '收刀。恨够了。杀了他也不会让我的家人活过来。放过他，也放过自己。', d: { ren: 3, yi: 2, kuang: 1 } },
      { label: 'C', text: '不杀他，但要他当众忏悔，用余生赎罪。这比死还难受。', d: { zhi: 2, yi: 3, ren: 2 } },
      { label: 'D', text: '拍拍他的肩膀："不急，让我想想。"然后坐下来慢慢喝茶。急什么？', d: { kuang: 2, zhi: 2 } }
    ]
  },
  {
    id: 'q12', dim: 'yin',
    scene: '一个你在江湖上仰慕已久的高手邀请你喝酒。酒过三巡，他开始试探你对各大门派的看法。',
    options: [
      { label: 'A', text: '知无不言，言无不尽。他对我也算坦诚，我也坦诚相待。', d: { yin: 3, ren: 2, yi: 2 } },
      { label: 'B', text: '说话留三分。该说的说，不该说的一个字不提。', d: { zhi: 3, yin: 2 } },
      { label: 'C', text: '反过来试探他。他为什么要问我这些？他到底想知道什么？', d: { zhi: 3, kuang: 1 } },
      { label: 'D', text: '装醉。醉了什么都说不了，也不得罪人。', d: { zhi: 2, yin: 1 } }
    ]
  },
  {
    id: 'q13', dim: 'yi',
    scene: '你在比武中用了一招暗算，赢了比赛。对手不服，说你胜之不武。观众也在窃窃私语。',
    options: [
      { label: 'A', text: '大方承认。"是我用了阴招，下次公平打。"然后私下发誓再也不用。', d: { yi: 3, ren: 2, yin: 1 } },
      { label: 'B', text: '"赢了就是赢了，你输了就是输了。不服再打。"不服来战。', d: { yong: 2, kuang: 2 } },
      { label: 'C', text: '脸不红心不跳。"什么暗算？那是我独创的招式，你不懂而已。"', d: { zhi: 2, yin: 2, yi: 1 } },
      { label: 'D', text: '假装没听见，领奖品走人。赢了就是赢了，解释什么？', d: { zhi: 1, yong: 1 } }
    ]
  },
  {
    id: 'q14', dim: 'yong',
    scene: '一位前辈告诉你，悬崖下有一个绝世秘境，里面可能有失传的武学。但下去的人十有八九回不来。',
    options: [
      { label: 'A', text: '二话不说就跳。失传的武学？这还犹豫什么？', d: { yong: 3, kuang: 2, zhi: 1 } },
      { label: 'B', text: '先准备：绳索、干粮、药草。然后找人一起下去。', d: { zhi: 3, yong: 1, yin: 2 } },
      { label: 'C', text: '"前辈，您亲自下去过吗？"先搞清楚再说。', d: { zhi: 2, kuang: 1 } },
      { label: 'D', text: '不去。什么武学值得拿命去赌？好好活着不好吗？', d: { yong: 1, ren: 1 } }
    ]
  },
  {
    id: 'q15', dim: 'zhi',
    scene: '两个门派争一块地盘，都来找你帮忙。你两边都不想得罪，但两边都得罪不起。',
    options: [
      { label: 'A', text: '两边都不帮。"这是你们的事，我只喝酒。"', d: { yi: 2, kuang: 1 } },
      { label: 'B', text: '帮弱的那边。强者不需要帮助，帮弱者才是正道。', d: { yi: 3, ren: 2, yong: 1 } },
      { label: 'C', text: '两边都答应帮忙，然后让两边互相消耗。最后坐收渔利。', d: { zhi: 3, yin: 2, yi: 1 } },
      { label: 'D', text: '建议他们谈判。"打了对谁都没好处，不如坐下来谈。"', d: { zhi: 2, ren: 2, yin: 2 } }
    ]
  },
  {
    id: 'q16', dim: 'ren',
    scene: '你在街边看到一个卖身葬父的小女孩。你不确定是不是骗局。',
    options: [
      { label: 'A', text: '不管真假，先给钱。万一是真的呢？这点钱不算什么。', d: { ren: 3, yi: 2 } },
      { label: 'B', text: '调查一下。找当地人问问，确认情况再决定。', d: { zhi: 2, ren: 2 } },
      { label: 'C', text: '不关我事。天下苦命人多了去了，帮得过来吗？', d: { ren: 1, yi: 1 } },
      { label: 'D', text: '给一点钱，但不多。有点心意就行，别被当冤大头。', d: { zhi: 2, ren: 1 } }
    ]
  },
  {
    id: 'q17', dim: 'kuang',
    scene: '你苦练十年的武功被人一招破解，而且对方嘲笑说"这也能叫武功？"',
    options: [
      { label: 'A', text: '当场暴走。管他多强，今天非要跟他拼命不可。', d: { kuang: 3, yong: 3 } },
      { label: 'B', text: '咬着牙忍了。回去苦练。终有一天，我要用同样的方式赢回来。', d: { yong: 2, zhi: 2, kuang: 1 } },
      { label: 'C', text: '微笑。"是是是，在下不才。前辈有空再指教。"心里记下了。', d: { zhi: 2, yin: 2, kuang: 2 } },
      { label: 'D', text: '愣在那里。十年的努力……被人一招破了。这可能需要一点时间消化。', d: { ren: 2, kuang: 1 } }
    ]
  },
  {
    id: 'q18', dim: 'yin',
    scene: '你住进客栈，隔壁住着一群行迹可疑的人，半夜在密谈什么。',
    options: [
      { label: 'A', text: '贴着墙偷听。万一是什么大事呢？', d: { zhi: 2, yong: 1 } },
      { label: 'B', text: '直接去敲门。"几位好汉深夜不睡，聊什么呢？要不要一起喝一杯？"', d: { yin: 3, yong: 2 } },
      { label: 'C', text: '不管。别人的事少掺和。戴好耳塞睡觉。', d: { yin: 1, yong: 1 } },
      { label: 'D', text: '记录他们的对话要点，第二天打听清楚他们是谁。情报比武功有用。', d: { zhi: 3, yong: 1 } }
    ]
  },
  // ===== 条件题（隐藏彩蛋：SHEN 神仙） =====
  {
    id: 'gate_q1', dim: 'hidden', isGate: true,
    scene: '深夜，你独自在房间里，桌上有一壶酒。今天发生了太多事，你想借酒消愁。',
    options: [
      { label: 'A', text: '给自己倒一杯。人生苦短，喝一杯怎么了？', d: { kuang: 1 }, trigger: 'drinker' },
      { label: 'B', text: '不喝了。喝酒解决不了问题。', d: { yi: 1 } },
      { label: 'C', text: '把酒拿去给隔壁受伤的朋友。他比我更需要。', d: { ren: 2, yi: 1 } },
      { label: 'D', text: '倒掉。戒酒已经三年了，不能破戒。', d: { kuang: 1 } }
    ]
  },
  {
    id: 'gate_q2', dim: 'hidden', isGate: true, requires: 'drinker',
    scene: '一杯不够。你开始第二杯，然后第三杯……酒意上头，你突然觉得世界变得格外清晰。',
    options: [
      { label: 'A', text: '继续喝。这种感觉太妙了，仿佛看透了世间一切。', d: { kuang: 2, zhi: 1 }, triggerShen: true },
      { label: 'B', text: '到此为止。再喝就真的多了。', d: { kuang: 1 } },
      { label: 'C', text: '拿起剑，出门。月色正好，想舞剑。', d: { kuang: 2, yong: 1 } },
      { label: 'D', text: '趴在桌上。世界清晰个屁，是眼花了。', d: { kuang: 1 } }
    ]
  }
];

// ===== 19种人格定义 =====
const TYPE_DETAILS = {
  JUDGE: {
    code: 'JUDGE', name: '铁判官', title: '江湖纪检委',
    emoji: '⚖️',
    quote: '"规矩就是规矩。谁坏了规矩，我砍谁。"',
    desc: '你是江湖上的道德警察。不是因为你有多正义——好吧，确实因为你有多正义。你的世界里黑白分明，灰色的东西让你浑身不舒服。你相信规则，遵守规则，并且认为所有人都应该遵守规则。问题是，江湖不是按规矩来的地方。',
    tags: ['#规则至上', '#黑白分明', '#道德标兵', '#社交困难'],
    strong: '你是整个江湖上最值得信赖的人。答应的事说到做到，从不食言。正道门派抢着要你。',
    weak: '世界不是非黑即白的。你的"正义"有时候会伤到不该伤的人。而且说实话，你有点无趣。',
    secret: '你坚持正义，是因为你害怕。害怕一旦没有规则约束，这个世界就会变成你无法理解的样子。你的正义是一种安全感。',
    pattern: { yi: 3, yong: 1, zhi: 2, ren: 3, kuang: 1, yin: 1 }
  },
  MUMU: {
    code: 'MUMU', name: '牧羊人', title: '老妈子·全服保姆',
    emoji: '🐑',
    quote: '"你们先上，我给你们兜底。"',
    desc: '你就是那种"来来来吃点东西""多穿点""早点睡""别逞强"的集合体。你不是最强的，但你永远在照顾别人。你的朋友不是最多，但黏你最深。你是江湖上的"妈妈"，但你累不累？',
    tags: ['#操碎了心', '#专业兜底', '#谁有难帮谁', '#自己呢'],
    strong: '所有人都信任你。你的团队凝聚力是全服第一。关键时刻有人挺身而出，是因为你知道身后有你。',
    weak: '你照顾了所有人，谁来照顾你？你把所有的精力都给了别人，自己空了才发现——身边空无一人。',
    secret: '你一直在照顾别人，可能是因为你不知道怎么照顾自己。你害怕不被需要，所以拼命地让自己变得"有用"。',
    pattern: { yi: 3, yong: 1, zhi: 1, ren: 3, kuang: 1, yin: 2 }
  },
  MAMO: {
    code: 'MAMO', name: '吗喽侠', title: '快乐挂机·人生副本NPC',
    emoji: '🐒',
    quote: '"打打杀杀关我什么事，我在钓鱼。"',
    desc: '你是江湖上最"水"的人。不卷、不拼、不争。别人的江湖是刀光剑影，你的江湖是钓鱼、喝酒、晒太阳。你没什么大志向，也没想成为什么大侠。但不知为什么——每次最后活下来的，总是你这种人。',
    tags: ['#随遇而安', '#佛系玩家', '#躺赢专家', '#无欲无求'],
    strong: '你的适应力是天花板。丢到任何地方都能活，而且活得还不错。你不执着，不纠结，这反而是最强的生存技能。',
    weak: '你会在路上走很久，但永远到不了终点。没有目标的人生，轻松是轻松，但总觉得少了点什么。',
    secret: '你一直漂着，不是因为喜欢旅行——而是因为你在逃避。安定下来的感觉让你害怕。害怕面对一些你一直在回避的东西。',
    pattern: { yi: 1, yong: 1, zhi: 1, ren: 2, kuang: 1, yin: 1 }
  },
  ZHE: {
    code: 'ZHE', name: '棋仙', title: '全服最强大脑',
    emoji: '♟️',
    quote: '"你以为你在下棋？你是我棋盘上的一颗子。"',
    desc: '你的脑子是武器，你的嘴是盾牌。你从不冲动，你等待、观察、计算，然后一击致命——或者根本不击，因为已经让别人替你解决了。你不是最显眼的人，但每个局的背后都有你的影子。',
    tags: ['#运筹帷幄', '#不战而胜', '#人形计算机', '#永远在算'],
    strong: '混乱是你的主场。别人看的是场面，你看的是格局。你的策略眼光让所有人都想拉拢你。',
    weak: '你想太多了。过度分析会让你错过机会，过度不信任会让你失去同路人。有时候，最快的决策就是别想了。',
    secret: '你有多少个"脸"？对每个人的态度都不一样，这不叫社交——叫管理。你用理性压住了所有情绪，但你确实很累。',
    pattern: { yi: 2, yong: 1, zhi: 3, ren: 1, kuang: 1, yin: 2 }
  },
  SHAO: {
    code: 'SHAO', name: '少侠', title: '永不回头看爆炸',
    emoji: '💥',
    quote: '"冲就完事了！死了？那下次冲快点。"',
    desc: '你是那种"想打就打、想骂就骂、想笑就笑"的人。你的世界很简单——对的就是对的，错的就是错的，该上就上。你不虚伪不做作，这在充满算计的江湖里格外珍贵——也格外危险。',
    tags: ['#莽', '#义薄云天', '#真诚到蠢', '#社交天花板'],
    strong: '你的热血和真诚是稀缺品质。人们愿意和你做朋友，因为你不会背后捅刀子——你会当面捅。关键时刻你总是第一个站出来的人。',
    weak: '你的情绪是你的阿喀琉斯之踵。太容易被激怒、太容易被利用。一个冷静的对手只需要在你最愤怒时设个小陷阱。',
    secret: '你用"热血"和"直爽"掩盖内心的不安。害怕停下来思考——因为一旦开始想，你会发现很多事不是一腔热血能解决的。所以你选择不想。',
    pattern: { yi: 2, yong: 3, zhi: 1, ren: 2, kuang: 3, yin: 2 }
  },
  YING: {
    code: 'YING', name: '影帝', title: '你不知道的事太多了',
    emoji: '🎭',
    quote: '"你以为你了解他？那是他让你以为的。"',
    desc: '你永远不会让人看到你的真实想法。你在每个人面前都是不同的版本——精明的掌门面前你是谦逊的弟子，天真的朋友面前你是可靠的伙伴，对手面前你是一张白纸。这叫什么？这叫资源管理。',
    tags: ['#千人千面', '#高级演员', '#人脉王', '#信任黑洞'],
    strong: '在任何社交场合你都能游刃有余。信息是你的货币，人脉是你的王国。',
    weak: '你自己还记得真实的自己是哪个版本吗？当所有人都认识的"你"不是同一个人时，没有一个人真正认识你。',
    secret: '你害怕被看穿。因为一旦别人看到真实的你，可能会发现——你其实很脆弱。',
    pattern: { yi: 1, yong: 1, zhi: 3, ren: 1, kuang: 2, yin: 3 }
  },
  GUI: {
    code: 'GUI', name: '归隐人', title: '江湖已死·只想种菜',
    emoji: '🌿',
    quote: '"我不想打架，只想种菜。"',
    desc: '你曾经也在江湖上叱咤风云过。后来你发现——江湖是个死循环。打完这个仇人还有下一个，交完这个朋友还会翻脸。所以你选择退出。种菜、钓鱼、养花。你过得比任何大侠都好。真的。',
    tags: ['#佛系大师', '#退出江湖', '#看透一切', '#安静老去'],
    strong: '你是整个江湖上最清醒的人。当所有人都在追逐虚名时，你已经找到了真正的幸福。',
    weak: '你可能退得太早了。有些事你还没做完，有些人你还没道别。你的退出，也许是另一种逃避。',
    secret: '你退隐不是因为看透了，是因为怕了。怕再失去。所以你选择不再拥有。',
    pattern: { yi: 2, yong: 1, zhi: 2, ren: 3, kuang: 1, yin: 1 }
  },
  FENG: {
    code: 'FENG', name: '疯子', title: '别惹我·行走火药桶',
    emoji: '💣',
    quote: '"别靠近我。我控制不住。"',
    desc: '你是江湖上最不可预测的变量。没有人知道你下一秒会做什么——包括你自己。你的情绪是一把双刃剑，它能让你爆发出超常的实力，也能让你在最不该的时候失控。',
    tags: ['#不稳定', '#危险分子', '#情绪核弹', '#别惹'],
    strong: '爆发状态下你的战斗力是天花板级别的。没人敢正面挑衅你。你的不可预测性本身就是一种武器。',
    weak: '你自己就是自己最大的敌人。失控的时候你分不清敌我，伤到的往往是最亲近的人。',
    secret: '你的暴躁不是天生的。也许曾经你也是个温柔的人，只是在某个时刻之后，你决定不再温柔。',
    pattern: { yi: 2, yong: 3, zhi: 1, ren: 1, kuang: 3, yin: 1 }
  },
  TANG: {
    code: 'TANG', name: '唐僧', title: '走哪儿死哪儿',
    emoji: '🙏',
    quote: '"我有大义！……等等，为什么他们都在砍我？"',
    desc: '你有一颗金子般的心，和一具毫无自保能力的身体。你相信人性本善，相信正道永存，相信好人有好报。然后你被现实打脸，但你下次还信。这份天真的善良，在江湖上要么感化众生，要么……被众生感化。',
    tags: ['#圣母心', '#天真到可爱', '#人形ATM', '#专业被骗'],
    strong: '你的善良能感化最铁石心肠的人。在乱世中，你是最稀缺的那种"好人"。',
    weak: '你不是在行走江湖，你是在行走食物链的底层。善良不是缺点，但"不分对象的善良"是。',
    secret: '你坚持善良，是因为你相信世界可以变好。但也许你只是不敢面对——如果不善良，你还剩什么？',
    pattern: { yi: 3, yong: 1, zhi: 1, ren: 3, kuang: 1, yin: 2 }
  },
  WANG: {
    code: 'WANG', name: '王者', title: '这个江湖我说了算',
    emoji: '👑',
    quote: '"跪下。"',
    desc: '你的实力、智谋、人脉、气场——全都是顶级的。你天生就是站在食物链顶端的人。你不需要证明什么，因为所有人都知道你有多强。你的一举一动都在改变整个江湖的格局。',
    tags: ['#满级大佬', '#全能型', '#一个打十个', '#天生领袖'],
    strong: '几乎没有弱点。你的综合实力在整个江湖上排得进前五。你做什么都容易，因为你有天赋加努力。',
    weak: '高处不胜寒。没有人敢跟你做真朋友，因为你太强了。你的孤独是最高级别的孤独。',
    secret: '你害怕的不是输，是平庸。你害怕有一天不再是最强的那个。这种恐惧驱动着你不断前进，但也让你永远无法停下。',
    pattern: { yi: 2, yong: 3, zhi: 3, ren: 1, kuang: 2, yin: 3 }
  },
  PO: {
    code: 'PO', name: '破落户', title: '活着就行·人形蟑螂',
    emoji: '🪳',
    quote: '"钱？命？都没有。但还活着。"',
    desc: '你是江湖上的小人物。没钱、没名、没武功。但你有一个所有人都羡慕的能力——活着。无论多危险的处境，你都能莫名其妙地活下来。别人不明白为什么，你自己也不明白。',
    tags: ['#底层玩家', '#存活率100%', '#命硬', '#运气怪'],
    strong: '生存能力MAX。你就是一只蟑螂——杀不死你的只会让你更……活着。在乱世中，能活着就是最大的本事。',
    weak: '除了活着，你好像也没什么其他本事了。你的人生就像一部"没什么大不了"的流水账。',
    secret: '你到底是怎么活下来的？是运气？是本能？还是……有人在暗中保护你？你从来没有想过这个问题。',
    pattern: { yi: 1, yong: 1, zhi: 1, ren: 1, kuang: 1, yin: 1 }
  },
  LIAO: {
    code: 'LIAO', name: '花蝴蝶', title: '全服社交天花板',
    emoji: '🦋',
    quote: '"你今天真好看。你昨天也好看。明天应该也好看。"',
    desc: '你是江湖上的社交达人。认识所有人，所有人都认识你。你的朋友遍布各大门派，从掌门到伙计都有你的微信。你嘴甜心细，走到哪儿都是人气王。',
    tags: ['#社交达人', '#嘴甜', '#朋友遍天下', '#墙头草'],
    strong: '你的信息网络覆盖整个江湖。没有你不知道的消息，没有你找不到的人。',
    weak: '朋友太多=没有真朋友。当所有人都觉得和你关系很好的时候，其实没有一个人和你真的很好。',
    secret: '你不停社交，是因为独处时你会感到恐惧。安静让你不舒服，所以你用热闹填满每一秒。',
    pattern: { yi: 1, yong: 2, zhi: 2, ren: 3, kuang: 2, yin: 3 }
  },
  SHA: {
    code: 'SHA', name: '杀神', title: '别让我看见你',
    emoji: '💀',
    quote: '"没有目击者 = 没有命案。"',
    desc: '你是江湖上的恐惧化身。不是因为你能打——虽然你确实能打——而是因为你真的会动手。你杀伐果断，不留余地。你不享受杀戮，但你也不抗拒。对你来说，这只是一份工作。',
    tags: ['#高效杀人', '#不留痕迹', '#冷血', '#职业选手'],
    strong: '执行力是全服第一。接了任务就完成，从不犹豫，从不失手。你是最好用的工具。',
    weak: '你把自己活成了一把刀。刀没有朋友，刀不会笑，刀只知道砍。有一天你会生锈、会断。',
    secret: '你第一次杀人的时候，手抖了吗？还是说……你已经记不清第一次是什么时候了？',
    pattern: { yi: 1, yong: 3, zhi: 2, ren: 1, kuang: 3, yin: 1 }
  },
  DAN: {
    code: 'DAN', name: '胆小鬼', title: '专业逃跑·三十六计走为上',
    emoji: '🏃',
    quote: '"三十六计，走为上计。我走了。拜拜。"',
    desc: '你不是武功最差的，但你绝对是跑得最快的。你的字典里没有"硬刚"这个词。遇到危险？跑。遇到冲突？跑。遇到美女？……多看两眼然后跑。',
    tags: ['#跑得快', '#求生欲MAX', '#审时度势', '#怂'],
    strong: '你活得比90%的江湖人都要长。这不是运气，这是本事。能跑也是一种天赋。',
    weak: '你永远在逃，但从未真正战斗过。你不知道自己的极限在哪里，因为你有生以来从未到达过。',
    secret: '你是在害怕打架，还是害怕失败？也许两者兼有。但最让你害怕的是——有一天你无处可逃。',
    pattern: { yi: 2, yong: 1, zhi: 2, ren: 2, kuang: 1, yin: 1 }
  },
  GOU: {
    code: 'GOU', name: '苟王', title: '能活到最后的才是赢家',
    emoji: '🐢',
    quote: '"你们先打，打完了我来捡装备。"',
    desc: '你深谙"苟"的哲学。不冒头、不站队、不立flag。你默默观察，等待最佳时机，然后以最小的代价获得最大的收益。你不是最强的，但你是最难被淘汰的。',
    tags: ['#苟', '#低风险', '#最后赢家', '#闷声发财'],
    strong: '你的战略眼光让你在混乱中永远占据优势。你不是在打架，你是在做投资。',
    weak: '你永远在等"最佳时机"，但最佳时机往往就是现在。犹豫会让你错过的比抓住的多。',
    secret: '你"苟"的本质不是谨慎——是恐惧。你害怕失去拥有的，所以宁愿不去争取新的。',
    pattern: { yi: 2, yong: 1, zhi: 3, ren: 1, kuang: 1, yin: 1 }
  },
  JIU: {
    code: 'JIU', name: '酒仙', title: '醉里挑灯看剑',
    emoji: '🍶',
    quote: '"我没醉！……这是什么地方？"',
    desc: '你是江湖上最能喝的人，也是最迷糊的人。你一半时间清醒一半时间醉，清醒的时候你是高手，醉了的时候你也是高手——因为醉拳嘛。你的招式飘逸不羁，因为你永远不知道下一招要打哪里。',
    tags: ['#醉拳', '#飘逸', '#潇洒', '#说不清'],
    strong: '你的醉拳是独门绝学。清醒状态下没人打得过你，醉酒状态更没人打得过你。',
    weak: '你的记忆是断片的，你的承诺也是。你不能参加任何需要"早起"的活动。',
    secret: '你到底是真的爱喝酒，还是用酒精逃避什么？这个问题，你大概也回答不了。',
    pattern: { yi: 2, yong: 2, zhi: 1, ren: 2, kuang: 3, yin: 2 }
  },
  BANG: {
    code: 'BANG', name: '帮主', title: '大家都是兄弟·钱的事再说',
    emoji: '🤝',
    quote: '"跟我混，吃香喝辣！……钱的事再说。"',
    desc: '你是天生的领导者——不是最强的那种，而是最有感染力的那种。你说话好使，因为你说的话让人觉得"嗯，有道理"。你的帮派可能不是最强的，但一定是最热闹的。',
    tags: ['#天生领袖', '#人格魅力', '#大忽悠', '#欠债达人'],
    strong: '你的领导力和感染力是顶级的。你能让一群散兵游勇变成一支队伍。',
    weak: '你总是画大饼，然后发现自己吃不起。你的承诺比你的钱多，你的债务比你的朋友多。',
    secret: '你拼命拉人、拼命画饼——是因为你害怕孤独。一个没有追随者的帮主，就是一个人。',
    pattern: { yi: 2, yong: 2, zhi: 1, ren: 2, kuang: 2, yin: 3 }
  },
  AN: {
    code: 'AN', name: '暗影', title: '你永远不会知道我存在',
    emoji: '🌑',
    quote: '"任务完成。没有留下任何痕迹。"',
    desc: '你不存在。至少在所有人的认知里，你不存在。你没有名字，没有门派，没有过去。你接活、完成、消失。像一滴水融入大海。江湖上有传说——但没人知道传说是真的。',
    tags: ['#隐形', '#完美执行', '#无痕', '#不存在'],
    strong: '你的隐匿术是整个江湖上最强的。你可以在一个人的房间里待三天而不被发现。',
    weak: '你把自己活成了一个影子。影子没有朋友、没有家、没有过去。你的存在感是负数。',
    secret: '你还记得自己的真名吗？还是说，"暗影"这个名字已经取代了你原来的身份？一个人活成一道影子，需要多大的勇气？或者说……需要多大的绝望？',
    pattern: { yi: 1, yong: 1, zhi: 3, ren: 1, kuang: 1, yin: 1 }
  },
  // ===== 隐藏人格 =====
  SHEN: {
    code: 'SHEN', name: '神仙', title: '系统Bug·不应该是这个结果',
    emoji: '🌀',
    quote: '"……你认真的？"',
    desc: '根据系统计算，你不应该存在于任何类别中。你的维度数据打破了所有预设模式。这不科学。这不合理。这不应该是测试能测出来的结果。但数据不会说谎——你就是一个bug。或者说，你是唯一正常的那个。',
    tags: ['#系统异常', '#不可分类', '#隐藏人格', '#你发现了秘密'],
    strong: '你没有固定的弱点，因为你没有固定的模式。你是不可预测的。',
    weak: '你连自己都不知道自己是什么类型。这种不确定感可能会让你在关键时刻犹豫。',
    secret: '你是少数能在测试中触发隐藏结果的人。这意味着你的性格有某种极其独特的组合——你可能才是这个江湖最危险的人。',
    pattern: null
  }
};

// ===== 核心状态 =====
let answers = [];
let currentQ = 0;
let visibleQuestions = [];
let triggeredDrinker = false;
let triggeredShen = false;
let dimScores = {};
let currentType = null;
let currentDiscrete = null;

function resetScores() {
  dimScores = {};
  DIMS.forEach(function(d) { dimScores[d] = []; });
}

// ===== 离散化：每维度得分列表 → L/M/H =====
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

// ===== KNN匹配：用离散模式找最相似的类型 =====
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
    var similarity = Math.max(0, Math.round((1 - dist / 12) * 100));
    if (dist < minDist || (dist === minDist && hits > bestHits)) {
      minDist = dist;
      bestMatch = key;
      bestHits = hits;
    }
  });

  return { code: bestMatch, similarity: Math.max(0, Math.round((1 - minDist / 12) * 100)), hits: bestHits };
}

// ===== 核心函数 =====
function startTest() {
  resetScores();
  answers = [];
  currentQ = 0;
  triggeredDrinker = false;
  triggeredShen = false;

  // 构建可见题目列表：18道常规题 + 随机插入gate_q1
  var regular = questions.filter(function(q) { return !q.isGate; });
  var gates = questions.filter(function(q) { return q.isGate; });

  // 随机位置插入gate_q1
  var gatePos = Math.floor(Math.random() * 10) + 5; // 插在第6-15题之间
  visibleQuestions = regular.slice();
  visibleQuestions.splice(gatePos, 0, gates[0]); // 插入第一道条件题

  showPage('question');
  renderQuestion();
}

function renderQuestion() {
  var q = visibleQuestions[currentQ];
  document.getElementById('qScene').textContent = q.scene;
  document.getElementById('qCounter').textContent = (currentQ + 1) + ' / ' + visibleQuestions.length;
  document.getElementById('progressBar').style.width = ((currentQ) / visibleQuestions.length * 100) + '%';
  document.getElementById('btnNext').classList.remove('visible');

  var optionsHtml = q.options.map(function(opt, i) {
    return '<div class="q-option" data-index="' + i + '" onclick="selectOption(this, ' + i + ')">' +
      '<div class="q-option-text">' +
      '<span class="q-option-label">' + opt.label + '</span>' +
      '<span>' + opt.text + '</span>' +
      '</div></div>';
  }).join('');

  document.getElementById('qOptions').innerHTML = optionsHtml;
}

function selectOption(el, index) {
  document.querySelectorAll('.q-option').forEach(function(o) { o.classList.remove('selected'); });
  el.classList.add('selected');
  answers[currentQ] = index;
  document.getElementById('btnNext').classList.add('visible');
}

function nextQuestion() {
  if (answers[currentQ] === undefined) return;

  var q = visibleQuestions[currentQ];
  var opt = q.options[answers[currentQ]];

  // 隐藏人格触发
  if (opt.triggerShen) {
    triggeredShen = true;
  }

  // 条件题逻辑
  if (opt.trigger === 'drinker') {
    triggeredDrinker = true;
    // 插入第二道条件题
    var gate2 = questions.find(function(qq) { return qq.id === 'gate_q2'; });
    visibleQuestions.splice(currentQ + 1, 0, gate2);
  }

  // 计分
  if (opt.d) {
    var dim = q.dim;
    if (dim !== 'hidden' && DIMS.indexOf(dim) >= 0) {
      dimScores[dim].push(opt.d[dim] || 2);
    }
  }

  currentQ++;

  if (currentQ < visibleQuestions.length) {
    var body = document.querySelector('.q-body');
    body.style.opacity = '0';
    body.style.transform = 'translateY(10px)';
    setTimeout(function() {
      renderQuestion();
      body.style.opacity = '1';
      body.style.transform = 'translateY(0)';
    }, 200);
  } else {
    showPage('loading');
    setTimeout(function() {
      showResult();
    }, 2500);
  }
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

function showResult() {
  // 如果触发了隐藏人格
  if (triggeredShen) {
    renderType(TYPE_DETAILS.SHEN, 0);
    return;
  }

  var discrete = discretize(dimScores);
  var match = findBestMatch(discrete);
  var type = TYPE_DETAILS[match.code];
  renderType(type, match.similarity, discrete);
}

function renderType(type, similarity, discrete) {
  currentType = type;
  currentDiscrete = discrete || null;

  document.getElementById('resultEmoji').textContent = type.emoji;
  document.getElementById('resultCode').textContent = type.code;
  document.getElementById('resultName').textContent = type.name;
  document.getElementById('resultTitle').textContent = type.title;
  document.getElementById('resultQuote').textContent = type.quote;
  document.getElementById('resultDesc').textContent = type.desc;
  document.getElementById('resultStrength').textContent = type.strong;
  document.getElementById('resultWeakness').textContent = type.weak;
  document.getElementById('resultHidden').textContent = type.secret;

  // 标签
  var tagsHtml = type.tags.map(function(t) {
    return '<span class="result-trait">' + t + '</span>';
  }).join('');
  document.getElementById('resultTraits').innerHTML = tagsHtml;

  // 匹配度
  if (similarity > 0) {
    document.getElementById('matchScore').textContent = '匹配度 ' + similarity + '%';
    document.getElementById('matchScore').style.display = 'block';
  } else {
    document.getElementById('matchScore').style.display = 'none';
  }

  // 六维条形图
  if (discrete) {
    var barsHtml = '';
    DIMS.forEach(function(d) {
      var val = discrete[d] === 'L' ? 25 : discrete[d] === 'M' ? 55 : 85;
      var label = DIM_LABELS[d] + ' ' + DIM_ICONS[d] + ' ' + (discrete[d] === 'L' ? '低' : discrete[d] === 'M' ? '中' : '高');
      barsHtml += '<div class="trait-bar-row">' +
        '<div class="trait-bar-label">' + label + '</div>' +
        '<div class="trait-bar-track"><div class="trait-bar-fill gold" style="width:0%" data-width="' + val + '%"></div></div>' +
        '</div>';
    });
    document.getElementById('traitBars').innerHTML = barsHtml;
  }

  showPage('result');

  // 动画
  setTimeout(function() {
    document.querySelectorAll('.trait-bar-fill[data-width]').forEach(function(el) {
      el.style.width = el.getAttribute('data-width');
    });
  }, 300);
}

// ===== 分享：填充卡片 → html2canvas 截图 → 弹窗预览 =====
function shareResult() {
  if (!currentType) return;

  var t = currentType;

  // 填充分享卡片
  document.getElementById('scEmoji').textContent = t.emoji;
  document.getElementById('scCode').textContent = t.code;
  document.getElementById('scName').textContent = t.name;
  document.getElementById('scTitle').textContent = t.title;
  document.getElementById('scQuote').textContent = t.quote;

  // 标签
  var tagsHtml = t.tags.map(function(tag) {
    return '<span style="display:inline-block;padding:3px 10px;background:rgba(255,215,0,0.06);border:1px solid rgba(255,215,0,0.12);border-radius:12px;font-size:11px;color:#b8962a;margin:2px;">' + tag + '</span>';
  }).join('');
  document.getElementById('scTags').innerHTML = tagsHtml;

  // 描述
  document.getElementById('scDesc').textContent = t.desc.substring(0, 120) + '…';

  // 六维条形图
  if (currentDiscrete) {
    var barsHtml = '';
    DIMS.forEach(function(d) {
      var val = currentDiscrete[d] === 'L' ? 25 : currentDiscrete[d] === 'M' ? 55 : 85;
      var level = currentDiscrete[d] === 'L' ? '低' : currentDiscrete[d] === 'M' ? '中' : '高';
      barsHtml += '<div style="display:flex;align-items:center;margin-bottom:6px;">' +
        '<div style="font-size:10px;color:#8b8b9e;width:70px;text-align:right;margin-right:8px;">' + DIM_LABELS[d] + ' ' + DIM_ICONS[d] + ' ' + level + '</div>' +
        '<div style="flex:1;height:4px;background:#2a2a3e;border-radius:2px;overflow:hidden;">' +
        '<div style="height:100%;border-radius:2px;background:linear-gradient(90deg,#b8962a,#ffd700);box-shadow:0 0 6px rgba(255,215,0,0.3);width:' + val + '%;"></div>' +
        '</div></div>';
    });
    document.getElementById('scBars').innerHTML = barsHtml;
  }

  // 显示卡片用于截图
  var card = document.getElementById('shareCard');
  card.style.left = '0';
  card.style.zIndex = '9998';

  // 用 html2canvas 截图
  if (typeof html2canvas !== 'undefined') {
    html2canvas(card, {
      backgroundColor: '#0a0a0f',
      scale: 2,
      useCORS: true,
      logging: false
    }).then(function(canvas) {
      // 隐藏卡片
      card.style.left = '-9999px';
      card.style.zIndex = '';

      // 显示弹窗
      var img = document.getElementById('shareImage');
      img.src = canvas.toDataURL('image/png');
      document.getElementById('shareModal').style.display = 'flex';
    }).catch(function() {
      card.style.left = '-9999px';
      card.style.zIndex = '';
      fallbackShare();
    });
  } else {
    card.style.left = '-9999px';
    card.style.zIndex = '';
    fallbackShare();
  }
}

function fallbackShare() {
  var t = currentType;
  var text = '【WBTI武侠测试】我是「' + t.code + ' · ' + t.name + '」—— ' + t.title + '。快测测你在江湖里是什么角色！';
  if (navigator.share) {
    navigator.share({ title: 'WBTI武侠性格测试', text: text, url: window.location.href }).catch(function() {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text + ' ' + window.location.href).then(function() {
      var btn = document.querySelector('.btn-share');
      var orig = btn.innerHTML;
      btn.innerHTML = '&#10003; 已复制到剪贴板';
      btn.style.background = '#888';
      setTimeout(function() { btn.innerHTML = orig; btn.style.background = ''; }, 2000);
    });
  } else {
    alert(text);
  }
}

function closeShareModal() {
  document.getElementById('shareModal').style.display = 'none';
}

function downloadImage() {
  var img = document.getElementById('shareImage');
  if (!img.src) return;
  var a = document.createElement('a');
  a.href = img.src;
  a.download = 'WBTI_' + (currentType ? currentType.code : 'result') + '.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function retry() {
  showPage('welcome');
}

document.querySelector('.q-body').style.transition = 'opacity 0.2s ease, transform 0.2s ease';

(function() {
  var base = 287643;
  var el = document.getElementById('fakeCount');
  if (el) {
    setInterval(function() {
      var n = base + Math.floor(Math.random() * 8);
      el.textContent = n.toLocaleString();
    }, 3000);
  }
})();
