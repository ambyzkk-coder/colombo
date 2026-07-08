const express = require('express');
const router = express.Router();
const petoiController = require('../petoi-controller');
const siteData = require('../data/site-content');

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
    res.json(result);
});

router.post('/petoi/action', (req, res) => {
    const { action, params } = req.body;
    if (!action) {
        return res.status(400).json({ success: false, error: 'Azione richiesta' });
    }
    const result = petoiController.executeAction(action, params);
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

module.exports = router;
