// Fetch Employee Data and Populate Table
fetch('/back/employee') // Replace '/api/employee' with the actual API route
    .then(response => response.json())
    .then(data => {
        console.log(data); // Debugging: Check the employee data
        const tableBody = document.getElementById('employee-data');
        if (tableBody) {
            tableBody.innerHTML = ''; // Clear any existing data
            data.forEach(employee => {
                const row = `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.firstName}</td>
                        <td>${employee.lastName}</td>
                        <td>${employee.email}</td>
                        <td>${employee.phone}</td>
                        <td>${employee.department}</td>
                    </tr>
                `;
                tableBody.innerHTML += row; // Append row to table
            });
        } else {
            console.error('Element with id "employee-data" not found.');
        }
    })
    .catch(error => console.error('Error fetching employee data:', error));

// Fetch Revenue Data and Render Chart
// Fetch Revenue Data and Render Chart
fetch('/back/graph')
    .then(response => response.json())
    .then(responseData => {
        if (responseData.success && Array.isArray(responseData.data)) {
            const data = responseData.data;
            const labels = data.map(item => item.date.slice(5)); // MM-DD
            const revenues = data.map(item => parseFloat(item.revenue)); // ตัวเลข

            const ctx = document.getElementById('revenueChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels, // ใช้ labels เป็นแกน x
                    datasets: [{
                        label: 'Revenue',
                        data: revenues,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)', // สีของกราฟ
                        borderColor: 'rgba(75, 192, 192, 1)', // สีขอบ
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true, // แสดงชื่อแกน x
                                text: 'Date (MM-DD)', // ชื่อแกน x
                            },
                            ticks: {
                                maxRotation: 45, // หมุน labels
                                minRotation: 0
                            }
                        },
                        y: {
                            title: {
                                display: true, // แสดงชื่อแกน y
                                text: 'Revenue (USD)' // ชื่อแกน y
                            },
                            beginAtZero: true // เริ่มที่ 0
                        }
                    }
                }
            });
        } else {
            console.error('Invalid API Response:', responseData);
        }
    })
    .catch(error => console.error('Error fetching graph data:', error));
