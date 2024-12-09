const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

router.post('/', async (req, res) => {
    const { Email: email, Password: password } = req.body;

    if (!email || !password) {
        return res.status(400).send("<script>alert('Both email and password are required.'); window.history.back();</script>");
    }

    // Check if the user exists
    db.query("SELECT * FROM customer WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("<script>alert('Internal server error.'); window.history.back();</script>");
        }

        if (results.length === 0) {
            return res.status(400).send("<script>alert('Invalid email or password.'); window.history.back();</script>");
        }

        const user = results[0];

        // Compare the password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).send("<script>alert('Internal server error.'); window.history.back();</script>");
            }

            if (!isMatch) {
                return res.status(400).send("<script>alert('Invalid email or password.'); window.history.back();</script>");
            }

            res.send("<script>alert('Login successful!'); window.location.href = '/homepage.html';</script>");
        });
    });
});

module.exports = router;
