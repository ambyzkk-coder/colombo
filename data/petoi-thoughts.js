const fs = require('fs');
const path = require('path');

const thoughtsFile = path.join(__dirname, '..', 'data', 'petoi-thoughts.json');

function initDatabase() {
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(thoughtsFile)) {
        fs.writeFileSync(thoughtsFile, JSON.stringify([], null, 2));
    }
}

function getAllThoughts() {
    try {
        const data = fs.readFileSync(thoughtsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function getLatestThought() {
    const thoughts = getAllThoughts();
    return thoughts.length > 0 ? thoughts[thoughts.length - 1] : null;
}

function addThought(thought, emotion = 'neutro') {
    const thoughts = getAllThoughts();
    const newThought = {
        id: Date.now(),
        thought: thought,
        emotion: emotion,
        timestamp: new Date().toISOString()
    };
    thoughts.push(newThought);
    fs.writeFileSync(thoughtsFile, JSON.stringify(thoughts, null, 2));
    return newThought;
}

function clearThoughts() {
    fs.writeFileSync(thoughtsFile, JSON.stringify([], null, 2));
    return { success: true, message: 'Tutti i pensieri sono stati eliminati' };
}

initDatabase();

module.exports = {
    getAllThoughts,
    getLatestThought,
    addThought,
    clearThoughts
};
