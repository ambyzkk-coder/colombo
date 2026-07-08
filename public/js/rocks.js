(function() {
    const rocks = document.createElement('div');
    rocks.className = 'rocks';
    rocks.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 250px;
        z-index: 0;
        pointer-events: none;
    `;
    
    const rock1 = document.createElement('div');
    rock1.style.cssText = `
        position: absolute;
        bottom: 120px;
        left: 3%;
        width: 140px;
        height: 160px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 160'%3E%3Cpath fill='%232a3f4f' d='M15,160 L25,85 Q30,60 45,75 L55,50 Q65,25 85,40 L95,35 Q115,25 120,55 L125,80 Q130,100 135,160 Z'/%3E%3Cpath fill='%231d2d3a' d='M35,160 L45,100 Q50,80 65,90 L75,70 Q90,55 100,75 L110,90 Q120,105 125,160 Z'/%3E%3Cpath fill='%230f1a22' d='M55,160 L65,115 Q70,100 85,110 L95,105 Q105,100 110,125 L115,160 Z'/%3E%3C/svg%3E") no-repeat;
        background-size: contain;
        filter: drop-shadow(0 5px 25px rgba(0,0,0,0.6));
        opacity: 0.95;
    `;
    
    const foam1 = document.createElement('div');
    foam1.style.cssText = `
        position: absolute;
        bottom: 110px;
        left: calc(3% + 20px);
        width: 120px;
        height: 30px;
        background: radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(220,240,255,0.6) 40%, transparent 70%);
        border-radius: 50%;
        filter: blur(2px);
        animation: foam-pulse 2s ease-in-out infinite;
    `;
    
    const waveLine1 = document.createElement('div');
    waveLine1.style.cssText = `
        position: absolute;
        bottom: 105px;
        left: calc(3% - 10px);
        width: 150px;
        height: 40px;
        border: 3px solid rgba(255,255,255,0.4);
        border-top: none;
        border-radius: 0 0 50% 50%;
        filter: blur(1px);
        animation: wave-crash 3s ease-in-out infinite;
    `;
    
    const rock2 = document.createElement('div');
    rock2.style.cssText = `
        position: absolute;
        bottom: 90px;
        right: 4%;
        width: 110px;
        height: 130px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110 130'%3E%3Cpath fill='%232a3f4f' d='M10,130 L20,70 Q25,45 40,60 L50,35 Q60,15 80,35 L90,55 Q100,75 105,130 Z'/%3E%3Cpath fill='%231d2d3a' d='M25,130 L35,80 Q40,60 55,70 L65,55 Q80,40 90,65 L100,85 Q105,105 105,130 Z'/%3E%3Cpath fill='%230f1a22' d='M45,130 L55,90 Q60,75 75,85 L85,95 Q95,105 100,130 Z'/%3E%3C/svg%3E") no-repeat;
        background-size: contain;
        filter: drop-shadow(0 5px 25px rgba(0,0,0,0.6));
        opacity: 0.95;
    `;
    
    const foam2 = document.createElement('div');
    foam2.style.cssText = `
        position: absolute;
        bottom: 80px;
        right: calc(4% + 10px);
        width: 100px;
        height: 25px;
        background: radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(220,240,255,0.6) 40%, transparent 70%);
        border-radius: 50%;
        filter: blur(2px);
        animation: foam-pulse 2.5s ease-in-out infinite;
        animation-delay: 0.5s;
    `;
    
    const waveLine2 = document.createElement('div');
    waveLine2.style.cssText = `
        position: absolute;
        bottom: 75px;
        right: calc(4% - 10px);
        width: 130px;
        height: 35px;
        border: 3px solid rgba(255,255,255,0.4);
        border-top: none;
        border-radius: 0 0 50% 50%;
        filter: blur(1px);
        animation: wave-crash 3.5s ease-in-out infinite;
        animation-delay: 0.7s;
    `;
    
    rocks.appendChild(rock1);
    rocks.appendChild(foam1);
    rocks.appendChild(waveLine1);
    rocks.appendChild(rock2);
    rocks.appendChild(foam2);
    rocks.appendChild(waveLine2);
    document.body.appendChild(rocks);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes foam-pulse {
            0%, 100% { 
                transform: scaleX(1) scaleY(1); 
                opacity: 0.8;
            }
            50% { 
                transform: scaleX(1.3) scaleY(0.8); 
                opacity: 1;
            }
        }
        
        @keyframes wave-crash {
            0%, 100% { 
                transform: translateY(0) scaleY(1);
                opacity: 0.4;
            }
            50% { 
                transform: translateY(10px) scaleY(1.2);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
})();



