const fs = require('fs');
const multer = require('multer');
const path = require('path');

// ตรวจสอบและสร้างโฟลเดอร์หากยังไม่มี
const uploadDir = path.join(__dirname, '../webpage/image_vontage'); // ตำแหน่งเก็บไฟล์
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่า Storage สำหรับ Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // ใช้โฟลเดอร์ที่ตรวจสอบแล้ว
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const customName = `card_${Date.now()}${ext}`;
        cb(null, customName);
    }
});

const upload = multer({ storage });

module.exports = upload;
