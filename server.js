const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

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

app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});
