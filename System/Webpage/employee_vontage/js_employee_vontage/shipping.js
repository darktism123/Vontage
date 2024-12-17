// แสดงตารางข้อมูล
function renderShippingTable(orders) {
    const shippingTableBody = document.getElementById('shipping-table-body'); // Use correct table ID
    shippingTableBody.innerHTML = ''; // ล้างข้อมูลเก่า

    orders.forEach(order => {
        const row = `
            <tr>
                <td>${order.order_id}</td>
                <td>${order.customer_id}</td>
                <td>${order.order_date}</td>
                <td>${order.status}</td>
                <td>
                    <button class="update" onclick="openEditPopup('${order.order_id}', '${order.status}')">Edit</button>
                </td>
            </tr>
        `;
        shippingTableBody.insertAdjacentHTML('beforeend', row);
    });
}
