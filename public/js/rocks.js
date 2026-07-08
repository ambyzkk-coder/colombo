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
    
    for (let i = 0; i < 8; i++) {
        const droplet = document.createElement('div');
        const leftPos = Math.random() * 80;
        const size = 8 + Math.random() * 12;
        droplet.style.cssText = `
            position: absolute;
            bottom: ${Math.random() * 30}px;
            left: ${leftPos}px;
            width: ${size}px;
            height: ${size * 1.5}px;
            background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(200,230,255,0.7) 50%, rgba(150,200,255,0.5) 100%);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            animation: droplet-rise ${1.5 + Math.random()}s ease-out infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: 0;
        `;
        splashContainer1.appendChild(droplet);
    }
    
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
    
    for (let i = 0; i < 6; i++) {
        const droplet = document.createElement('div');
        const leftPos = Math.random() * 70;
        const size = 6 + Math.random() * 10;
        droplet.style.cssText = `
            position: absolute;
            bottom: ${Math.random() * 25}px;
            left: ${leftPos}px;
            width: ${size}px;
            height: ${size * 1.5}px;
            background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(200,230,255,0.7) 50%, rgba(150,200,255,0.5) 100%);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            animation: droplet-rise ${1.8 + Math.random()}s ease-out infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: 0;
        `;
        splashContainer2.appendChild(droplet);
    }
    
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
        const size = 20 + Math.random() * 30;
        const jumpHeight = 150 + Math.random() * 200;
        const duration = 1.5 + Math.random() * 1;
        const delay = Math.random() * 0.5;
        
        const fishColors = [
            { body: '#4a90d9', fin: '#3a7bc8', accent: '#6ab0e9' },
            { body: '#e89b3c', fin: '#d68a2b', accent: '#f0b04a' },
            { body: '#5cb85c', fin: '#4cae4c', accent: '#7ed07e' },
            { body: '#c0c0c0', fin: '#a8a8a8', accent: '#d8d8d8' },
            { body: '#e85d75', fin: '#d84d65', accent: '#f07d95' }
        ];
        
        const color = fishColors[Math.floor(Math.random() * fishColors.length)];
        
        fish.style.cssText = `
            position: absolute;
            bottom: -${size}px;
            left: ${startX}%;
            width: ${size}px;
            height: ${size * 0.6}px;
            opacity: 0;
            z-index: 2;
        `;
        
        fish.innerHTML = `
            <svg width="${size}" height="${size * 0.6}" viewBox="0 0 60 36">
                <!-- Corpo del pesce -->
                <ellipse cx="28" cy="18" rx="22" ry="14" fill="${color.body}"/>
                
                <!-- Coda -->
                <path d="M48 18 L58 8 L58 28 Z" fill="${color.fin}"/>
                
                <!-- Pinna dorsale -->
                <path d="M25 6 Q30 0 35 6 L35 12 Q30 8 25 12 Z" fill="${color.fin}" opacity="0.9"/>
                
                <!-- Pinna inferiore -->
                <path d="M22 30 Q28 36 34 30 L34 24 Q28 28 22 24 Z" fill="${color.fin}" opacity="0.9"/>
                
                <!-- Occhio -->
                <circle cx="16" cy="14" r="4" fill="white"/>
                <circle cx="17" cy="14" r="2.5" fill="black"/>
                <circle cx="18" cy="13" r="1" fill="white"/>
                
                <!-- Branchie -->
                <path d="M24 16 Q22 18 24 20" stroke="${color.accent}" stroke-width="1.5" fill="none" opacity="0.6"/>
                
                <!-- Scaglie decorative -->
                <path d="M20 12 Q28 10 36 12" stroke="${color.accent}" stroke-width="1" fill="none" opacity="0.4"/>
                <path d="M18 18 Q28 16 38 18" stroke="${color.accent}" stroke-width="1" fill="none" opacity="0.4"/>
                <path d="M20 24 Q28 26 36 24" stroke="${color.accent}" stroke-width="1" fill="none" opacity="0.4"/>
                
                <!-- Bocca -->
                <ellipse cx="6" cy="18" rx="2" ry="1.5" fill="${color.fin}"/>
            </svg>
        `;
        
        fishContainer.appendChild(fish);
        
        fish.animate([
            { 
                transform: `translateY(0) rotate(0deg)`,
                opacity: 0
            },
            {
                transform: `translateY(-${jumpHeight * 0.3}px) rotate(-30deg)`,
                opacity: 0.9,
                offset: 0.2
            },
            { 
                transform: `translateY(-${jumpHeight}px) rotate(-45deg)`,
                opacity: 1,
                offset: 0.45
            },
            {
                transform: `translateY(-${jumpHeight * 0.7}px) rotate(-20deg)`,
                opacity: 1,
                offset: 0.65
            },
            {
                transform: `translateY(-${jumpHeight * 0.3}px) rotate(10deg)`,
                opacity: 0.8,
                offset: 0.85
            },
            { 
                transform: `translateY(0) rotate(45deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
        
        setTimeout(() => {
            fish.remove();
        }, (duration + delay) * 1000 + 100);
        
        const splash = document.createElement('div');
        splash.style.cssText = `
            position: absolute;
            bottom: ${jumpHeight}px;
            left: calc(${startX}% + ${size/2}px);
            width: 40px;
            height: 20px;
            background: radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            opacity: 0;
            z-index: 1;
        `;
        fishContainer.appendChild(splash);
        
        setTimeout(() => {
            splash.animate([
                { transform: 'scale(0.5)', opacity: 0.8 },
                { transform: 'scale(1.5)', opacity: 0 }
            ], {
                duration: 400,
                easing: 'ease-out'
            });
        }, (duration * 0.45 + delay) * 1000);
        
        setTimeout(() => {
            splash.animate([
                { transform: 'scale(0.5)', opacity: 0.7 },
                { transform: 'scale(1.2)', opacity: 0 }
            ], {
                duration: 300,
                easing: 'ease-out'
            });
        }, (duration + delay) * 1000);
        
        setTimeout(() => {
            splash.remove();
        }, (duration + delay) * 1000 + 400);
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
        @keyframes droplet-rise {
            0% { 
                transform: translateY(0) scale(0.5); 
                opacity: 0;
            }
            20% { 
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-30px) scale(1); 
                opacity: 0.6;
            }
            100% { 
                transform: translateY(-60px) scale(0.3); 
                opacity: 0;
            }
        }
        
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




