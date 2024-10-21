const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const donationFilePath = path.join(__dirname, '..', 'data', 'donation.json');

// Route to handle donations
router.post('/donate', (req, res) => {
    const { name, email, amount } = req.body;

    console.log(`Donation Amount received from ${name} of the Amount: ${amount}, E-MAIL: ${email}`);
    res.render('thankyou', { name, email, amount });
});

module.exports = router;
