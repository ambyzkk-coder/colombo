require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const EventEmitter = require('events');

const petoiEvents = new EventEmitter();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    
    res.write('data: {"type":"connected"}\n\n');
    
    const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
    
    petoiEvents.on('object-detected', sendEvent);
    petoiEvents.on('gallery-next', sendEvent);
    petoiEvents.on('command-executed', sendEvent);
    petoiEvents.on('remote-command', sendEvent);
    petoiEvents.on('petoi-thought', sendEvent);
    
    req.on('close', () => {
        petoiEvents.off('object-detected', sendEvent);
        petoiEvents.off('gallery-next', sendEvent);
        petoiEvents.off('command-executed', sendEvent);
        petoiEvents.off('remote-command', sendEvent);
        petoiEvents.off('petoi-thought', sendEvent);
    });
});

app.post('/petoi/vision', (req, res) => {
    const { object, confidence } = req.body;
    
    console.log(`Petoi vede: ${object} (confidenza: ${confidence}%)`);
    
    petoiEvents.emit('object-detected', {
        type: 'object-detected',
        object,
        confidence,
        timestamp: new Date().toISOString()
    });
    
    setTimeout(() => {
        petoiEvents.emit('gallery-next', {
            type: 'gallery-next',
            reason: object,
            timestamp: new Date().toISOString()
        });
    }, 500);
    
    res.json({
        success: true,
        message: `Oggetto "${object}" rilevato`,
        action: 'gallery-advanced'
    });
});

app.post('/petoi/command-broadcast', (req, res) => {
    const { command, action, source } = req.body;
    
    petoiEvents.emit('command-executed', {
        type: 'command',
        command,
        action,
        source: source || 'petoi',
        timestamp: new Date().toISOString()
    });
    
    res.json({ success: true });
});

app.get('/', (req, res) => {
    res.render('chi-siamo', { 
        titolo: 'Chi Siamo',
        sottotitolo: 'Gli esploratori IOTEP'
    });
});

app.get('/chi-siamo', (req, res) => {
    res.render('chi-siamo', { 
        titolo: 'Chi Siamo',
        sottotitolo: 'Gli esploratori IOTEP'
    });
});

app.get('/progetto', (req, res) => {
    res.render('progetto', { 
        titolo: 'Il Progetto',
        sottotitolo: ''
    });
});

app.get('/storia', (req, res) => {
    res.render('storia', { 
        titolo: 'La Storia',
        sottotitolo: ''
    });
});

app.get('/remote', (req, res) => {
    res.render('remote');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
    console.log(`Per accedere dal telefono, usa l'IP del computer sulla stessa rete WiFi`);
    console.log(`Pagina controllo remoto: http://<IP>:${PORT}/remote`);
});

module.exports = { petoiEvents };
