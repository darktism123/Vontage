const express = require('express');
const path = require('path'); // ใช้ path module
const employeeRoutes = require('./routes_Backend/employee_vontage'); // Adjust path as needed

const app = express.Router();

// Route สำหรับหน้า dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../Webpage/employee_vontage/dashboard.html'));
});



// เชื่อม router สำหรับพนักงาน
app.use('/employee', employeeRoutes);

module.exports = app;
