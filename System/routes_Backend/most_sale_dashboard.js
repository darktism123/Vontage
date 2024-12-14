const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ดึงการตั้งค่าฐานข้อมูล


exports.most_product = async (req, res) => {
    try {
      const query = `
        SELECT 
          pd.product_id, 
          pd.product_no, 
          pd.size, 
          pd.stock_quantity, 
          pd.quantity_sold,
          pd.category_id
        FROM product_detail pd
        ORDER BY pd.quantity_sold DESC
        LIMIT 10;
      `;
  
      // ใช้ db.promise().query() เพื่อรันคำสั่ง SQL แบบ async
      const [results] = await db.promise().query(query);
  
      // ส่งผลลัพธ์กลับไปที่ client
      res.json({ success: true, data: results });
    } catch (error) {
      console.error("Database query error: ", error.message);
      res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
    }
  };