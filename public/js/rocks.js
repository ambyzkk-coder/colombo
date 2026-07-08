(function() {
    const rocks = document.createElement('div');
    rocks.className = 'rocks';
    rocks.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200px;
        z-index: 0;
        pointer-events: none;
    `;
    
    const rock1 = document.createElement('div');
    rock1.style.cssText = `
        position: absolute;
        bottom: 100px;
        left: 12%;
        width: 130px;
        height: 150px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 150'%3E%3Cpath fill='%232a3f4f' d='M15,150 L25,85 Q30,65 40,75 L50,55 Q60,35 75,45 L85,40 Q100,30 105,50 L110,75 Q115,95 120,150 Z'/%3E%3Cpath fill='%231d2d3a' d='M30,150 L40,100 Q45,85 55,90 L65,75 Q75,60 85,70 L95,80 Q105,90 110,150 Z'/%3E%3Cpath fill='%230f1a22' d='M45,150 L55,110 Q60,100 70,105 L80,100 Q90,95 95,115 L100,150 Z'/%3E%3C/svg%3E") no-repeat;
        background-size: contain;
        filter: drop-shadow(0 5px 20px rgba(0,0,0,0.5));
        opacity: 0.9;
    `;
    
    const splash1 = document.createElement('div');
    splash1.className = 'splash';
    splash1.style.cssText = `
        position: absolute;
        bottom: 95px;
        left: calc(12% + 60px);
        width: 60px;
        height: 60px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 70%);
        border-radius: 50%;
        animation: splash-wave 2s ease-in-out infinite;
        filter: blur(2px);
    `;
    
    const foam1 = document.createElement('div');
    foam1.style.cssText = `
        position: absolute;
        bottom: 90px;
        left: calc(12% + 30px);
        width: 80px;
        height: 25px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 80%, transparent);
        border-radius: 50%;
        filter: blur(3px);
        animation: foam-move 3s ease-in-out infinite;
    `;
    
    const rock2 = document.createElement('div');
    rock2.style.cssText = `
        position: absolute;
        bottom: 70px;
        right: 18%;
        width: 100px;
        height: 120px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'%3E%3Cpath fill='%232a3f4f' d='M8,120 L18,70 Q23,55 33,60 L43,45 Q53,30 63,40 L73,55 Q83,70 88,120 Z'/%3E%3Cpath fill='%231d2d3a' d='M22,120 L32,80 Q37,70 47,75 L57,65 Q67,55 72,80 L77,120 Z'/%3E%3Cpath fill='%230f1a22' d='M37,120 L47,90 Q52,80 62,85 L72,95 L77,120 Z'/%3E%3C/svg%3E") no-repeat;
        background-size: contain;
        filter: drop-shadow(0 5px 20px rgba(0,0,0,0.5));
        opacity: 0.9;
    `;
    
    const splash2 = document.createElement('div');
    splash2.className = 'splash';
    splash2.style.cssText = `
        position: absolute;
        bottom: 65px;
        right: calc(18% + 40px);
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 70%);
        border-radius: 50%;
        animation: splash-wave 2.5s ease-in-out infinite;
        animation-delay: 0.5s;
        filter: blur(2px);
    `;
    
    const foam2 = document.createElement('div');
    foam2.style.cssText = `
        position: absolute;
        bottom: 60px;
        right: calc(18% + 20px);
        width: 70px;
        height: 20px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 80%, transparent);
        border-radius: 50%;
        filter: blur(3px);
        animation: foam-move 3.5s ease-in-out infinite;
        animation-delay: 0.3s;
    `;
    
    rocks.appendChild(rock1);
    rocks.appendChild(splash1);
    rocks.appendChild(foam1);
    rocks.appendChild(rock2);
    rocks.appendChild(splash2);
    rocks.appendChild(foam2);
    document.body.appendChild(rocks);
    
    const seagulls = document.createElement('div');
    seagulls.className = 'seagulls';
    
    for (let i = 0; i < 5; i++) {
        const seagull = document.createElement('div');
        seagull.className = 'seagull';
        seagulls.appendChild(seagull);
    }
    
    document.body.appendChild(seagulls);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes splash-wave {
            0%, 100% { 
                transform: scale(0.8) translateY(0); 
                opacity: 0.6;
            }
            50% { 
                transform: scale(1.3) translateY(-15px); 
                opacity: 0.9;
            }
        }
        
        @keyframes foam-move {
            0%, 100% { 
                transform: translateX(0) scaleX(1); 
                opacity: 0.7;
            }
            50% { 
                transform: translateX(10px) scaleX(1.2); 
                opacity: 0.9;
            }
        }
    `;
    document.head.appendChild(style);
})();


