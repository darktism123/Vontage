const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to fetch product details including sizes and image_main
router.get('/:product_id', (req, res) => {
    const productId = req.params.product_id;

    const query = `
        SELECT p.product_id, p.product_name, p.price, p.description, 
               p.image1, p.image2, p.image3, p.image4, p.image_main, 
               GROUP_CONCAT(DISTINCT pd.size ORDER BY pd.size SEPARATOR ', ') AS sizes
        FROM product p
        LEFT JOIN product_detail pd ON p.product_id = pd.product_id
        WHERE p.product_id = ?
        GROUP BY p.product_id, p.product_name, p.price, p.description,
                 p.image1, p.image2, p.image3, p.image4, p.image_main`;

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product details:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const product = results[0];
        const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean); // Filter out null values

        res.json({
            product_id: product.product_id,
            product_name: product.product_name,
            price: product.price,
            description: product.description,
            images, // Product images
            image_main: product.image_main, // Include the image_main field
            sizes: product.sizes ? product.sizes.split(', ') : [] // Split sizes into an array
        });
    });
});

module.exports = router;
