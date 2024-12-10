const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

router.post('/', async (req, res) => {
    const { Username: username, Email: email, Password: password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
        return res.status(400).send("<script>alert('All fields are required.'); window.history.back();</script>");
    }

    // Check if the email or username already exists
    db.query("SELECT customer_id FROM customer WHERE email = ? OR username = ?", [email, username], (err, results) => {
        if (err) {
            console.error('Error checking existing user:', err.message);
            return res.status(500).send("<script>alert('Internal server error. Please try again later.'); window.history.back();</script>");
        }

        if (results.length > 0) {
            return res.status(400).send("<script>alert('Username or email is already taken.'); window.history.back();</script>");
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err.message);
                return res.status(500).send("<script>alert('Internal server error. Please try again later.'); window.history.back();</script>");
            }

            // Insert the new user into the database
            db.query("INSERT INTO customer (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting new user:', err.message);
                    return res.status(500).send("<script>alert('Internal server error. Please try again later.'); window.history.back();</script>");
                }

                // Store the new user's ID in the session
                req.session.customerId = result.insertId;

                // Redirect to the address registration page
                res.send("<script>window.location.href = '/address.html';</script>");
            });
        });
    });
});

module.exports = router;
