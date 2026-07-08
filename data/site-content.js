const siteContent = {
    info: {
        titolo: 'Colombo App',
        descrizione: 'Progetto scolastico su Cristoforo Colombo con robot Petoi',
        versione: '1.0.0'
    },

    sezioni: {
        'chi-siamo': {
            titolo: 'Chi Siamo',
            descrizione: 'Il nostro team di studenti appassionati di storia e tecnologia',
            keywords: ['team', 'studenti', 'scuola', 'progetto']
        },
        'progetto': {
            titolo: 'Il Progetto',
            descrizione: 'Unione di storia e tecnologia con il robot Petoi che interpreta Cristoforo Colombo',
            keywords: ['petoi', 'robot', 'colombo', 'tecnologia', 'storia', 'python', 'arduino'],
            azioni: ['cammina', 'guarda-orizzonte', 'fermati', 'narrazione']
        },
        'storia': {
            titolo: 'La Storia',
            descrizione: 'Vita e imprese di Cristoforo Colombo',
            keywords: ['navigatore', 'genova', '1492', 'america', 'viaggio', 'oceano']
        }
    },

    immagini: [
        {
            id: 'nave',
            nome: 'Nave di Colombo',
            url: '/images/nave.jpg',
            descrizione: 'Le tre caravelle: Niña, Pinta e Santa María',
            reazione: ['guarda-alto', 'cammina', 'fermati']
        },
        {
            id: 'mare',
            nome: 'Oceano Atlantico',
            url: '/images/mare.jpg',
            descrizione: 'Il grande oceano attraversato da Colombo',
            reazione: ['guarda-alto', 'guarda-basso', 'siediti']
        },
        {
            id: 'colombo',
            nome: 'Cristoforo Colombo',
            url: '/images/colombo.jpg',
            descrizione: 'Ritratto del navigatore genovese',
            reazione: ['saluta', 'alzati', 'cammina']
        },
        {
            id: 'america',
            nome: 'Arrivo in America',
            url: '/images/america.jpg',
            descrizione: 'Lo sbarco nel Nuovo Mondo',
            reazione: ['balza', 'saluta', 'guarda-alto']
        },
        {
            id: 'mappa',
            nome: 'Mappa del Viaggio',
            url: '/images/mappa.jpg',
            descrizione: 'Il percorso attraverso l\'Atlantico',
            reazione: ['guarda-destra', 'guarda-sinistra', 'cammina']
        }
    ],

    timeline: [
        {
            anno: 1451,
            evento: 'Nascita di Cristoforo Colombo a Genova',
            azione: 'siediti'
        },
        {
            anno: 1476,
            evento: 'Primi viaggi marittimi nel Mediterraneo',
            azione: 'alzati'
        },
        {
            anno: 1492,
            evento: 'Partenza da Palos de la Frontera (3 agosto)',
            azione: 'cammina'
        },
        {
            anno: 1492,
            evento: 'Arrivo alle Bahamas (12 ottobre)',
            azione: 'balza'
        },
        {
            anno: 1493,
            evento: 'Ritorno in Spagna',
            azione: 'saluta'
        },
        {
            anno: 1506,
            evento: 'Morte di Colombo a Valladolid',
            azione: 'rest'
        }
    ],

    contenuti: {
        progetto: `Il nostro progetto scolastico unisce storia e tecnologia attraverso l'utilizzo del robot Petoi, un cane robot programmabile che interpreta la figura di un personaggio storico.

Per la nostra presentazione abbiamo scelto Cristoforo Colombo, il famoso navigatore genovese del XV secolo. Il robot Petoi, attraverso movimenti e azioni programmate da noi, rappresenta i momenti simbolici del suo celebre viaggio attraverso l'oceano.

L'obiettivo è rendere la storia viva e interattiva: non solo parole, ma una rappresentazione reale che coinvolge il pubblico. Il robot cammina, si ferma, guarda l'orizzonte e simboleggia il viaggio, permettendoci di spiegare il percorso storico in modo originale.

Abbiamo programmato il robot usando Python e Arduino, coordinando i movimenti con la narrazione. Il pubblico vedrà il robot "agire" mentre noi raccontiamo, creando un'esperienza immersiva dove tecnologia e storia si incontrano.`
    }
};

module.exports = {
    getInfo: () => siteContent.info,
    
    getSections: () => siteContent.sezioni,
    
    getSectionContent: (section) => siteContent.contenuti[section] || null,
    
    getImages: () => siteContent.immagini,
    
    getImageReactions: (imageId) => {
        const image = siteContent.immagini.find(img => img.id === imageId);
        return image ? image.reazione : ['alzati', 'saluta'];
    },
    
    getTimeline: () => siteContent.timeline,
    
    getTimelineAction: (year) => {
        const event = siteContent.timeline.find(t => t.anno === year);
        return event ? event.azione : null;
    },
    
    getAll: () => siteContent
};
