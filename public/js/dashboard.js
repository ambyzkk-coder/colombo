const API_BASE = '/api';

function log(message, type = 'info') {
    const logDiv = document.getElementById('actionLog');
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.style.color = type === 'error' ? '#ff6666' : type === 'success' ? '#66ff66' : '#88ff88';
    entry.textContent = `[${time}] ${message}`;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

async function checkStatus() {
    try {
        const response = await fetch(`${API_BASE}/petoi/status`);
        const data = await response.json();
        
        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');
        
        if (data.data.connected) {
            dot.classList.add('connected');
            text.textContent = 'Petoi Connesso';
            log('Petoi connesso', 'success');
        } else {
            dot.classList.remove('connected');
            text.textContent = 'Petoi Non Connesso (Modalità Simulazione)';
            log('Petoi non connesso - modalità simulazione attiva', 'info');
        }
        
        return data.data;
    } catch (error) {
        log(`Errore verifica stato: ${error.message}`, 'error');
        return null;
    }
}

async function connectPetoi() {
    const port = document.getElementById('portInput').value;
    const baudRate = parseInt(document.getElementById('baudInput').value);
    
    log(`Connessione a ${port}...`);
    
    try {
        const response = await fetch(`${API_BASE}/petoi/connect`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ port, baudRate })
        });
        
        const data = await response.json();
        
        if (data.success) {
            log('Connesso con successo!', 'success');
            checkStatus();
        } else {
            log('Connessione fallita', 'error');
        }
    } catch (error) {
        log(`Errore connessione: ${error.message}`, 'error');
    }
}

async function disconnectPetoi() {
    log('Disconnessione...');
    
    try {
        const response = await fetch(`${API_BASE}/petoi/disconnect`, {
            method: 'POST'
        });
        
        const data = await response.json();
        log('Disconnesso', 'info');
        checkStatus();
    } catch (error) {
        log(`Errore disconnessione: ${error.message}`, 'error');
    }
}

async function executeAction(action) {
    log(`Esecuzione: ${action}`);
    
    try {
        const response = await fetch(`${API_BASE}/petoi/action`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action })
        });
        
        const data = await response.json();
        
        if (data.success) {
            log(`✓ ${action} eseguito`, 'success');
        } else if (data.simulated) {
            log(`⟐ ${action} simulato (robot non connesso)`, 'info');
        } else {
            log(`✗ Errore: ${data.error || 'Azione fallita'}`, 'error');
        }
    } catch (error) {
        log(`Errore: ${error.message}`, 'error');
    }
}

async function reactToImage(imageType) {
    log(`Reazione a: ${imageType}`);
    
    try {
        const response = await fetch(`${API_BASE}/petoi/react`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageType })
        });
        
        const data = await response.json();
        
        if (data.success) {
            log(`✓ Sequenza eseguita per ${imageType}`, 'success');
        } else {
            log(`✗ Errore reazione`, 'error');
        }
    } catch (error) {
        log(`Errore: ${error.message}`, 'error');
    }
}

async function syncContent(section) {
    log(`Sincronizzazione con: ${section}`);
    
    try {
        const response = await fetch(`${API_BASE}/petoi/sync-content`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ section })
        });
        
        const data = await response.json();
        
        if (data.success) {
            log(`✓ Sincronizzato con ${section}`, 'success');
        } else {
            log(`✗ Errore sincronizzazione`, 'error');
        }
    } catch (error) {
        log(`Errore: ${error.message}`, 'error');
    }
}

async function petoiSees(object) {
    log(`Petoi vede: ${object}`);
    
    try {
        const response = await fetch('/petoi/vision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ object, confidence: 95 })
        });
        
        const data = await response.json();
        
        if (data.success) {
            log(`✓ Oggetto "${object}" rilevato - Galleria avanza!`, 'success');
        } else {
            log(`✗ Errore: ${data.error}`, 'error');
        }
    } catch (error) {
        log(`Errore: ${error.message}`, 'error');
    }
}

async function startVisionSim() {
    log('Avvio simulazione visione automatica...');
    
    try {
        const response = await fetch(`${API_BASE}/petoi/vision/simulate/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ interval: 5000 })
        });
        
        const data = await response.json();
        log(data.message, 'success');
    } catch (error) {
        log(`Errore: ${error.message}`, 'error');
    }
}

async function stopVisionSim() {
    log('Fermando simulazione...');
    
    try {
        const response = await fetch(`${API_BASE}/petoi/vision/simulate/stop`, {
            method: 'POST'
        });
        
        const data = await response.json();
        log(data.message, 'info');
    } catch (error) {
        log(`Errore: ${error.message}`, 'error');
    }
}

setInterval(checkStatus, 5000);

checkStatus();
