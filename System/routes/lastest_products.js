const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection

// Route to fetch the latest 10 products
router.get('/', (req, res) => {
    const query = `
        SELECT product_id, product_name, image_main, price, date_added
        FROM product
        ORDER BY date_added DESC
        LIMIT 10;
    `;

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching latest products:', err.message);
            return res.status(500).json({
                error: 'Failed to fetch latest products. Please try again later.',
                details: err.message
            });
        }

        // If no products are found
        if (results.length === 0) {
            return res.status(404).json({
                message: 'No products found',
                latestProducts: []
            });
        }

        // Respond with the fetched products
        res.status(200).json({
            message: 'Latest 10 products fetched successfully',
            latestProducts: results
        });
    });
});

module.exports = router;
