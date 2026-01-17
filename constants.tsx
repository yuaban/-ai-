
import { Question, Category } from './types';

export const QUESTIONS: Question[] = [
  // 思维能力 (Thinking)
  { id: 1, category: Category.THINKING, text: "当看到天上的云朵时，孩子能描述出多少种不同的形象？", options: [{label: "1-2种", score: 1}, {label: "3-5种", score: 3}, {label: "6种以上且有故事情节", score: 5}] },
  { id: 2, category: Category.THINKING, text: "如果给孩子一个圆圈，他能基于此画出多少种完全不同的东西？", options: [{label: "常见的（如太阳、脸）", score: 2}, {label: "具象的（如钟表、车轮）", score: 4}, {label: "抽象或意想不到的（如黑洞、传送门）", score: 5}] },
  { id: 3, category: Category.THINKING, text: "孩子在描述一件事情时，逻辑顺序是否清晰？", options: [{label: "经常跳跃，难以理解", score: 2}, {label: "基本清晰，偶有遗漏", score: 4}, {label: "因果逻辑非常明确", score: 5}] },
  { id: 4, category: Category.THINKING, text: "孩子是否喜欢提问‘如果...会怎么样？’", options: [{label: "很少提问", score: 1}, {label: "偶尔会问", score: 3}, {label: "经常提出奇思妙想的问题", score: 5}] },
  { id: 5, category: Category.THINKING, text: "在解释自己的画作时，孩子能讲出一个完整的故事吗？", options: [{label: "只能简单命名", score: 2}, {label: "能描述画面内容", score: 4}, {label: "有完整的情节和情感表达", score: 5}] },
  { id: 6, category: Category.THINKING, text: "孩子是否能发现两个截然不同的事物之间的相似点？", options: [{label: "较难发现", score: 2}, {label: "能发现表象相似", score: 4}, {label: "能进行深层联想", score: 5}] },

  // 注意力 (Attention)
  { id: 7, category: Category.ATTENTION, text: "孩子开始一项感兴趣的绘画任务需要多久进入专注状态？", options: [{label: "需要反复催促", score: 1}, {label: "5分钟以内", score: 3}, {label: "立刻进入状态", score: 5}] },
  { id: 8, category: Category.ATTENTION, text: "在进行手工或绘画时，孩子通常能坚持多久？", options: [{label: "不到10分钟", score: 2}, {label: "20-40分钟", score: 4}, {label: "1小时以上", score: 5}] },
  { id: 9, category: Category.ATTENTION, text: "在有轻微环境噪音的情况下，孩子是否容易分心？", options: [{label: "极易被打断", score: 2}, {label: "会看一眼但能继续", score: 4}, {label: "完全沉浸，不受影响", score: 5}] },
  { id: 10, category: Category.ATTENTION, text: "孩子对画作中细小部分的刻画是否有耐心？", options: [{label: "总想快点画完大轮廓", score: 2}, {label: "能完成大部分细节", score: 4}, {label: "非常迷恋细节处理", score: 5}] },
  { id: 11, category: Category.ATTENTION, text: "孩子是否能注意到别人容易忽略的细节？", options: [{label: "很少关注", score: 2}, {label: "偶尔发现", score: 4}, {label: "观察力极其敏锐", score: 5}] },
  { id: 12, category: Category.ATTENTION, text: "完成一项复杂任务后，孩子是否感到充实而非疲惫？", options: [{label: "感到很累，想放弃", score: 2}, {label: "一般", score: 4}, {label: "充满成就感和活力", score: 5}] },

  // 创造力 (Creativity)
  { id: 13, category: Category.CREATIVITY, text: "遇到画不出来的东西时，孩子会怎么办？", options: [{label: "直接放弃或哭闹", score: 1}, {label: "找参考图或求助", score: 3}, {label: "尝试用其他方式替代表达", score: 5}] },
  { id: 14, category: Category.CREATIVITY, text: "孩子是否喜欢拆解或重新组合玩具？", options: [{label: "怕弄坏，不喜欢", score: 2}, {label: "偶尔尝试", score: 4}, {label: "非常喜欢乱拆乱装", score: 5}] },
  { id: 15, category: Category.CREATIVITY, text: "面对一张废纸或废料，孩子能将其转化为艺术品吗？", options: [{label: "觉得是垃圾", score: 1}, {label: "能做简单的折叠", score: 3}, {label: "能产生极具创意的改造", score: 5}] },
  { id: 16, category: Category.CREATIVITY, text: "在执行老师/家长的指令时，孩子会有自己的‘小花招’吗？", options: [{label: "完全听从", score: 2}, {label: "偶尔微调", score: 4}, {label: "总想按自己的方法试试", score: 5}] },
  { id: 17, category: Category.CREATIVITY, text: "孩子对于‘新奇事物’的第一反应是？", options: [{label: "退缩或害怕", score: 2}, {label: "观望", score: 4}, {label: "极度兴奋并想上手", score: 5}] },
  { id: 18, category: Category.CREATIVITY, text: "孩子是否会为了实现一个想法而长时间反复尝试？", options: [{label: "失败两次就停", score: 2}, {label: "会尝试几次", score: 4}, {label: "不达目的不罢休", score: 5}] },

  // 艺术能力 (Artistic)
  { id: 19, category: Category.ARTISTIC, text: "孩子对色彩的搭配有明显的个人偏好吗？", options: [{label: "无所谓，随便拿", score: 1}, {label: "模仿常见的配色", score: 3}, {label: "有独特的审美见解", score: 5}] },
  { id: 20, category: Category.ARTISTIC, text: "孩子在拼图或积木中表现出的空间感如何？", options: [{label: "需要大量指导", score: 2}, {label: "中规中矩", score: 4}, {label: "能构建复杂的3D结构", score: 5}] },
  { id: 21, category: Category.ARTISTIC, text: "孩子是否能通过绘画表达当下的心情（开心/难过）？", options: [{label: "不能联系起来", score: 2}, {label: "色彩上有体现", score: 4}, {label: "内容与情绪高度统一", score: 5}] },
  { id: 22, category: Category.ARTISTIC, text: "孩子在户外看到美丽的风景时，是否会驻足观察？", options: [{label: "没什么反应", score: 2}, {label: "看一眼", score: 4}, {label: "会发出感叹并仔细看", score: 5}] },
  { id: 23, category: Category.ARTISTIC, text: "孩子画中的物体布局是否均衡？", options: [{label: "杂乱无章", score: 2}, {label: "大部分在中心", score: 4}, {label: "有意识的构图设计", score: 5}] },
  { id: 24, category: Category.ARTISTIC, text: "孩子是否会对某种特定的纹理或材质表现出浓厚兴趣？", options: [{label: "不关注", score: 2}, {label: "偶尔好奇", score: 4}, {label: "喜欢触摸和研究材质", score: 5}] },

  // 记忆力 (Memory)
  { id: 25, category: Category.MEMORY, text: "孩子听过一遍的故事，过两天还能讲出核心情节吗？", options: [{label: "基本全忘了", score: 1}, {label: "能讲出大概", score: 3}, {label: "能复述细节和金句", score: 5}] },
  { id: 26, category: Category.MEMORY, text: "在‘找不同’的游戏中，孩子的表现如何？", options: [{label: "找得很慢", score: 2}, {label: "正常水平", score: 4}, {label: "瞬间锁定差异点", score: 5}] },
  { id: 27, category: Category.MEMORY, text: "孩子是否能默画出前几天看过的某个有趣的建筑或物品？", options: [{label: "完全不记得样子", score: 2}, {label: "能画出轮廓", score: 4}, {label: "视觉记忆非常精准", score: 5}] },
  { id: 28, category: Category.MEMORY, text: "孩子学习新技能（如折纸步奏）的速度如何？", options: [{label: "需要手把手教多遍", score: 2}, {label: "看两三遍能学会", score: 4}, {label: "看一遍就能记住步奏", score: 5}] },
  { id: 29, category: Category.MEMORY, text: "孩子是否常能联想起很久以前见过的某个艺术细节？", options: [{label: "不记得", score: 1}, {label: "经提醒能想起", score: 3}, {label: "经常主动提起细节", score: 5}] },
  { id: 30, category: Category.MEMORY, text: "孩子在分类整理物品时（理解记忆），逻辑是否顺畅？", options: [{label: "随意堆放", score: 2}, {label: "按大小/颜色分", score: 4}, {label: "有一套复杂的分类逻辑", score: 5}] },
];
