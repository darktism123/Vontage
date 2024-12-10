const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to fetch and return the user's profile as JSON
router.get('/details', (req, res) => {
    // Check if the user is logged in
    if (!req.session.customerId) {
        return res.json({
            message: 'Not logged in',
            username: 'Guest',
            email: null,
            phone: null,
            address: null,
            city: null,
            country: null,
        });
    }

    // Query to fetch user details by customer ID
    const query = `
        SELECT customer_id, username, email, phone, address, city, country
        FROM customer
        WHERE customer_id = ?
    `;

    db.query(query, [req.session.customerId], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0]; // Fetch the first (and only) result

        // Send user data as JSON
        res.json({
            message: 'Logged in',
            customer_id: user.customer_id,
            username: user.username,
            email: user.email,
            phone: user.phone || null,
            address: user.address || null,
            city: user.city || null,
            country: user.country || null,
        });
    });
});

module.exports = router;
