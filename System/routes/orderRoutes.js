const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to create a new order
router.post('/createOrders', (req, res) => {
    if (!req.session.customerId) {
        return res.status(403).send('User not logged in.');
    }

    const { cartItems } = req.body;
    if (!cartItems || cartItems.length === 0) {
        return res.status(400).send('No items in the order.');
    }

    // Use the customer ID from the session
    const customer_id = req.session.customerId;
    const status = 'pending';

    // Insert into the `order` table
    const orderQuery = 'INSERT INTO `order` (customer_id, order_date, status) VALUES (?, NOW(), ?)';
    db.query(orderQuery, [customer_id, status], (err, orderResult) => {
        if (err) {
            console.error('Error creating order:', err);
            return res.status(500).send('Error creating order.');
        }

        const orderId = orderResult.insertId; // Get the newly created order ID

        // Insert each item into the `order_detail` table
        const orderDetailsQuery = 'INSERT INTO order_detail (order_id, product_no, quantity, sub_total) VALUES ?';

        // Calculate subtotal for each item before inserting
        const orderDetailsData = cartItems.map(item => {
            const price = parseFloat(item.price.replace('$', '')) || 0; // Clean price format
            const quantity = item.quantity || 1;
            const subtotal = price * quantity; // Calculate subtotal
            return [orderId, item.product_no, quantity, subtotal]; // Array format for bulk insert
        });

        db.query(orderDetailsQuery, [orderDetailsData], (err) => {
            if (err) {
                console.error('Error adding order details:', err);
                return res.status(500).send('Error adding order details.');
            }

            res.send({ message: 'Order placed successfully', orderId: orderId });
        });
    });
});



router.get('/userOrders/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT o.order_id, o.order_date, o.status, od.product_no, od.quantity, od.sub_total, 
               p.product_name, p.image_main
        FROM \`order\` o
        JOIN order_detail od ON o.order_id = od.order_id
        JOIN product_detail pd ON od.product_no = pd.product_no
        JOIN product p ON pd.product_id = p.product_id
        WHERE o.customer_id = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err.message);
            res.status(500).send('Error fetching orders');
            return;
        }

        if (results.length === 0) {
            return res.status(404).send('No orders found for the user');
        }

        res.status(200).json(results);
    });
});

module.exports = router;
