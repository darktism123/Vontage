const express = require('express');
const db = require('../config/db');  // Import database connection
const router = express.Router();

// Helper function to check availability
const checkAvailability = (field, value, res) => {
    const query = `SELECT ${field} FROM customer WHERE ${field} = ?`;

    db.query(query, [value], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: `${value} is already taken.` });
        } else {
            return res.json({ success: true, message: `${value} is available.` });
        }
    });
};

// Check availability for username
router.get('/username', (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required.' });
    }

    return checkAvailability('username', username, res);
});

// Check availability for email
router.get('/email', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    return checkAvailability('email', email, res);
});

module.exports = router;
