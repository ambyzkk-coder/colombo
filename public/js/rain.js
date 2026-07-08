(function() {
    const rainContainer = document.createElement('div');
    rainContainer.id = 'rain-container';
    rainContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
        opacity: 0;
        transition: opacity 1.5s ease-in-out;
    `;
    
    const raindrops = [];
    const numDrops = 150;
    
    for (let i = 0; i < numDrops; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        
        const x = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 0.5 + Math.random() * 0.3;
        const size = 15 + Math.random() * 25;
        
        drop.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: -${size}px;
            width: 2px;
            height: ${size}px;
            background: linear-gradient(to bottom, transparent, rgba(174, 194, 224, 0.5), rgba(174, 194, 224, 0.8));
            animation: rain-fall ${duration}s linear infinite;
            animation-delay: ${delay}s;
            opacity: ${0.3 + Math.random() * 0.5};
        `;
        
        rainContainer.appendChild(drop);
        raindrops.push(drop);
    }
    
    const splashContainer = document.createElement('div');
    splashContainer.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        transition: opacity 1.5s ease-in-out;
    `;
    
    for (let i = 0; i < 30; i++) {
        const splash = document.createElement('div');
        const x = Math.random() * 100;
        const delay = Math.random() * 1.5;
        
        splash.style.cssText = `
            position: absolute;
            bottom: ${Math.random() * 80}px;
            left: ${x}%;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(174, 194, 224, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            animation: splash-drop 1s ease-out infinite;
            animation-delay: ${delay}s;
            opacity: 0;
        `;
        
        splashContainer.appendChild(splash);
    }
    
    const lightnings = document.createElement('div');
    lightnings.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        background: white;
        opacity: 0;
        animation: lightning 8s infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rain-fall {
            0% {
                transform: translateY(-100vh);
            }
            100% {
                transform: translateY(100vh);
            }
        }
        
        @keyframes splash-drop {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                transform: scale(1);
                opacity: 0.7;
            }
            100% {
                transform: scale(1.5);
                opacity: 0;
            }
        }
        
        @keyframes lightning {
            0%, 89%, 91%, 93%, 95%, 100% {
                opacity: 0;
            }
            90%, 92%, 94% {
                opacity: 0.3;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(rainContainer);
    document.body.appendChild(splashContainer);
    document.body.appendChild(lightnings);
    
    document.body.style.background = 'linear-gradient(180deg, #4a5568 0%, #718096 40%, #a0aec0 100%)';
    document.body.style.transition = 'background 1.5s ease-in-out';
    
    setTimeout(() => {
        rainContainer.style.opacity = '1';
        splashContainer.style.opacity = '1';
    }, 100);
})();
