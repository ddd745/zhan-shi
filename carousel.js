// 轮播图逻辑
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');
const imgs = track.children;
const total = imgs.length;
let cur = 0, timer = null, touchX = 0;

// 生成指示点
for (let i = 0; i < total; i++) {
  const d = document.createElement('span');
  if (i === 0) d.className = 'active';
  d.onclick = () => go(i);
  dotsContainer.appendChild(d);
}
const dots = dotsContainer.children;

/**
 * 切换到指定轮播图页面
 * 通过计算偏移量循环定位到目标索引，并更新底部指示点的激活状态
 *
 * @param {number} idx - 目标页面索引（负数支持循环向前）
 */
function go(idx) {
  cur = (idx + total) % total;
  track.style.transform = `translateX(-${cur * 100}%)`;
  for (let i = 0; i < dots.length; i++) dots[i].className = i === cur ? 'active' : '';
}

// 自动播放（3秒）
function start() { timer = setInterval(() => go(cur + 1), 3000); }
start();

// 指示点悬停暂停
dotsContainer.onmouseenter = () => clearInterval(timer);
dotsContainer.onmouseleave = start;

// 触屏滑动
track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
track.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
  start();
}, { passive: true });