const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ดึงการตั้งค่าฐานข้อมูล

// เพิ่มพนักงานใหม่
exports.addEmployee = (req, res) => {
    const { first_name, last_name, email, password, phone, department_id } = req.body;

    if (!first_name || !last_name || !email || !password || !phone || !department_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
        INSERT INTO employee (first_name, last_name, email, password, phone, department_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [first_name, last_name, email, password, phone, department_id], (err) => {
        if (err) {
            console.error('Error adding employee:', err.message);
            return res.status(500).json({ error: 'Failed to add employee' });
        }
        res.status(200).json({ message: 'Employee added successfully' });
    });
};

// อัปเดตข้อมูลพนักงาน
exports.updateEmployee = (req, res) => {
    const { first_name, last_name, email, password, phone, department_id } = req.body;

    const query = `
        UPDATE employee 
        SET first_name = ?, last_name = ?, password = ?, phone = ?, department_id = ?
        WHERE email = ?`;

    db.query(query, [first_name, last_name, password, phone, department_id, email], (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: 'Failed to update employee data' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully' });
    });
};


exports.getEmployeeByEmail = (req, res) => {
    const { email } = req.params;

    // Query สำหรับดึงข้อมูลพนักงาน
    const query = 'SELECT * FROM employee WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error fetching employee data:', err);
            return res.status(500).json({ error: 'Database error while fetching employee data' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(result[0]); // ส่งข้อมูลพนักงานกลับไป
    });
};

exports.deleteEmployee = (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const deleteQuery = 'DELETE FROM employee WHERE email = ?';

    db.query(deleteQuery, [email], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({ error: 'Failed to delete employee' });
        }
        return res.json({ message: 'Employee deleted successfully' });
    });
};
