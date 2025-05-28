document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    const carouselContainer = document.querySelector('.carousel-container');
    const loadingIndicator = document.querySelector('.loading-indicator');

    // 检查元素是否存在
    if (!track || !slides.length || !prevBtn || !nextBtn || !indicators.length || !carouselContainer) {
        console.error('轮播图初始化失败：找不到必要的DOM元素');
        return;
    }

    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;

    // 显示加载指示器
    function showLoading() {
        if (loadingIndicator) {
            loadingIndicator.classList.add('active');
            setTimeout(() => {
                loadingIndicator.classList.remove('active');
            }, 300);
        }
    }

    // 更新轮播图位置（修复位移计算）
    function updateTrackPosition() {
        // 关键修复：使用正确的位移计算
        const translateXValue = -currentSlide * 100;
        track.style.transform = `translateX(${translateXValue}%)`;
        isAnimating = true;
        
        // 动画结束后重置标志
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // 更新指示器状态
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // 下一张幻灯片
    function goToNextSlide() {
        if (isAnimating) return;
        showLoading();
        currentSlide = (currentSlide + 1) % slides.length;
        updateTrackPosition();
        updateIndicators();
    }

    // 上一张幻灯片
    function goToPrevSlide() {
        if (isAnimating) return;
        showLoading();
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateTrackPosition();
        updateIndicators();
    }

    // 跳转到指定幻灯片
    function goToSlide(index) {
        if (isAnimating) return;
        showLoading();
        currentSlide = index;
        updateTrackPosition();
        updateIndicators();
    }

    // 自动播放
    function startSlideInterval() {
        slideInterval = setInterval(goToNextSlide, 5000);
    }

    // 暂停自动播放
    function pauseSlideInterval() {
        clearInterval(slideInterval);
    }

    // 重新开始自动播放
    function resumeSlideInterval() {
        startSlideInterval();
    }

    // 事件监听
    nextBtn.addEventListener('click', () => {
        pauseSlideInterval();
        goToNextSlide();
        resumeSlideInterval();
    });

    prevBtn.addEventListener('click', () => {
        pauseSlideInterval();
        goToPrevSlide();
        resumeSlideInterval();
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            pauseSlideInterval();
            goToSlide(parseInt(indicator.dataset.index));
            resumeSlideInterval();
        });
    });

    // 触摸滑动支持（优化触发逻辑）
    let startX = 0;
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        pauseSlideInterval();
    }, false);

    carouselContainer.addEventListener('touchmove', (e) => {
        // 防止页面滚动
        if (Math.abs(e.touches[0].clientX - startX) > 10) {
            e.preventDefault();
        }
    }, { passive: false });

    carouselContainer.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        handleSwipe(startX, endX);
        resumeSlideInterval();
    }, false);

    function handleSwipe(start, end) {
        if (start - end > 50) {
            goToNextSlide();
        } else if (end - start > 50) {
            goToPrevSlide();
        }
    }

    // 初始化
    updateIndicators();
    startSlideInterval();
});