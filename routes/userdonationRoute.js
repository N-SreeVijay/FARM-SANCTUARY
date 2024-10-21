const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// POST route for handling donations
router.post('/donate', (req, res) => {
    if (!req.session.Name) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }

    const { name, amount } = req.body;

    console.log(`Donation received from ${name}: $${amount}`);

    // Render thank you page
    res.render('userthank-you', { name, amount });
});

module.exports = router;
