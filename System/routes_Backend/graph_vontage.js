const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ดึงการตั้งค่าฐานข้อมูล

exports.getGraphData = async (req, res) => {
    try {
        const query = `
    SELECT 
        DATE_FORMAT(O.order_date, '%m-%d') AS month, 
        IFNULL(SUM(od.sub_total), 0) AS revenue 
    FROM \`order\` O
    LEFT JOIN order_detail od ON O.order_id = od.order_id
    GROUP BY DATE_FORMAT(O.order_date, '%m-%d');
`;
const [results] = await db.promise().query(query);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Database error');
    }
};
