const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

router.post('/', (req, res) => {
    const { Email: email, Password: password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).send("<script>alert('Both email and password are required.'); window.history.back();</script>");
    }

    // Query to check if the user exists
    const query = 'SELECT * FROM customer WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching customer:', err.message);
            return res.status(500).send("<script>alert('Internal server error. Please try again later.'); window.history.back();</script>");
        }

        // If no user is found
        if (results.length === 0) {
            return res.status(400).send("<script>alert('Invalid email or password.'); window.history.back();</script>");
        }

        const user = results[0]; // Get the user data

        // Compare the password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err.message);
                return res.status(500).send("<script>alert('Internal server error. Please try again later.'); window.history.back();</script>");
            }

            // If password is incorrect
            if (!isMatch) {
                return res.status(400).send("<script>alert('Invalid email or password.'); window.history.back();</script>");
            }

            // Save user ID in session
            req.session.customerId = user.customer_id;

            // Redirect to homepage with success message
            res.send("<script>alert('Login successful!'); window.location.href = '/';</script>");
        });
    });
});

module.exports = router;
