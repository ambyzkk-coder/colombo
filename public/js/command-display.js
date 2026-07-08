(function() {
    const container = document.createElement('div');
    container.id = 'petoi-command-display';
    container.innerHTML = `
        <style>
            #petoi-command-display {
                position: fixed;
                top: 70px;
                right: 20px;
                width: 280px;
                max-height: 400px;
                background: linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%);
                border-radius: 12px;
                padding: 15px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.5);
                z-index: 9998;
                font-family: 'Segoe UI', Arial, sans-serif;
                overflow: visible;
            }
            
            .cmd-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            
            .cmd-title {
                color: white;
                font-size: 14px;
                font-weight: bold;
                letter-spacing: 1px;
            }
            
            .cmd-status-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #44ff44;
                animation: pulse-cmd 2s infinite ease-in-out;
            }
            
            @keyframes pulse-cmd {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.6; transform: scale(1.1); }
            }
            
            .cmd-list {
                max-height: 320px;
                overflow-y: auto;
                overflow-x: hidden;
                padding-right: 5px;
            }
            
            .cmd-item {
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
                padding: 10px;
                margin-bottom: 8px;
                animation: slideInCmd 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                border-left: 3px solid #4a90d9;
                transform-origin: top right;
                opacity: 1;
            }
            
            .cmd-item.simulated {
                border-left-color: #ffa500;
            }
            
            .cmd-item-name {
                color: #4a90d9;
                font-weight: bold;
                font-size: 13px;
                margin-bottom: 4px;
            }
            
            .cmd-item.simulated .cmd-item-name {
                color: #ffa500;
            }
            
            .cmd-item-time {
                color: rgba(255,255,255,0.6);
                font-size: 11px;
            }
            
            .cmd-item-badge {
                display: inline-block;
                background: rgba(74, 144, 217, 0.3);
                color: #88ccff;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 10px;
                margin-left: 8px;
            }
            
            .cmd-item.simulated .cmd-item-badge {
                background: rgba(255, 165, 0, 0.3);
                color: #ffcc88;
            }
            
            @keyframes slideInCmd {
                0% { 
                    transform: translateX(50px) scale(0.9); 
                    opacity: 0; 
                }
                100% { 
                    transform: translateX(0) scale(1); 
                    opacity: 1; 
                }
            }
            
            .cmd-empty {
                color: rgba(255,255,255,0.5);
                font-size: 12px;
                text-align: center;
                padding: 20px;
            }
            
            .cmd-list::-webkit-scrollbar {
                width: 6px;
            }
            
            .cmd-list::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.1);
                border-radius: 3px;
            }
            
            .cmd-list::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.3);
                border-radius: 3px;
            }
        </style>
        <div class="cmd-header">
            <span class="cmd-title">COMANDI PETOI</span>
            <div class="cmd-status-dot"></div>
        </div>
        <div class="cmd-list" id="cmdList">
            <div class="cmd-empty">In attesa di comandi...</div>
        </div>
    `;
    
    document.body.appendChild(container);
    
    const cmdList = document.getElementById('cmdList');
    const commands = [];
    const maxCommands = 15;
    
    function addCommand(command, simulated = false) {
        const time = new Date().toLocaleTimeString('it-IT');
        const actionNames = {
            'kwkF': 'Cammina Avanti',
            'kwkR': 'Cammina Indietro',
            'kbalance': 'Ferma',
            'ksit': 'Siediti',
            'kup': 'Alzati',
            'kheadRight': 'Guarda Destra',
            'kheadLeft': 'Guarda Sinistra',
            'kheadUp': 'Guarda Alto',
            'kheadDown': 'Guarda Basso',
            'ktrR': 'Gira Destra',
            'ktrL': 'Gira Sinistra',
            'khi': 'Saluta',
            'kpee': 'Paws',
            'kstr': 'Stretch',
            'kbdU': 'Balza',
            'kroll': 'Rotola',
            'krest': 'Riposo'
        };
        
        const displayName = actionNames[command] || command.toUpperCase();
        
        commands.unshift({ command: displayName, time, simulated });
        
        if (commands.length > maxCommands) {
            commands.pop();
        }
        
        renderCommands();
    }
    
    function renderCommands() {
        if (commands.length === 0) {
            cmdList.innerHTML = '<div class="cmd-empty">In attesa di comandi...</div>';
            return;
        }
        
        cmdList.innerHTML = commands.map((cmd, index) => `
            <div class="cmd-item ${cmd.simulated ? 'simulated' : ''}" style="animation-delay: ${index * 0.05}s">
                <div class="cmd-item-name">
                    ${cmd.command}
                    <span class="cmd-item-badge">${cmd.simulated ? 'SIMULATO' : 'ESEGUITO'}</span>
                </div>
                <div class="cmd-item-time">${cmd.time}</div>
            </div>
        `).join('');
    }
    
    const eventSource = new EventSource('/events');
    
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'command') {
            addCommand(data.command, data.simulated);
        }
        
        if (data.type === 'object-detected') {
            addCommand(`VISIONE: ${data.object.toUpperCase()}`, false);
        }
    };
    
    eventSource.onerror = () => {
        console.log('Riconnessione comando display...');
    };
})();
