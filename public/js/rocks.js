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
    
    const splashContainer1 = document.createElement('div');
    splashContainer1.style.cssText = `
        position: absolute;
        bottom: 115px;
        left: calc(3% + 60px);
        width: 100px;
        height: 80px;
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
    
    const splashContainer2 = document.createElement('div');
    splashContainer2.style.cssText = `
        position: absolute;
        bottom: 85px;
        right: calc(4% + 50px);
        width: 90px;
        height: 70px;
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
    rocks.appendChild(splashContainer1);
    rocks.appendChild(foam1);
    rocks.appendChild(waveLine1);
    rocks.appendChild(rock2);
    rocks.appendChild(splashContainer2);
    rocks.appendChild(foam2);
    rocks.appendChild(waveLine2);
    document.body.appendChild(rocks);
    
    const fishContainer = document.createElement('div');
    fishContainer.id = 'fish-container';
    fishContainer.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(fishContainer);
    
    function createFish() {
        const fish = document.createElement('div');
        const startX = 10 + Math.random() * 80;
        const size = 25 + Math.random() * 20;
        const jumpHeight = 120 + Math.random() * 100;
        const jumpDistance = 80 + Math.random() * 120;
        const duration = 1.8 + Math.random() * 0.8;
        
        const fishColors = [
            { body: '#8b8b8b', fin: '#6e6e6e', accent: '#a5a5a5', belly: '#c8c8c8' },
            { body: '#9c8b7a', fin: '#7a6e5e', accent: '#b8a898', belly: '#d4c4b4' },
            { body: '#7a7a7a', fin: '#5e5e5e', accent: '#9a9a9a', belly: '#b8b8b8' },
            { body: '#8b7a6b', fin: '#6e5e4e', accent: '#a89888', belly: '#c8b8a8' },
            { body: '#707070', fin: '#505050', accent: '#888888', belly: '#a0a0a0' }
        ];
        
        const color = fishColors[Math.floor(Math.random() * fishColors.length)];
        
        fish.style.cssText = `
            position: absolute;
            bottom: 0;
            left: ${startX}%;
            width: ${size}px;
            height: ${size * 0.5}px;
            opacity: 0;
            z-index: 2;
        `;
        
        fish.innerHTML = `
            <svg width="${size}" height="${size * 0.5}" viewBox="0 0 70 35">
                <ellipse cx="30" cy="17" rx="24" ry="14" fill="${color.body}"/>
                <ellipse cx="30" cy="22" rx="20" ry="7" fill="${color.belly}" opacity="0.4"/>
                <path d="M52 17 L68 6 L68 28 Z" fill="${color.fin}"/>
                <path d="M28 5 Q34 0 40 5 L40 10 Q34 6 28 10 Z" fill="${color.fin}" opacity="0.85"/>
                <path d="M24 30 Q30 35 36 30 L36 25 Q30 28 24 25 Z" fill="${color.fin}" opacity="0.85"/>
                <circle cx="16" cy="13" r="3.5" fill="white"/>
                <circle cx="17" cy="13" r="2" fill="black"/>
                <circle cx="17.5" cy="12.5" r="0.8" fill="white"/>
                <path d="M22 15 Q20 17 22 19" stroke="${color.accent}" stroke-width="1.2" fill="none" opacity="0.5"/>
                <path d="M16 10 Q30 7 44 10" stroke="${color.accent}" stroke-width="0.8" fill="none" opacity="0.3"/>
                <path d="M14 17 Q30 14 46 17" stroke="${color.accent}" stroke-width="0.8" fill="none" opacity="0.3"/>
                <path d="M16 24 Q30 27 44 24" stroke="${color.accent}" stroke-width="0.8" fill="none" opacity="0.3"/>
            </svg>
        `;
        
        fishContainer.appendChild(fish);
        
        fish.animate([
            { 
                transform: `translate(0, 0) rotate(-45deg)`,
                opacity: 0
            },
            {
                transform: `translate(${jumpDistance * 0.2}px, -${jumpHeight * 0.5}px) rotate(-20deg)`,
                opacity: 1,
                offset: 0.15
            },
            { 
                transform: `translate(${jumpDistance * 0.5}px, -${jumpHeight}px) rotate(0deg)`,
                opacity: 1,
                offset: 0.4
            },
            {
                transform: `translate(${jumpDistance * 0.75}px, -${jumpHeight * 0.65}px) rotate(15deg)`,
                opacity: 1,
                offset: 0.6
            },
            {
                transform: `translate(${jumpDistance * 0.9}px, -${jumpHeight * 0.25}px) rotate(35deg)`,
                opacity: 0.8,
                offset: 0.8
            },
            { 
                transform: `translate(${jumpDistance}px, 0) rotate(45deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.35, 0.25, 0.45, 0.75)',
            fill: 'forwards'
        });
        
        setTimeout(() => {
            fish.remove();
        }, duration * 1000 + 100);
        
        const splashStart = document.createElement('div');
        splashStart.style.cssText = `
            position: absolute;
            bottom: 0;
            left: ${startX}%;
            width: 30px;
            height: 15px;
            background: radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%);
            border-radius: 50%;
            opacity: 0;
        `;
        fishContainer.appendChild(splashStart);
        
        setTimeout(() => {
            splashStart.animate([
                { transform: 'scale(0.3)', opacity: 0.9 },
                { transform: 'scale(1.5)', opacity: 0 }
            ], {
                duration: 400,
                easing: 'ease-out'
            });
        }, 50);
        
        const splashEnd = document.createElement('div');
        splashEnd.style.cssText = `
            position: absolute;
            bottom: 0;
            left: calc(${startX}% + ${jumpDistance}px);
            width: 35px;
            height: 18px;
            background: radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%);
            border-radius: 50%;
            opacity: 0;
        `;
        fishContainer.appendChild(splashEnd);
        
        setTimeout(() => {
            splashEnd.animate([
                { transform: 'scale(0.3)', opacity: 0.9 },
                { transform: 'scale(1.5)', opacity: 0 }
            ], {
                duration: 400,
                easing: 'ease-out'
            });
        }, duration * 1000 - 50);
        
        setTimeout(() => {
            splashStart.remove();
            splashEnd.remove();
        }, duration * 1000 + 400);
    }
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFish(), Math.random() * 3000);
    }
    
    setInterval(() => {
        if (Math.random() > 0.3) {
            createFish();
        }
    }, 4000);
    
    for (let i = 0; i < 5; i++) {
        const seagull = document.createElement('div');
        seagull.className = 'seagull';
        document.body.appendChild(seagull);
    }
    
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




