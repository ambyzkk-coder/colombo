const express = require('express');
const router = express.Router();
const petoiController = require('../petoi-controller');
const siteData = require('../data/site-content');
const { petoiEvents } = require('../server');
const petoiThoughts = require('../data/petoi-thoughts');

router.get('/info', (req, res) => {
    res.json({
        success: true,
        data: siteData.getInfo()
    });
});

router.get('/sections', (req, res) => {
    res.json({
        success: true,
        data: siteData.getSections()
    });
});

router.get('/images', (req, res) => {
    res.json({
        success: true,
        data: siteData.getImages()
    });
});

router.get('/timeline', (req, res) => {
    res.json({
        success: true,
        data: siteData.getTimeline()
    });
});

router.post('/petoi/connect', async (req, res) => {
    const { port, baudRate } = req.body;
    const result = await petoiController.connect(port, baudRate);
    res.json({ success: result, message: result ? 'Connesso' : 'Connessione fallita' });
});

router.post('/petoi/disconnect', (req, res) => {
    petoiController.disconnect();
    res.json({ success: true, message: 'Disconnesso' });
});

router.get('/petoi/status', (req, res) => {
    res.json({
        success: true,
        data: petoiController.getStatus()
    });
});

router.post('/petoi/command', (req, res) => {
    const { command } = req.body;
    if (!command) {
        return res.status(400).json({ success: false, error: 'Comando richiesto' });
    }
    const result = petoiController.sendCommand(command);
    
    if (petoiEvents) {
        petoiEvents.emit('command-executed', {
            type: 'command',
            command: command,
            simulated: result.simulated || false,
            timestamp: new Date().toISOString()
        });
    }
    
    res.json(result);
});

router.post('/petoi/action', (req, res) => {
    const { action, params } = req.body;
    if (!action) {
        return res.status(400).json({ success: false, error: 'Azione richiesta' });
    }
    const result = petoiController.executeAction(action, params);
    
    if (petoiEvents) {
        petoiEvents.emit('command-executed', {
            type: 'command',
            command: action,
            simulated: result.simulated || false,
            timestamp: new Date().toISOString()
        });
    }
    
    res.json(result);
});

router.post('/petoi/sequence', async (req, res) => {
    const { actions, delay } = req.body;
    if (!actions || !Array.isArray(actions)) {
        return res.status(400).json({ success: false, error: 'Array di azioni richiesto' });
    }
    const result = await petoiController.executeSequence(actions, delay);
    res.json(result);
});

router.post('/petoi/react', async (req, res) => {
    const { imageType } = req.body;
    if (!imageType) {
        return res.status(400).json({ success: false, error: 'Tipo immagine richiesto' });
    }
    const result = await petoiController.reactToImage(imageType);
    res.json(result);
});

router.post('/petoi/sync-content', async (req, res) => {
    const { section } = req.body;
    const content = siteData.getSectionContent(section);
    
    if (!content) {
        return res.status(404).json({ success: false, error: 'Sezione non trovata' });
    }

    const actions = [];
    
    if (section === 'progetto') {
        actions.push('alzati', 'guarda-alto', 'cammina', 'fermati', 'saluta');
    } else if (section === 'storia') {
        actions.push('siediti', 'guarda-destra', 'guarda-sinistra', 'alzati');
    } else {
        actions.push('alzati', 'saluta');
    }

    const result = await petoiController.executeSequence(actions);
    
    res.json({
        success: true,
        content,
        actionsExecuted: result
    });
});

router.post('/petoi/vision/detect', (req, res) => {
    const { object, confidence } = req.body;
    
    if (!object) {
        return res.status(400).json({ success: false, error: 'Oggetto richiesto' });
    }
    
    const result = petoiController.detectObject(object, confidence);
    res.json(result);
});

router.post('/petoi/vision/simulate/start', (req, res) => {
    const { interval } = req.body;
    const result = petoiController.startVisionSimulation(interval);
    res.json(result);
});

router.post('/petoi/vision/simulate/stop', (req, res) => {
    const result = petoiController.stopVisionSimulation();
    res.json(result);
});

router.post('/remote/navigate', (req, res) => {
    const { page } = req.body;
    
    if (petoiEvents) {
        petoiEvents.emit('remote-command', {
            type: 'navigate',
            page: page,
            timestamp: new Date().toISOString()
        });
    }
    
    res.json({ success: true, message: `Comando navigazione inviato: ${page}` });
});

router.post('/remote/gallery', (req, res) => {
    const { action } = req.body;
    
    if (petoiEvents) {
        petoiEvents.emit('remote-command', {
            type: 'gallery',
            action: action,
            timestamp: new Date().toISOString()
        });
    }
    
    res.json({ success: true, message: `Comando galleria inviato: ${action}` });
});

router.post('/remote/custom', (req, res) => {
    const { command, data } = req.body;
    
    if (petoiEvents) {
        petoiEvents.emit('remote-command', {
            type: 'custom',
            command: command,
            data: data,
            timestamp: new Date().toISOString()
        });
    }
    
    res.json({ success: true, message: `Comando personalizzato inviato: ${command}` });
});

router.get('/thoughts', (req, res) => {
    const thoughts = petoiThoughts.getAllThoughts();
    res.json({ success: true, data: thoughts });
});

router.get('/thoughts/latest', (req, res) => {
    const thought = petoiThoughts.getLatestThought();
    res.json({ success: true, data: thought });
});

router.post('/thoughts', (req, res) => {
    const { thought, emotion } = req.body;
    
    if (!thought) {
        return res.status(400).json({ success: false, error: 'Pensiero richiesto' });
    }
    
    const newThought = petoiThoughts.addThought(thought, emotion || 'neutro');
    
    if (petoiEvents) {
        petoiEvents.emit('petoi-thought', {
            type: 'new-thought',
            thought: newThought,
            timestamp: new Date().toISOString()
        });
    }
    
    res.json({ success: true, data: newThought });
});

router.delete('/thoughts', (req, res) => {
    const result = petoiThoughts.clearThoughts();
    res.json(result);
});

module.exports = router;
