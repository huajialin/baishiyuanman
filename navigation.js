// c-homePage.js 新增导航栏交互效果
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 移除所有active类
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 给当前项添加active类
            this.classList.add('active');
            
            // 添加点击反馈效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // 新增：高亮当前页面导航项
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop();
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                if (href === currentPage) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }
    
    highlightCurrentPage();
});