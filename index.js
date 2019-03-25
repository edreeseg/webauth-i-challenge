const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const port = process.env.PORT || 5000;
const bcrypt = require('bcryptjs');
server.use(express.json());

server.post('/api/register', (req, res) => { // Promise syntax
    const { username, password, email, firstName, lastName } = req.body;
    if (!username || !password || !email || !firstName || !lastName) 
        return res.status(400).json({ error: 'Please provide values for username, password, email, firstName, and lastName keys.' });
    const credentials = { username, password, email, firstName, lastName };
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    db('users')
        .insert(credentials)
        .then(id => res.status(201).json({ id: id[0] }))
        .catch(error => {
            const column = error.message.match(/users\..+/)[0];
            const reason = error.message.match(/\w+(?=\sconstraint\sfailed)/)[0];
            switch(reason){
                case 'UNIQUE':
                    return res.status(400).json({ error: `Value provided for ${column} already exists.`});
                default:
                    return res.status(500).json({ error });
            }
        });
});

server.post('/api/login', async (req, res) => { // Async/await
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'Please provide username and password.' });
        const credentials = { username, password };
        let user = await db('users').where({ username });
        user = user[0];
        if (!user || !bcrypt.compareSync(credentials.password, user.password)) 
            return res.status(401).json({ error: 'You shall not pass!' });
        res.json({ success: `Welcome, ${user.firstName}.` });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});

server.get('/api/users', (req, res) => {});

server.listen(port, () => console.log(`Server listening on port ${port}.`));