// Import required modules
const express = require('express');
const path = require('path'); // ใช้ path module เพื่อจัดการกับเส้นทางไฟล์
const router = express.Router();

// Import controllers and routes
const employeeController = require('./routes_Backend/employee_vontage'); 
const graphRoutes = require('./routes_Backend/graph_vontage');
const most_sale = require('./routes_Backend/most_sale_dashboard');
const stock_product = require('./routes_Backend/stock');
const upload = require('./middleware/upload'); // Middleware สำหรับการอัปโหลดไฟล์
const adminController = require('./routes_Backend/admin_controller');

// Route สำหรับการเพิ่มสินค้าใหม่ โดยใช้ POST method และใช้ upload middleware สำหรับอัปโหลดไฟล์
router.post('/back/add-product', upload.single('image_main'), stock_product.add_product);

// Static Paths: กำหนดเส้นทางสำหรับไฟล์ static (เช่น รูปภาพ, CSS, JavaScript)
router.use('/images', express.static(path.join(__dirname, 'image_vontage'))); // ให้บริการไฟล์ในโฟลเดอร์ 'image_vontage'
router.use(express.static(path.join(__dirname, 'public'))); // ให้บริการไฟล์ในโฟลเดอร์ 'public'

// Route สำหรับแสดงหน้าเว็บต่างๆ

// แสดงหน้า dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/dashboard.html')); // ส่งไฟล์ HTML สำหรับหน้า dashboard
});


router.get('/orderstatus_shipping', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/customer_order_shipping.html')); // ส่งไฟล์ HTML สำหรับหน้า dashboard
});

router.get('/orderstatus_warehouse', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/customer_order_warehouse.html')); // ส่งไฟล์ HTML สำหรับหน้า dashboard
});



// แสดงหน้า admin
router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/admin.html')); // ส่งไฟล์ HTML สำหรับหน้า admin
});

// แสดงหน้า product stock
router.get('/shipping', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/customer_order_shipping.html'));
});
router.get('/stock/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/employee_vontage/product_stock.html')); // ส่งไฟล์ HTML สำหรับหน้า product stock
});

// Backend Routes: เชื่อมต่อกับ Controller สำหรับแต่ละฟังก์ชัน

// แสดงตารางพนักงาน
router.get('/employee', employeeController.employeetable);

// ดึงข้อมูลกราฟ
router.get('/graph', graphRoutes.getGraphData);

// ดึงข้อมูลสินค้าที่ขายดีที่สุด
router.get('/mostproduct', most_sale.most_product);

// แสดงข้อมูลสินค้า
router.get('/stock', stock_product.stock);

// เพิ่มสินค้าใหม่
router.post('/add-product', upload.single('image_main'), stock_product.add_product);

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

router.delete('/delete-product/:id', stock_product.deleteProduct);


// Export router for use in the main app
module.exports = router;
