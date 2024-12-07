const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

router.post('/', async (req, res) => {
    const { Username: username, Email: email, Password: password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("<script>alert('All fields are required.'); window.history.back();</script>");
    }

    // Check email or username
    db.query("SELECT customer_id FROM customer WHERE email = ? OR username = ?", [email, username], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            return res.status(400).send("<script>alert('Username or email is already taken.'); window.history.back();</script>");
        }

        // Hash password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;

            // Insert new user
            db.query("INSERT INTO customer (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], (err, result) => {
                if (err) throw err;

                res.send("<script>alert('Registration successful!'); window.location.href = '/login_vontage.html';</script>");
            });
        });
    });
});

module.exports = router;
