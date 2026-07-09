(function() {
    const windContainer = document.createElement('div');
    windContainer.id = 'wind-container';
    windContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
        overflow: hidden;
    `;
    document.body.appendChild(windContainer);

    const windLines = [];
    const numLines = 30;

    function createWindLine() {
        const line = document.createElement('div');
        line.className = 'wind-line';
        
        const length = 50 + Math.random() * 150;
        const startY = Math.random() * window.innerHeight;
        const startX = -length - Math.random() * 200;
        const duration = 1 + Math.random() * 2;
        const delay = Math.random() * 3;
        const opacity = 0.1 + Math.random() * 0.3;
        
        line.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: ${startY}px;
            width: ${length}px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,${opacity}), rgba(200,220,240,${opacity * 0.5}), transparent);
            border-radius: 50%;
            animation: windMove ${duration}s ease-in-out ${delay}s infinite;
            transform-origin: left center;
        `;
        
        windContainer.appendChild(line);
        windLines.push({
            element: line,
            startY: startY,
            baseX: startX,
            amplitude: 20 + Math.random() * 30,
            speed: 100 + Math.random() * 200
        });
        
        return line;
    }

    for (let i = 0; i < numLines; i++) {
        createWindLine();
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes windMove {
            0% {
                transform: translateX(0) scaleX(0.3);
                opacity: 0;
            }
            10% {
                opacity: 1;
                transform: translateX(calc(10vw)) scaleX(0.6);
            }
            50% {
                opacity: 1;
                transform: translateX(calc(50vw)) scaleX(1);
            }
            90% {
                opacity: 0.8;
                transform: translateX(calc(90vw)) scaleX(0.7);
            }
            100% {
                transform: translateX(calc(100vw + 200px)) scaleX(0.3);
                opacity: 0;
            }
        }
        
        @keyframes windWave {
            0%, 100% {
                transform: rotate(-2deg);
            }
            50% {
                transform: rotate(2deg);
            }
        }
        
        @keyframes leafFloat {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                transform: translate(calc(100vw + 100px), calc(50vh - 100px + ${Math.random() * 200}px)) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes dustParticle {
            0% {
                transform: translate(0, 0) scale(0.5);
                opacity: 0;
            }
            20% {
                opacity: 0.6;
            }
            80% {
                opacity: 0.4;
            }
            100% {
                transform: translate(calc(100vw + 50px), calc(-30px + ${Math.random() * 60}px)) scale(1);
                opacity: 0;
            }
        }
        
        .wind-leaf {
            position: absolute;
            font-size: 16px;
            animation: leafFloat 8s ease-in-out infinite;
            opacity: 0.7;
        }
        
        .wind-dust {
            position: absolute;
            width: 3px;
            height: 3px;
            background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
            border-radius: 50%;
            animation: dustParticle 4s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'wind-leaf';
        leaf.textContent = ['🍂', '🍃', '🌿', '🌾'][Math.floor(Math.random() * 4)];
        leaf.style.left = -50 + 'px';
        leaf.style.top = Math.random() * window.innerHeight + 'px';
        leaf.style.animationDuration = (6 + Math.random() * 6) + 's';
        leaf.style.animationDelay = Math.random() * 5 + 's';
        windContainer.appendChild(leaf);
        
        setTimeout(() => leaf.remove(), 15000);
    }

    function createDust() {
        const dust = document.createElement('div');
        dust.className = 'wind-dust';
        dust.style.left = -20 + 'px';
        dust.style.top = Math.random() * window.innerHeight + 'px';
        dust.style.animationDuration = (3 + Math.random() * 3) + 's';
        dust.style.animationDelay = Math.random() * 2 + 's';
        windContainer.appendChild(dust);
        
        setTimeout(() => dust.remove(), 8000);
    }

    setInterval(createLeaf, 2000);
    setInterval(createDust, 500);

    for (let i = 0; i < 5; i++) {
        setTimeout(createLeaf, i * 400);
        setTimeout(createDust, i * 100);
    }

    function addWobbleEffect() {
        const images = document.querySelectorAll('main img:not(.gallery-slide img)');
        images.forEach(img => {
            if (!img.style.animation) {
                img.style.animation = 'windWave 3s ease-in-out infinite';
            }
        });

        const paragraphs = document.querySelectorAll('main p');
        paragraphs.forEach(p => {
            p.style.transition = 'transform 0.5s ease';
        });

        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateParallax() {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const offsetX = (mouseX - centerX) / centerX;
            const offsetY = (mouseY - centerY) / centerY;
            
            paragraphs.forEach((p, index) => {
                const factor = (index % 3 + 1) * 0.5;
                p.style.transform = `translate(${offsetX * factor}px, ${offsetY * factor}px)`;
            });
            
            requestAnimationFrame(updateParallax);
        }
        
        updateParallax();
    }

    if (document.readyState === 'complete') {
        addWobbleEffect();
    } else {
        window.addEventListener('load', addWobbleEffect);
    }

    const gusts = [];
    let gustInterval = null;

    function createGust() {
        const gust = document.createElement('div');
        gust.style.cssText = `
            position: absolute;
            left: -100px;
            top: ${Math.random() * window.innerHeight}px;
            width: 80px;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
            border-radius: 50%;
            pointer-events: none;
            filter: blur(1px);
        `;
        
        windContainer.appendChild(gust);
        
        let posX = -100;
        const speed = 15 + Math.random() * 10;
        
        function animateGust() {
            posX += speed;
            gust.style.left = posX + 'px';
            
            if (posX > window.innerWidth + 100) {
                gust.remove();
            } else {
                requestAnimationFrame(animateGust);
            }
        }
        
        animateGust();
    }

    setInterval(createGust, 3000);

    function createWindBurst() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const burst = document.createElement('div');
                burst.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                    width: ${30 + Math.random() * 50}px;
                    height: 1px;
                    background: rgba(255,255,255,0.3);
                    transform: rotate(${-10 + Math.random() * 20}deg);
                    pointer-events: none;
                `;
                windContainer.appendChild(burst);
                
                let scale = 0;
                let opacity = 0.5;
                
                function animateBurst() {
                    scale += 0.1;
                    opacity -= 0.01;
                    
                    burst.style.transform = `rotate(${-10 + Math.random() * 20}deg) scaleX(${scale})`;
                    burst.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animateBurst);
                    } else {
                        burst.remove();
                    }
                }
                
                animateBurst();
            }, i * 50);
        }
    }

    setInterval(createWindBurst, 5000);

    let windStrength = 1;
    let targetWindStrength = 1;

    function updateWindStrength() {
        targetWindStrength = 0.7 + Math.random() * 0.6;
        
        windLines.forEach(line => {
            const currentDuration = parseFloat(line.element.style.animationDuration) || 2;
            line.element.style.animationDuration = (currentDuration * (1 + (windStrength - 1) * 0.3)) + 's';
        });
    }

    setInterval(updateWindStrength, 10000);

    console.log('Animazione vento attivata! 🌬️');
})();
