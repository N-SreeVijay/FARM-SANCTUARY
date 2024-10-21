const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/getUserDetails', (req, res) => {
    const email = req.query.email;

    fs.readFile('./routes/user.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading user data' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.email === email);

        if (user) {
            return res.json({ success: true, user });
        } else {
            return res.json({ success: false, message: 'User not found' });
        }
    });
});

module.exports = router;
