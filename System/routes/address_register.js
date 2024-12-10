const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
    const { phone, address, streetAddress, postalCode, city, country } = req.body;

    // Ensure the user is logged in
    if (!req.session.customerId) {
        return res.status(401).send("<script>alert('You must be logged in to submit your address.'); window.location.href = '/register_vontage.html';</script>");
    }

    // Update the user's address in the database
    const query = `
        UPDATE customer
        SET phone = ?, address = ?, street_address = ?, postal_code = ?, city = ?, country = ?
        WHERE customer_id = ?
    `;

    const values = [phone, address, streetAddress, postalCode, city, country, req.session.customerId];

    db.query(query, values, (err) => {
        if (err) {
            console.error('Error updating address:', err.message);
            return res.status(500).send("<script>alert('Internal server error. Please try again later.'); window.history.back();</script>");
        }

        // Redirect to homepage as a logged-in user
        res.send("<script>alert('Address submitted successfully!'); window.location.href = '/homepage.html';</script>");
    });
});

module.exports = router;
