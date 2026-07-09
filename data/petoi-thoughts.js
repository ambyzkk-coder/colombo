const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function initDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS petoi_thoughts (
                id SERIAL PRIMARY KEY,
                thought TEXT NOT NULL,
                emotion VARCHAR(50) DEFAULT 'neutro',
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database PostgreSQL inizializzato correttamente');
    } catch (error) {
        console.error('Errore inizializzazione database:', error);
    }
}

initDatabase();

async function getAllThoughts() {
    try {
        const result = await pool.query('SELECT * FROM petoi_thoughts ORDER BY timestamp ASC');
        return result.rows;
    } catch (error) {
        console.error('Errore recupero pensieri:', error);
        return [];
    }
}

async function getLatestThought() {
    try {
        const result = await pool.query('SELECT * FROM petoi_thoughts ORDER BY timestamp DESC LIMIT 1');
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Errore recupero ultimo pensiero:', error);
        return null;
    }
}

async function addThought(thought, emotion = 'neutro') {
    try {
        const result = await pool.query(
            'INSERT INTO petoi_thoughts (thought, emotion) VALUES ($1, $2) RETURNING *',
            [thought, emotion]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Errore aggiunta pensiero:', error);
        throw error;
    }
}

async function clearThoughts() {
    try {
        await pool.query('DELETE FROM petoi_thoughts');
        return { success: true, message: 'Tutti i pensieri sono stati eliminati' };
    } catch (error) {
        console.error('Errore eliminazione pensieri:', error);
        throw error;
    }
}

module.exports = {
    getAllThoughts,
    getLatestThought,
    addThought,
    clearThoughts
};
