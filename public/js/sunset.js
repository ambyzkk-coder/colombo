(function() {
    const weatherOverlay = document.createElement('div');
    weatherOverlay.id = 'weather-overlay';
    weatherOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #ff7e5f 0%, #feb47b 30%, #ffb88c 50%, #de6262 70%, #5b2c6f 100%);
        z-index: -2;
        opacity: 0;
        transition: opacity 2s ease-in-out;
        pointer-events: none;
    `;
    document.body.insertBefore(weatherOverlay, document.body.firstChild);
    
    const sunsetContainer = document.createElement('div');
    sunsetContainer.id = 'sunset-container';
    sunsetContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
        opacity: 0;
        transition: opacity 2s ease-in-out;
    `;
    
    const sun = document.createElement('div');
    sun.style.cssText = `
        position: absolute;
        bottom: 20%;
        left: 50%;
        transform: translateX(-50%);
        width: 180px;
        height: 180px;
        background: radial-gradient(circle, #fff7e6 0%, #ffd700 20%, #ff8c00 50%, #ff4500 80%, transparent 100%);
        border-radius: 50%;
        box-shadow: 
            0 0 60px rgba(255, 215, 0, 0.8),
            0 0 120px rgba(255, 140, 0, 0.6),
            0 0 180px rgba(255, 69, 0, 0.4);
        animation: sun-glow 4s ease-in-out infinite;
    `;
    
    const rays = document.createElement('div');
    rays.style.cssText = `
        position: absolute;
        bottom: calc(20% + 90px);
        left: 50%;
        transform: translateX(-50%);
        width: 400px;
        height: 200px;
        background: radial-gradient(ellipse at bottom, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
        filter: blur(20px);
        animation: rays-pulse 6s ease-in-out infinite;
    `;
    
    const clouds = [];
    const cloudColors = ['rgba(255, 140, 100, 0.4)', 'rgba(255, 180, 120, 0.3)', 'rgba(255, 200, 150, 0.25)'];
    
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        const y = 10 + Math.random() * 30;
        const size = 150 + Math.random() * 200;
        
        cloud.style.cssText = `
            position: absolute;
            top: ${y}%;
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size * 0.4}px;
            background: radial-gradient(ellipse at center, ${cloudColors[i % cloudColors.length]} 0%, transparent 70%);
            border-radius: 50%;
            filter: blur(15px);
            animation: cloud-drift ${40 + Math.random() * 20}s linear infinite;
            animation-delay: ${-Math.random() * 40}s;
        `;
        
        sunsetContainer.appendChild(cloud);
        clouds.push(cloud);
    }
    
    const birds = document.createElement('div');
    birds.style.cssText = `
        position: absolute;
        top: 25%;
        right: 15%;
        width: 200px;
        height: 50px;
    `;
    
    for (let i = 0; i < 5; i++) {
        const bird = document.createElement('div');
        bird.style.cssText = `
            position: absolute;
            left: ${i * 40}px;
            top: ${Math.random() * 30}px;
            width: 20px;
            height: 8px;
            opacity: 0.6;
        `;
        bird.innerHTML = `<svg width="20" height="8" viewBox="0 0 20 8">
            <path d="M0 4 Q5 1 10 4 Q15 1 20 4" stroke="#1a1a1a" stroke-width="1.5" fill="none"/>
        </svg>`;
        birds.appendChild(bird);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sun-glow {
            0%, 100% { 
                transform: translateX(-50%) scale(1);
                box-shadow: 
                    0 0 60px rgba(255, 215, 0, 0.8),
                    0 0 120px rgba(255, 140, 0, 0.6),
                    0 0 180px rgba(255, 69, 0, 0.4);
            }
            50% { 
                transform: translateX(-50%) scale(1.05);
                box-shadow: 
                    0 0 80px rgba(255, 215, 0, 0.9),
                    0 0 140px rgba(255, 140, 0, 0.7),
                    0 0 200px rgba(255, 69, 0, 0.5);
            }
        }
        
        @keyframes rays-pulse {
            0%, 100% { 
                opacity: 0.5;
                transform: translateX(-50%) scaleX(1);
            }
            50% { 
                opacity: 0.7;
                transform: translateX(-50%) scaleX(1.1);
            }
        }
        
        @keyframes cloud-drift {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(100vw);
            }
        }
    `;
    
    document.head.appendChild(style);
    sunsetContainer.appendChild(rays);
    sunsetContainer.appendChild(sun);
    sunsetContainer.appendChild(birds);
    document.body.appendChild(sunsetContainer);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            weatherOverlay.style.opacity = '1';
            sunsetContainer.style.opacity = '1';
        }, 100);
    });
})();
