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
    
    rocks.appendChild(rock1);
    rocks.appendChild(rock2);
    document.body.appendChild(rocks);
})();
