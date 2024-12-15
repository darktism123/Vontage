document.addEventListener('DOMContentLoaded', () => {
    fetchEmployees(); // โหลดข้อมูลครั้งแรก
});

const employeeTableBody = document.getElementById('employee-table-body');
const loadingMessage = document.getElementById('loading-message');

// ฟังก์ชันดึงข้อมูลพนักงานจาก Backend
async function fetchEmployees() {
    loadingMessage.classList.remove('hidden'); // แสดงข้อความ Loading
    try {
        const response = await fetch('/back/employee'); // เรียก API
        if (!response.ok) throw new Error('Failed to fetch employee data.');

        const employees = await response.json();
        renderEmployeeTable(employees); // แสดงข้อมูลบนตาราง
    } catch (error) {
        console.error('Error:', error.message);
        alert('Unable to load data. Please try again.');
    } finally {
        loadingMessage.classList.add('hidden'); // ซ่อนข้อความ Loading
    }
}

// ฟังก์ชันสร้างตารางข้อมูล
function renderEmployeeTable(employees) {
    employeeTableBody.innerHTML = ''; // ล้างข้อมูลเก่า
    employees.forEach(emp => {
        const row = `
            <tr>
                <td>${emp.first_name}</td>
                <td>${emp.last_name}</td>
                <td>${emp.email}</td>
                <td>${emp.password}</td>
                <td>${emp.phone}</td>
                <td>${emp.department_id}</td>
            </tr>
        `;
        employeeTableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Refresh Data
document.getElementById('refresh-data-btn').addEventListener('click', fetchEmployees);
