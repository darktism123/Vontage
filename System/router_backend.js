const express = require('express');
const path = require('path'); // ใช้ path module
const router = express.Router();



const employeeController = require('./routes_Backend/employee_vontage'); // Adjust path as needed
const graphRoutes = require('./routes_Backend/graph_vontage');




// Route สำหรับหน้า dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/dashboard.html'));
});

router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/test.html'));
});

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/admin.html'));
});

// เชื่อม router สำหรับพนักงาน

router.get('/employee', employeeController.employeetable);
router.get('/graph', graphRoutes.getGraphData);



module.exports = router;






