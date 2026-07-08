const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { 
        titolo: 'Cristoforo Colombo',
        sottotitolo: 'L\'esploratore che cambiò il mondo'
    });
});

app.get('/viaggi', (req, res) => {
    const viaggi = [
        { anno: 1492, destinazione: 'Bahamas', navi: 'Niña, Pinta, Santa María' },
        { anno: 1493, destinazione: 'Caraibi', navi: '17 navi' },
        { anno: 1498, destinazione: 'Sud America', navi: '6 navi' },
        { anno: 1502, destinazione: 'America Centrale', navi: '4 navi' }
    ];
    res.render('viaggi', { 
        titolo: 'I Viaggi di Colombo',
        viaggi: viaggi
    });
});

app.get('/storia', (req, res) => {
    res.render('storia', { 
        titolo: 'La Storia',
        contenuto: 'Cristoforo Colombo nacque a Genova nel 1451. Fu un navigatore ed esploratore che, sotto il patrocinio della Spagna, attraversò l\'Atlantico nel 1492, raggiungendo le Americhe.'
    });
});

app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});
