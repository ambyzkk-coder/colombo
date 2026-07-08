(function() {
    function createShip() {
        const ship = document.createElement('div');
        const size = 20 + Math.random() * 15;
        const bottom = 400 + Math.random() * 150;
        const duration = 100 + Math.random() * 50;
        const delay = Math.random() * 5;
        
        ship.style.cssText = `
            position: fixed;
            bottom: ${bottom}px;
            left: -${size * 3}px;
            width: ${size * 3}px;
            height: ${size * 2.5}px;
            z-index: 0;
            opacity: 0.2;
            pointer-events: none;
            animation: ship-sail ${duration}s linear ${delay}s, ship-bob 4s ease-in-out infinite;
        `;
        
        ship.innerHTML = `
            <svg width="${size * 3}" height="${size * 2.5}" viewBox="0 0 60 50">
                <path d="M5 40 Q10 45 30 45 Q50 45 55 40 L52 35 Q30 38 8 35 Z" fill="#1a1510"/>
                <path d="M10 35 L12 20 Q15 15 20 18 L22 35" fill="#2a2018"/>
                <path d="M22 15 L30 5 L30 35 L22 35 Z" fill="#e8e0d0"/>
                <path d="M24 17 L29 8 L29 33" fill="#d8d0c0"/>
                <path d="M32 15 L40 8 L40 35 L32 35 Z" fill="#e8e0d0"/>
                <path d="M34 17 L39 10 L39 33" fill="#d8d0c0"/>
                <path d="M38 35 L40 22 Q42 18 46 20 L48 35" fill="#2a2018"/>
                <path d="M30 5 L30 0 L29 0 L29 5" fill="#3a3028"/>
                <ellipse cx="30" cy="2" rx="3" ry="1.5" fill="#3a3028"/>
            </svg>
        `;
        
        document.body.appendChild(ship);
        
        setTimeout(() => {
            ship.remove();
        }, (duration + delay) * 1000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ship-sail {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(calc(100vw + 105px));
            }
        }
        
        @keyframes ship-bob {
            0%, 100% { 
                transform: translateY(0) rotate(0deg); 
            }
            25% { 
                transform: translateY(-3px) rotate(0.5deg); 
            }
            50% { 
                transform: translateY(2px) rotate(-0.3deg); 
            }
            75% { 
                transform: translateY(-1px) rotate(0.3deg); 
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => createShip(), 3000);
    
    setInterval(() => {
        if (Math.random() > 0.5) {
            createShip();
        }
    }, 30000);
})();
