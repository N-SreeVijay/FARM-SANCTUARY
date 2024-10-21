const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/register', (req, res) => {
    const { name, mobile, email, password, dob } = req.body;
    const filePath = path.join(__dirname, '..', 'data', 'users.json'); 

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }

        const users = data ? JSON.parse(data) : [];

        if (users.find(user => user.email === email)) {
            return res.status(400).send('User already exists');
        }

        users.push({ name, mobile, email, password, dob });
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing data');
            }
            res.status(201).send('User registered successfully');
        });
    });
});

module.exports = router;
