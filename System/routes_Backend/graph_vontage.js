const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ดึงการตั้งค่าฐานข้อมูล
<<<<<<< HEAD
=======

>>>>>>> 242af5c0324efbd17a7ace48b386ae85456a3570

exports.getGraphData = async (req, res) => {
    try {
        const query = `
            SELECT 
                DATE_FORMAT(O.order_date, '%Y-%m-%d') AS date, 
                IFNULL(SUM(od.sub_total), 0) AS revenue 
            FROM \`order\` O
            LEFT JOIN order_detail od ON O.order_id = od.order_id
            GROUP BY DATE_FORMAT(O.order_date, '%Y-%m-%d')
            ORDER BY date;
        `;

        const [results] = await db.promise().query(query);
        res.json({ success: true, data: results });
    } catch (error) {
        console.error("Database query error: ", error.message);
        res.status(500).send('Internal server error. Please try again later.');
    }
};

