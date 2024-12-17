const db = require('../config/db'); // เชื่อมต่อฐานข้อมูล

exports.customer_order = (req, res) => {
    const sql = `
        SELECT 
            o.order_id, 
            o.customer_id, 
            o.order_date, 
            o.status, 
            od.order_detail_id, 
            od.product_no, 
            od.quantity, 
            od.sub_total
        FROM 
            \`order\` AS o
        JOIN 
            \`order_detail\` AS od 
        ON 
            o.order_id = od.order_id;
    `;

    // Query ข้อมูลจากฐานข้อมูล
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: 'Internal server error' }); // ส่งสถานะ 500 พร้อมข้อความ error
        }

        // ส่งข้อมูลกลับในรูปแบบ JSON
        return res.status(200).json({ 
            success: true,
            data: results 
        });
    });
};
