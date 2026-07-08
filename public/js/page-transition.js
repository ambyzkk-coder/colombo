(function() {
    const transitionOverlay = document.createElement('div');
    transitionOverlay.id = 'page-transition';
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%);
        z-index: 99999;
        pointer-events: none;
        opacity: 1;
        transition: opacity 0.6s ease-in-out;
    `;
    document.body.appendChild(transitionOverlay);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            transitionOverlay.style.opacity = '0';
        }, 50);
        
        setTimeout(() => {
            transitionOverlay.remove();
        }, 700);
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('http')) {
                e.preventDefault();
                
                if (!document.getElementById('page-transition')) {
                    document.body.appendChild(transitionOverlay);
                }
                transitionOverlay.style.opacity = '1';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            }
        });
    });
})();
