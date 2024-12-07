const express = require('express');
const { db, cachedUsernames } = require('../config/db'); // Import cached usernames

const router = express.Router();

router.get('/', (req, res) => {
    const { username, email } = req.query;

    if (!username && !email) {
        return res.status(400).json({ success: false, message: 'No data provided.' });
    }

    // Check username availability using cached data
    if (username) {
        if (cachedUsernames.includes(username)) {
            // If username exists in the cache
            return res.json({ success: false, message: 'Username is already taken.' });
        }

        // If not found in the cache, fallback to database check
        db.query('SELECT username FROM customer WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error.' });
            }

            if (results.length > 0) {
                return res.json({ success: false, message: 'Username is already taken.' });
            } else {
                return res.json({ success: true, message: 'Username is available.' });
            }
        });
    }

    // Check email availability
    if (email) {
        db.query('SELECT email FROM customer WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error.' });
            }

            if (results.length > 0) {
                return res.json({ success: false, message: 'Email is already taken.' });
            } else {
                return res.json({ success: true, message: 'Email is available.' });
            }
        });
    }
});

module.exports = router;
