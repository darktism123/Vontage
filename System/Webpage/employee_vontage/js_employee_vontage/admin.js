document.addEventListener('DOMContentLoaded', () => {
    fetchEmployees(); // โหลดข้อมูลพนักงาน

    const addPopup = document.getElementById('popup-form');
    const openAddPopupBtn = document.getElementById('open-popup-btn');
    const closeAddPopupBtn = document.getElementById('close-popup-btn');
    const addEmployeeForm = document.getElementById('add-employee-form');

    // เปิด Add Popup
    openAddPopupBtn?.addEventListener('click', () => {
        addPopup.classList.remove('hidden');
    });

    // ปิด Add Popup
    closeAddPopupBtn?.addEventListener('click', () => {
        addPopup.classList.add('hidden');
    });

    // ฟอร์มสำหรับเพิ่มพนักงาน
    addEmployeeForm?.addEventListener('submit', addEmployee);
});

// ฟังก์ชันเพิ่มพนักงาน
async function addEmployee(event) {
    event.preventDefault();

    const first_name = document.getElementById('firstName').value;
    const last_name = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const department_id = document.getElementById('department-id').value;

    try {
        const response = await fetch('/back/add_emp', { // ใช้ route นี้
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name, last_name, email, password, phone, department_id }),
        });

        if (!response.ok) throw new Error('Failed to add employee');

        alert('Employee added successfully');
        fetchEmployees();
        document.getElementById('popup-form').classList.add('hidden');
    } catch (error) {
        console.error('Error adding employee:', error);
        alert('Failed to add employee');
    }
}

// ฟังก์ชันดึงข้อมูลพนักงาน
async function fetchEmployees() {
    const loadingMessage = document.getElementById('loading-message');
    const employeeTableBody = document.getElementById('employee-table-body');

    loadingMessage.classList.remove('hidden');
    try {
        const response = await fetch('/back/employee');
        if (!response.ok) throw new Error('Failed to fetch employee data.');

        const employees = await response.json();
        renderEmployeeTable(employees);
    } catch (error) {
        console.error('Error:', error.message);
        alert('Unable to load data. Please try again.');
    } finally {
        loadingMessage.classList.add('hidden');
    }
}

// แสดงตารางข้อมูล
function renderEmployeeTable(employees) {
    const employeeTableBody = document.getElementById('employee-table-body');
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
                <td>
                    <button class="edit-btn" onclick="openEditPopup('${emp.email}')">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee('${emp.email}')">Delete</button>
                </td>
            </tr>
        `;
        employeeTableBody.insertAdjacentHTML('beforeend', row);
    });
}


// ฟังก์ชันลบข้อมูลพนักงาน
async function deleteEmployee(email) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    try {
        const response = await fetch(`/back/delete_emp/${email}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete employee');

        alert('Employee deleted successfully');
        fetchEmployees(); // รีเฟรชตารางหลังจากลบเสร็จ
    } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
    }
}

async function updateEmployee(event) {
    event.preventDefault();

    const updatedEmployee = {
        first_name: document.getElementById('edit-firstName').value,
        last_name: document.getElementById('edit-lastName').value,
        email: document.getElementById('edit-email').value,
        password: document.getElementById('edit-password').value,
        phone: document.getElementById('edit-phone').value,
        department_id: document.getElementById('edit-department-id').value,
    };

    try {
        const response = await fetch('/back/update_emp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEmployee),
        });

        if (!response.ok) throw new Error('Failed to update employee');

        alert('Employee updated successfully.');
        document.getElementById('edit-popup-form').classList.add('hidden');
        fetchEmployees(); // รีเฟรชตาราง
    } catch (error) {
        console.error('Error updating employee:', error);
        alert('Failed to update employee.');
    }
}



// ฟังก์ชันเปิด Popup สำหรับ Edit
function openEditPopup(email) {
    fetch(`/back/employee/${encodeURIComponent(email)}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch employee data');
            return response.json();
        })
        .then(emp => {
            // ใส่ข้อมูลที่ดึงมาในฟอร์มแก้ไข
            document.getElementById('edit-firstName').value = emp.first_name;
            document.getElementById('edit-lastName').value = emp.last_name;
            document.getElementById('edit-email').value = emp.email;
            document.getElementById('edit-password').value = emp.password;
            document.getElementById('edit-phone').value = emp.phone;
            document.getElementById('edit-department-id').value = emp.department_id;

            document.getElementById('edit-popup-form').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert('Failed to fetch employee data.');
        });
}


