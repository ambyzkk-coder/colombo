(function() {
    const eventSource = new EventSource('/events');
    
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'remote-command') {
            handleRemoteCommand(data);
        }
    };
    
    eventSource.onerror = () => {
        console.log('Riconnessione in corso...');
    };
    
    function handleRemoteCommand(data) {
        console.log('Comando remoto ricevuto:', data);
        
        switch (data.type) {
            case 'navigate':
                handleNavigate(data.page);
                break;
            case 'gallery':
                handleGallery(data.action);
                break;
            case 'custom':
                handleCustom(data.command, data.data);
                break;
        }
        
        showRemoteNotification(data);
    }
    
    function handleNavigate(page) {
        const routes = {
            'chi-siamo': '/chi-siamo',
            'progetto': '/progetto',
            'storia': '/storia',
            'dashboard': '/dashboard',
            'home': '/'
        };
        
        if (routes[page]) {
            window.location.href = routes[page];
        }
    }
    
    function handleGallery(action) {
        if (typeof changeSlide === 'function') {
            if (action === 'next') {
                changeSlide(1);
            } else if (action === 'prev') {
                changeSlide(-1);
            }
        }
    }
    
    function handleCustom(command, data) {
        if (command === 'scroll-top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (command === 'scroll-bottom') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else if (command === 'refresh') {
            location.reload();
        }
    }
    
    function showRemoteNotification(data) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #1a4a6e, #0d1b2a);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 99999;
            animation: slideInRight 0.5s ease;
            font-family: 'Georgia', serif;
        `;
        
        let message = 'Comando remoto: ';
        if (data.type === 'navigate') {
            message += `Vai a ${data.page}`;
        } else if (data.type === 'gallery') {
            message += `Galleria: ${data.action}`;
        } else if (data.type === 'custom') {
            message += `${data.command}`;
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
})();
