const express = require('express');
const path = require('path');
const router = express.Router();

// Import controllers and routes
const employeeController = require('./routes_Backend/employee_vontage'); 
const graphRoutes = require('./routes_Backend/graph_vontage');
const most_sale = require('./routes_Backend/most_sale_dashboard');
const stock_product = require('./routes_Backend/stock');
const upload = require('./middleware/upload'); // Middleware สำหรับการอัปโหลดไฟล์
const adminController = require('./routes_Backend/admin_controller');
const customerOrder = require('./routes_Backend/order_customer'); // Import correctly

// Route สำหรับการเพิ่มสินค้าใหม่ โดยใช้ POST method และใช้ upload middleware สำหรับอัปโหลดไฟล์
router.post('/add-product', upload.single('image_main'), stock_product.add_product);

// Static Paths: กำหนดเส้นทางสำหรับไฟล์ static (เช่น รูปภาพ, CSS, JavaScript)
router.use('/images', express.static(path.join(__dirname, 'image_vontage'))); // ให้บริการไฟล์ในโฟลเดอร์ 'image_vontage'
router.use(express.static(path.join(__dirname, 'public'))); // ให้บริการไฟล์ในโฟลเดอร์ 'public'

// Route สำหรับแสดงหน้าเว็บต่างๆ
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/dashboard.html')); // ส่งไฟล์ HTML สำหรับหน้า dashboard
});

router.get('/orderstatus_shipping', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/customer_order_shipping.html'));
});

router.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/customer_order_warehouse.html'));
});

// แสดงหน้า admin
router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/admin.html'));
});

// แสดงหน้า product stock
router.get('/shipping', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/customer_order_shipping.html'));
});
router.get('/stock/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/product_stock.html'));
});

// Backend Routes: เชื่อมต่อกับ Controller สำหรับแต่ละฟังก์ชัน
router.get('/employee', employeeController.employeetable);
router.get('/graph', graphRoutes.getGraphData);
router.get('/mostproduct', most_sale.most_product);
router.get('/stock', stock_product.stock);

// เพิ่มพนักงานใหม่
router.post('/add_emp', adminController.addEmployee);

// อัปเดตข้อมูลพนักงาน
router.post('/update_emp', adminController.updateEmployee);

// ดึงข้อมูลพนักงานโดยใช้ email
router.get('/employee/:email', adminController.getEmployeeByEmail);

// ลบพนักงาน
router.delete('/delete_emp/:email', adminController.deleteEmployee);

// อัปเดตข้อมูลสินค้า
router.put('/update-product/:id', stock_product.updateProduct);

// ดึงข้อมูลสินค้าตาม id
router.get('/product/:id', stock_product.getProduct);

// ลบสินค้า
router.delete('/delete-product/:id', stock_product.deleteProduct);

// ดึงข้อมูลสถานะการสั่งซื้อ
router.get('/status', customerOrder.customer_order); // Use correct export name

// Export router for use in the main app
module.exports = router;
