fetch('/back/employee')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch employee data');
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById('employee-data');
        // Clear any existing rows
        tableBody.innerHTML = '';

        if (data.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6">No data available</td>';
            tableBody.appendChild(row);
        } else {
            data.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.employee_id}</td>
                    <td>${employee.first_name}</td>
                    <td>${employee.last_name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.department_id}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    })
    .catch(err => {
        console.error('Error fetching employee data:', err);
    });
