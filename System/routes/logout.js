const express = require('express');
const router = express.Router();

// Route to handle user logout
router.get('/', (req, res) => {
    if (req.session) {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err.message);
                return res.status(500).send('Failed to log out');
            }

            // Clear the session cookie
            res.clearCookie('connect.sid'); // Assuming 'connect.sid' is the default session cookie name

            // Redirect to the homepage
            return res.redirect('/');
        });
    } else {
        // Redirect to the homepage if no active session
        return res.redirect('/');
    }
});

module.exports = router;
