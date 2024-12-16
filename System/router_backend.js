const express = require('express');
const path = require('path'); // ใช้ path module
const router = express.Router();

const employeeController = require('./routes_Backend/employee_vontage'); 
const graphRoutes = require('./routes_Backend/graph_vontage');
const most_sale = require('./routes_Backend/most_sale_dashboard');
const stock_product = require('./routes_Backend/stock');
const upload = require('./middleware/upload');
const adminController = require('./routes_Backend/admin_controller');


router.post('/back/add-product', upload.single('image_main'), stock_product.add_product);


// Static Path
router.use('/images', express.static(path.join(__dirname, 'image_vontage')));
router.use(express.static(path.join(__dirname, 'public')));

// Route สำหรับแสดงหน้าเว็บ
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/dashboard.html'));
});

router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/test.html'));
});

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/admin.html'));
});

router.get('/stock/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/product_stock.html'));
});

// Routes เชื่อม Backend
router.get('/employee', employeeController.employeetable);
router.get('/graph', graphRoutes.getGraphData);
router.get('/mostproduct', most_sale.most_product);
router.get('/stock', stock_product.stock);
router.post('/add-product', upload.single('image_main'), stock_product.add_product); // แก้ไข Route ให้ชัดเจน
router.post('/add_emp', adminController.addEmployee);
router.post('/update_emp', adminController.updateEmployee);
router.get('/employee/:email', adminController.getEmployeeByEmail);
router.delete('/delete_emp/:email', adminController.deleteEmployee);

module.exports = router;
