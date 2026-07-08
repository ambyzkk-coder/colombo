const SerialPort = require('serialport');
const ReadlineParser = require('@serialport/parser-readline');
const EventEmitter = require('events');

const commandEvents = new EventEmitter();

class PetoiController {
    constructor() {
        this.port = null;
        this.parser = null;
        this.isConnected = false;
        this.currentAction = null;
    }

    async connect(portPath = '/dev/ttyUSB0', baudRate = 115200) {
        try {
            this.port = new SerialPort(portPath, { baudRate });
            this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\n' }));
            
            this.port.on('open', () => {
                this.isConnected = true;
                console.log('Petoi connesso sulla porta', portPath);
            });

            this.port.on('error', (err) => {
                console.error('Errore porta seriale:', err.message);
                this.isConnected = false;
            });

            return true;
        } catch (error) {
            console.error('Errore connessione Petoi:', error.message);
            return false;
        }
    }

    disconnect() {
        if (this.port && this.port.isOpen) {
            this.port.close();
            this.isConnected = false;
            console.log('Petoi disconnesso');
        }
    }

    sendCommand(command) {
        if (!this.isConnected || !this.port) {
            console.log('Petoi non connesso - comando simulato:', command);
            
            commandEvents.emit('command', {
                command,
                simulated: true,
                timestamp: new Date().toISOString()
            });
            
            return { success: false, message: 'Petoi non connesso', simulated: true, command };
        }

        this.port.write(command + '\n', (err) => {
            if (err) {
                console.error('Errore invio comando:', err.message);
                return { success: false, error: err.message };
            }
            console.log('Comando inviato:', command);
            
            commandEvents.emit('command', {
                command,
                simulated: false,
                timestamp: new Date().toISOString()
            });
        });

        return { success: true, command };
    }

    executeAction(actionName, params = {}) {
        const actions = {
            'cammina': 'kwkF',
            'cammina-indietro': 'kwkR',
            'fermati': 'kbalance',
            'siediti': 'ksit',
            'alzati': 'kup',
            'guarda-destra': 'kheadRight',
            'guarda-sinistra': 'kheadLeft',
            'guarda-alto': 'kheadUp',
            'guarda-basso': 'kheadDown',
            'gira-destra': 'ktrR',
            'gira-sinistra': 'ktrL',
            'saluta': 'khi',
            'paws': 'kpee',
            'stretch': 'kstr',
            'balza': 'kbdU',
            'rotola': 'kroll',
            'rest': 'krest'
        };

        const command = actions[actionName];
        if (!command) {
            return { success: false, error: 'Azione non riconosciuta', actionName };
        }

        return this.sendCommand(command);
    }

    executeSequence(actions, delayMs = 1000) {
        return new Promise((resolve) => {
            let index = 0;
            const results = [];

            const executeNext = () => {
                if (index >= actions.length) {
                    resolve({ success: true, results });
                    return;
                }

                const result = this.executeAction(actions[index]);
                results.push(result);
                index++;
                
                setTimeout(executeNext, delayMs);
            };

            executeNext();
        });
    }

    reactToImage(imageType) {
        const reactions = {
            'nave': ['guarda-alto', 'guarda-destra', 'guarda-sinistra', 'cammina'],
            'mare': ['guarda-alto', 'guarda-basso', 'siediti'],
            'colombo': ['saluta', 'alzati', 'cammina'],
            'america': ['saluta', 'balza', 'guarda-alto'],
            'default': ['alzati', 'guarda-destra', 'guarda-sinistra']
        };

        const actionSequence = reactions[imageType] || reactions['default'];
        return this.executeSequence(actionSequence);
    }

    getStatus() {
        return {
            connected: this.isConnected,
            currentAction: this.currentAction,
            availableActions: [
                'cammina', 'cammina-indietro', 'fermati', 'siediti', 'alzati',
                'guarda-destra', 'guarda-sinistra', 'guarda-alto', 'guarda-basso',
                'gira-destra', 'gira-sinistra', 'saluta', 'paws', 'stretch',
                'balza', 'rotola', 'rest'
            ]
        };
    }

    detectObject(objectName, confidence = 90) {
        console.log(`Visione attiva - Oggetto rilevato: ${objectName}`);
        
        const validObjects = ['nave', 'mare', 'oceano', 'colombo', 'america', 'nativo', 'scoglio'];
        const normalizedObject = objectName.toLowerCase();
        
        if (!validObjects.includes(normalizedObject)) {
            return { 
                success: false, 
                error: 'Oggetto non riconosciuto',
                validObjects 
            };
        }

        return {
            success: true,
            object: normalizedObject,
            confidence,
            action: 'gallery-advance',
            timestamp: new Date().toISOString()
        };
    }

    startVisionSimulation(intervalMs = 5000) {
        const objects = ['nave', 'mare', 'oceano', 'colombo', 'america'];
        let index = 0;
        
        console.log('Simulazione visione avviata');
        
        this.visionInterval = setInterval(() => {
            const object = objects[index % objects.length];
            this.detectObject(object);
            index++;
        }, intervalMs);
        
        return { success: true, message: 'Simulazione visione attiva' };
    }

    stopVisionSimulation() {
        if (this.visionInterval) {
            clearInterval(this.visionInterval);
            this.visionInterval = null;
            console.log('Simulazione visione fermata');
            return { success: true, message: 'Simulazione visione fermata' };
        }
        return { success: false, message: 'Nessuna simulazione attiva' };
    }
    
    getCommandEmitter() {
        return commandEvents;
    }
}

module.exports = new PetoiController();
module.exports.commandEvents = commandEvents;
