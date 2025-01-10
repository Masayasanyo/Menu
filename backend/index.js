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
        res.status(201).json({ message: 'Success!', user: result.rows[0] }); 
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
            // console.log(user);
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

app.post('/recipe/mylist', async (req, res) => {
    const {account_id} = req.body;
    if (!account_id) {
        return res.status(400).json({ error: 'Account ID is required' });
    }
    try {
        const result = await db.query(
            'SELECT * FROM recipe LEFT OUTER JOIN material ON recipe.id = material.recipe_id LEFT OUTER JOIN label ON recipe.id = label.recipe_id LEFT OUTER JOIN recipe_list ON recipe.id = recipe_list.recipe_id JOIN accounts ON recipe.account_id = accounts.id WHERE accounts.id = $1',
            [account_id]
        );
        res.status(201).json({ message: 'Success!', myRecipe: result}); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/recipe/add', async (req, res) => {
    const {accountId, title, image, time, description, material, process, label} = req.body;
    let recipeId = 0;

    if (!accountId) {
        return res.status(400).json({ error: 'Account ID is required' });
    }

    // Insert into recipe table
    try {
        const result = await db.query(
            'INSERT INTO recipe (account_id, name, image, description, time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [accountId, title, image, description, time]
        );
        res.status(201).json({ message: 'Success!', recipe: result.rows[0] }); 
        recipeId = result.rows[0].id;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }

    // Insert into material table
    for (var i = 0; i < material.length; i++) {
        try {
            const result = await db.query(
                'INSERT INTO material (recipe_id, name, quantity) VALUES ($1, $2, $3) RETURNING *',
                [recipeId, material[i].name, material[i].quantity]
                // [{'name': 'pork', 'quantity': 1}]
            );
            res.status(201).json({ message: 'Success!', material: result.rows[0] }); 
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    // Insert into label table
    for (var i = 0; i < label.length; i++) {
        try {
            const result = await db.query(
                'INSERT INTO label (recipe_id, name) VALUES ($1, $2) RETURNING *',
                [recipeId, label[i]]
            );
            res.status(201).json({ message: 'Success!', label: result.rows[0] }); 
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    // Insert into recipe_list table
    for (var i = 0; i < process.length; i++) {
        try {
            const result = await db.query(
                'INSERT INTO process (recipe_id, step, name) VALUES ($1, $2, $3) RETURNING *',
                [recipeId, i + 1, process[i]]
            );
            res.status(201).json({ message: 'Success!', process: result.rows[0] }); 
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }    
});


// app.post('/usertodo', async (req, res) => {
//     const { id } = req.body;
//     try {
//         const result = await db.query(
//             'SELECT * FROM todo WHERE account_id = $1',
//             [id]
//         );
//         if (result.rows.length > 0) {
//             const usertodo = result.rows;
//             res.status(200).json({ message: 'Success!', usertodo: usertodo });
//         } else {
//             res.status(200).json({ message: 'Task not found' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// app.post('/check', async (req, res) => {
//     const { id } = req.body;
//     try {
//         const result = await db.query(
//             'UPDATE todo SET progress = true WHERE id = $1 RETURNING *',
//             [id]
//         );
//         res.status(200).json({ message: 'Success', task: result.rows[0] }); 
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server: ${PORT}`);
});
