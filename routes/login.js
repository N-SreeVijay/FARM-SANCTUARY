const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const filePath = path.join(__dirname, '../data', 'users.json'); // Ensure this file has the correct structure

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }

        const users = data ? JSON.parse(data) : [];
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            req.session.Name = user.name; // Set the name in the session
            res.redirect('/userindex'); // Redirect to user index page
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});

module.exports = router;
