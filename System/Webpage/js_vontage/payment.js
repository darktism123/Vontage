window.onload = () => {
    // แสดง QR Payment เป็นค่าเริ่มต้น
    document.getElementById("QR_payment").classList.add("active");
};      
function showQR() {
    const qrSection = document.getElementById("QR_payment");
    const destinationSection = document.getElementById("destination");

    qrSection.classList.add("active");
    destinationSection.classList.remove("active");
}

function showDestination() {
    const qrSection = document.getElementById("QR_payment");
    const destinationSection = document.getElementById("destination");

    destinationSection.classList.add("active");
    qrSection.classList.remove("active");
}
const paymentButtons = document.querySelectorAll('.payment-options button');

paymentButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // ลบคลาส active จากปุ่มทั้งหมด
        paymentButtons.forEach((btn) => btn.classList.remove('active'));
        // เพิ่มคลาส active ให้ปุ่มที่ถูกกด
        button.classList.add('active');
    });
});