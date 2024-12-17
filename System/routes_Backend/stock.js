// Import the required modules
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ดึงการตั้งค่าฐานข้อมูล
const upload = require('../middleware/upload'); // Middleware สำหรับการอัปโหลดไฟล์

// Controller function to fetch all stock data
exports.stock = async (req, res) => {
    try {
        // Query เพื่อดึงข้อมูลสินค้าจากฐานข้อมูล
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

        // Query ฐานข้อมูล
        db.query(query, (err, results) => {
            if (err) {
                // หากเกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล
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
                // ส่งข้อมูลสินค้าเป็น JSON กลับไปยัง client
                res.json({ products: updatedResults });
            }
        });
    } catch (error) {
        // จัดการกับข้อผิดพลาดที่ไม่คาดคิด
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
};

// Controller function to add a new product
exports.add_product = async (req, res) => {
    try {
        // ดึงข้อมูลจาก body ของ request
        const { product_name, category_name, size, price, stock_quantity } = req.body;
        const image_main = req.file ? req.file.filename : null; // รับไฟล์ภาพจาก request

        // ตรวจสอบข้อมูลที่จำเป็นทั้งหมด
        if (!product_name || !category_name || !size || !price || !stock_quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // ดึง category_id จาก category_name
        const [categoryResult] = await db.promise().query(
            'SELECT category_id FROM category WHERE category_name = ? LIMIT 1',
            [category_name]
        );

        const categoryId = categoryResult[0]?.category_id;
        if (!categoryId) {
            return res.status(400).json({ error: 'Invalid category name' });
        }

        // เพิ่มข้อมูลลงในตาราง product
        const productQuery = `
            INSERT INTO product (product_name, image_main, price, date_added)
            VALUES (?, ?, ?, NOW());
        `;
        const [productResult] = await db.promise().query(productQuery, [product_name, image_main, price]);

        // เพิ่มข้อมูลลงในตาราง product_detail
        const productId = productResult.insertId;
        const detailQuery = `
            INSERT INTO product_detail (product_id, category_id, size, stock_quantity)
            VALUES (?, ?, ?, ?);
        `;
        await db.promise().query(detailQuery, [productId, categoryId, size, stock_quantity]);

        // ส่งข้อความตอบกลับเมื่อเพิ่มสินค้าเสร็จ
        res.json({ message: 'Product added successfully' });
    } catch (error) {
        // จัดการกับข้อผิดพลาดเมื่อไม่สามารถเพิ่มสินค้าได้
        console.error('Error adding product:', error.message);
        res.status(500).json({ error: 'Failed to add product' });
    }
};

// Controller function to update product image
exports.update_product_image = async (req, res) => {
    try {
        // รับ product_id จาก body ของ request
        const productId = req.body.product_id;
        const imagePath = req.file ? `/images/${req.file.filename}` : null;

        // ตรวจสอบว่าได้อัปโหลดไฟล์ภาพหรือไม่
        if (!imagePath) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        // อัปเดต path รูปภาพในฐานข้อมูล
        const query = `UPDATE product SET image_main = ? WHERE product_id = ?`;
        await db.promise().query(query, [imagePath, productId]);

        // ส่งข้อความตอบกลับเมื่ออัปเดตเสร็จ
        res.json({ message: 'Product image updated successfully', path: imagePath });
    } catch (error) {
        // จัดการกับข้อผิดพลาดเมื่อไม่สามารถอัปเดตภาพได้
        console.error('Error updating product image:', error.message);
        res.status(500).json({ error: 'Failed to update product image' });
    }
};

// Controller function to get a single product's details by its ID
exports.getProduct = (req, res) => {
    const productId = req.params.id; // รับ product_id จาก URL parameter
    // Query ข้อมูลสินค้า
    db.query('SELECT * FROM products WHERE id = ?', [productId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message }); // หากเกิดข้อผิดพลาด
        if (result.length === 0) return res.status(404).json({ error: 'Product not found' }); // หากไม่พบสินค้า
        res.json(result[0]); // ส่งข้อมูลสินค้า
    });
};

// Controller function to update product details
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id; // รับ ID จาก URL
        const { product_name, size, price, stock_quantity } = req.body;

        // ตรวจสอบว่าข้อมูลถูกส่งมาครบหรือไม่
        if (!product_name || !size || !price || !stock_quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // อัปเดตข้อมูลในตาราง product และ product_detail
        const query = `
            UPDATE product p
            JOIN product_detail pd ON p.product_id = pd.product_id
            SET p.product_name = ?, pd.size = ?, p.price = ?, pd.stock_quantity = ?
            WHERE p.product_id = ? AND NOT EXISTS (
                SELECT 1 FROM product WHERE product_name = ? AND product_id != ?
            )
        `;
        await db.promise().query(query, [product_name, size, price, stock_quantity, productId, product_name, productId]);

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Product name already exists. Please use a different name.' });
        } else {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Failed to update product' });
        }
    }
    
};


exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // SQL Query สำหรับลบข้อมูลจาก product_detail และ product
        const query = `
            DELETE pd, p 
            FROM product p
            JOIN product_detail pd ON p.product_id = pd.product_id
            WHERE p.product_id = ?;
        `;

        // Execute Query
        await db.promise().query(query, [productId]);

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};


