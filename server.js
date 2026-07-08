const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const EventEmitter = require('events');

const petoiEvents = new EventEmitter();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

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
    
    req.on('close', () => {
        petoiEvents.off('object-detected', sendEvent);
        petoiEvents.off('gallery-next', sendEvent);
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

app.get('/', (req, res) => {
    res.render('chi-siamo', { 
        titolo: 'Chi Siamo',
        sottotitolo: 'Scopri il nostro progetto su Cristoforo Colombo'
    });
});

app.get('/chi-siamo', (req, res) => {
    res.render('chi-siamo', { 
        titolo: 'Chi Siamo',
        sottotitolo: 'Scopri il nostro progetto su Cristoforo Colombo'
    });
});

app.get('/progetto', (req, res) => {
    res.render('progetto', { 
        titolo: 'Il Progetto',
        sottotitolo: 'Obiettivi e finalità della nostra ricerca'
    });
});

app.get('/storia', (req, res) => {
    res.render('storia', { 
        titolo: 'La Storia',
        sottotitolo: 'La vita e le imprese di Cristoforo Colombo'
    });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { 
        titolo: 'Dashboard Petoi',
        sottotitolo: 'Controlla il robot Petoi in tempo reale'
    });
});

app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});
