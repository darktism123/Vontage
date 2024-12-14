const express = require('express');
const router = express.Router();
const db = require('../config/db_back'); // ดึงการตั้งค่าฐานข้อมูล

// Endpoint ดึงข้อมูลพนักงานทั้งหมด


exports.employeetable = async (req, res) => {
    try {
        // Query ดึงข้อมูลพนักงาน
        const [rows] = await db.promise().query('SELECT * FROM employee');
        res.json(rows); // ส่งข้อมูลกลับในรูปแบบ JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching employees'); // กรณีเกิดข้อผิดพลาด
    }
}



