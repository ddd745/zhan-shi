/**
 * 统一平滑滚动处理
 * 处理所有带 href="#xxx" 的链接，点击后平滑滚动到对应区域
 * 顶部预留80px偏移量（导航栏高度）
 */
document.addEventListener('click', function(e) {
    // 获取被点击的链接元素
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    // 阻止默认跳转行为
    e.preventDefault();

    // 计算目标位置，预留导航栏高度偏移量
    const navHeight = 80; // 导航栏高度
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

    // 执行平滑滚动
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});
