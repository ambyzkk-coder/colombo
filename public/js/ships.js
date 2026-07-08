(function() {
    function createShip() {
        const ship = document.createElement('div');
        const size = 30 + Math.random() * 20;
        const bottom = 350 + Math.random() * 80;
        const duration = 80 + Math.random() * 40;
        const delay = Math.random() * 5;
        
        ship.style.cssText = `
            position: fixed;
            bottom: ${bottom}px;
            left: -${size * 3}px;
            width: ${size * 3}px;
            height: ${size * 2.5}px;
            z-index: 0;
            opacity: 0.15;
            pointer-events: none;
            animation: ship-sail ${duration}s linear ${delay}s;
        `;
        
        ship.innerHTML = `
            <svg width="${size * 3}" height="${size * 2.5}" viewBox="0 0 60 50">
                <path d="M5 40 Q10 45 30 45 Q50 45 55 40 L52 35 Q30 38 8 35 Z" fill="#2a1810"/>
                <path d="M10 35 L12 20 Q15 15 20 18 L22 35" fill="#3a2820"/>
                <path d="M22 15 L30 5 L30 35 L22 35 Z" fill="#f5f0e8"/>
                <path d="M24 17 L29 8 L29 33" fill="#e8e0d5"/>
                <path d="M32 15 L40 8 L40 35 L32 35 Z" fill="#f5f0e8"/>
                <path d="M34 17 L39 10 L39 33" fill="#e8e0d5"/>
                <path d="M38 35 L40 22 Q42 18 46 20 L48 35" fill="#3a2820"/>
                <path d="M30 5 L30 0 L29 0 L29 5" fill="#5a4a40"/>
                <ellipse cx="30" cy="2" rx="4" ry="2" fill="#5a4a40"/>
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
                transform: translateX(calc(100vw + ${180}px));
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => createShip(), 2000);
    
    setInterval(() => {
        if (Math.random() > 0.4) {
            createShip();
        }
    }, 25000);
})();
