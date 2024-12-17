const express = require('express');
const router = express.Router();
const db = require('../config/db');

const updateProductStock = (productNo, quantity) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE product_detail
            SET stock_quantity = stock_quantity - ?, quantity_sold = quantity_sold + ?
            WHERE product_no = ?;
        `;
        db.query(query, [quantity, quantity, productNo], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

// Route to create a new order
router.post('/createOrders', (req, res) => {
    if (!req.session.customerId) {
        return res.status(403).send('User not logged in.');
    }

    const { cartItems } = req.body;
    if (!cartItems || cartItems.length === 0) {
        return res.status(400).send('No items in the order.');
    }

    const customer_id = req.session.customerId;
    const status = 'pending';
    const orderQuery = 'INSERT INTO `order` (customer_id, order_date, status) VALUES (?, NOW(), ?)';

    db.query(orderQuery, [customer_id, status], (err, orderResult) => {
        if (err) {
            console.error('Error creating order:', err);
            return res.status(500).send('Error creating order.');
        }

        const orderId = orderResult.insertId;
        const orderDetailsQuery = 'INSERT INTO order_detail (order_id, product_no, quantity, sub_total) VALUES ?';
        const orderDetailsData = cartItems.map(item => [
            orderId,
            item.product_no,
            item.quantity,
            parseFloat(item.price.replace('$', '')) * item.quantity
        ]);

        db.query(orderDetailsQuery, [orderDetailsData], async (err) => {
            if (err) {
                console.error('Error adding order details:', err);
                return res.status(500).send('Error adding order details.');
            }

            try {
                await Promise.all(cartItems.map(item => updateProductStock(item.product_no, item.quantity)));
                res.send({ message: 'Order placed successfully', orderId: orderId });
            } catch (stockUpdateError) {
                console.error('Error updating product stock:', stockUpdateError);
                res.status(500).send('Failed to update product stock');
            }
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
