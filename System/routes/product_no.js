const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import your database connection

// Route to fetch product_no based on product_id and size
router.get('/getProductNo', (req, res) => {
    const { product_id, size } = req.query;

    if (!product_id || !size) {
        return res.status(400).json({ message: 'Product ID and size are required.' });
    }

    const cleanSize = size.trim(); // Clean any extra whitespace

    const query = `
        SELECT product_no 
        FROM product_detail 
        WHERE product_id = ? AND LOWER(size) = LOWER(?)
    `;

    db.query(query, [product_id, cleanSize], (err, results) => {
        if (err) {
            console.error('Error fetching product_no:', err.message);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found for the selected size.' });
        }

        res.json({ product_no: results[0].product_no });
    });
});

module.exports = router;
