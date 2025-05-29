// b-lobby.js
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    // 添加服务项点击效果
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取服务名称
            const serviceName = this.querySelector('p').textContent;
            
            // 显示服务名称提示
            showNotification(`已选择服务: ${serviceName}`);
        });
    });
    
    // 显示通知函数
    function showNotification(message) {
        // 移除现有通知
        const existingNotification = document.querySelector('.service-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'service-notification';
        notification.textContent = message;
        
        // 添加样式
        notification.style.position = 'fixed';
        notification.style.bottom = '70px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#b5997f';
        notification.style.color = 'white';
        notification.style.padding = '8px 16px';
        notification.style.borderRadius = '20px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
        notification.style.fontSize = '13px';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        
        document.body.appendChild(notification);
        
        // 显示通知
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // 2秒后移除通知
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
});