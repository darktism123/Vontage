const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection

// Route to fetch the top 10 most sold products
router.get('/', (req, res) => {
    const query = `
        SELECT 
            p.product_id, 
            p.product_name, 
            p.image_main, 
            p.price, 
            p.date_added,
            SUM(pd.quantity_sold) AS total_quantity_sold
        FROM product AS p
        INNER JOIN product_detail AS pd ON p.product_id = pd.product_id
        GROUP BY p.product_id, p.product_name, p.image_main, p.price, p.date_added
        ORDER BY total_quantity_sold DESC
        LIMIT 10;
    `;

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching top sold products:', err.message);
            return res.status(500).json({
                error: 'Failed to fetch top sold products. Please try again later.',
                details: err.message
            });
        }

        // If no products are found
        if (results.length === 0) {
            return res.status(404).json({
                message: 'No top sold products found',
                topSoldProducts: []
            });
        }

        // Respond with the fetched products
        res.status(200).json({
            message: 'Top 10 most sold products fetched successfully',
            topSoldProducts: results
        });
    });
});

module.exports = router;
