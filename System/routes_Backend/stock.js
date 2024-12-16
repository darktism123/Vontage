const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ดึงการตั้งค่าฐานข้อมูล
const upload = require('../middleware/upload'); // Middleware สำหรับการอัปโหลดไฟล์



exports.stock = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.product_id, 
                p.product_name, 
                p.image_main, 
                p.price, 
                pd.size, 
                pd.stock_quantity,
                c.category_name
            FROM 
                product p
            JOIN 
                product_detail pd ON p.product_id = pd.product_id
            JOIN 
                category c ON pd.category_id = c.category_id
        `;

        db.query(query, (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                res.status(500).json({ error: 'Error retrieving data from database' });
            } else {
                // ปรับ image_main ให้เชื่อมกับ static path /images
                const updatedResults = results.map(product => ({
                    ...product,
                    image_main: product.image_main 
                        ? `/image_vontage/${product.image_main.replace('image_vontage/', '')}` 
                        : null
                }));
                res.json({ products: updatedResults });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
};

exports.add_product = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { product_name, category_name, size, price, stock_quantity } = req.body;
        const image_main = req.file ? req.file.filename : null;

        if (!product_name || !category_name || !size || !price || !stock_quantity) {
            console.log('Missing fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // ดึง category_id จาก category_name
        const [categoryResult] = await db.promise().query(
            'SELECT category_id FROM category WHERE category_name = ? LIMIT 1',
            [category_name]
        );

        const categoryId = categoryResult[0]?.category_id;
        if (!categoryId) {
            console.log('Invalid category name');
            return res.status(400).json({ error: 'Invalid category name' });
        }

        // เพิ่มข้อมูลลงในตาราง product
        const productQuery = `
            INSERT INTO product (product_name, image_main, price, date_added)
            VALUES (?, ?, ?, NOW());
        `;
        const [productResult] = await db.promise().query(productQuery, [product_name, image_main, price]);

        const productId = productResult.insertId;

        const detailQuery = `
            INSERT INTO product_detail (product_id, category_id, size, stock_quantity)
            VALUES (?, ?, ?, ?);
        `;
        await db.promise().query(detailQuery, [productId, categoryId, size, stock_quantity]);

        res.json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to add product', details: error.message });
    }
};



exports.update_product_image = async (req, res) => {
    try {
        const productId = req.body.product_id; // รับ product_id จากฟอร์ม
        const imagePath = req.file ? `/images/${req.file.filename}` : null;

        if (!imagePath) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        // อัปเดต path รูปภาพในฐานข้อมูล
        const query = `UPDATE product SET image_main = ? WHERE product_id = ?`;
        await db.promise().query(query, [imagePath, productId]);

        res.json({ message: 'Product image updated successfully', path: imagePath });
    } catch (error) {
        console.error('Error updating product image:', error.message);
        res.status(500).json({ error: 'Failed to update product image' });
    }
};
