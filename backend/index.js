require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt'); 

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = db;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await db.query(
            'INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [userName, email, hashedPassword]
        );
        res.status(201).json({ message: 'Success', user: result.rows[0] }); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query(
            'SELECT * FROM accounts WHERE email = $1',
            [email]
        );
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.status(200).json({ message: 'Success', user });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/todo', async (req, res) => {
    const {account_id, taskname, description, deadline, deadline_time, progress} = req.body;
    console.log(deadline);
    if (!account_id) {
        return res.status(400).json({ error: 'Account ID is required' });
    }
    try {
        const result = await db.query(
            'INSERT INTO todo (account_id, taskname, description, deadline, deadline_time, progress) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [account_id, taskname, description, deadline, deadline_time, progress]
        );
        res.status(201).json({ message: 'successful', todo: result.rows[0] }); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/usertodo', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await db.query(
            'SELECT * FROM todo WHERE account_id = $1',
            [id]
        );
        if (result.rows.length > 0) {
            const usertodo = result.rows;
            res.status(200).json({ message: 'Success', usertodo: usertodo });
        } else {
            res.status(200).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/check', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await db.query(
            'UPDATE todo SET progress = true WHERE id = $1 RETURNING *',
            [id]
        );
        res.status(200).json({ message: 'Success', task: result.rows[0] }); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server: ${PORT}`);
});
