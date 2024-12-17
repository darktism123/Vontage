document.addEventListener('DOMContentLoaded', () => {
    // ดึงองค์ประกอบที่เกี่ยวข้องจาก DOM
    const addProductButton = document.getElementById('addProductButton');
    const addProductModal = document.getElementById('addProductModal');
    const closeAddBtn = document.querySelector('#addProductModal .close');
    const cancelAddBtn = document.querySelector('#addProductModal .close-btn');
    const addProductForm = document.getElementById('addProductForm');

    const editProductModal = document.getElementById('editProductModal');
    const editProductForm = document.getElementById('editProductForm');
    const closeEditBtn = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEdit');

    // ฟังก์ชันสำหรับการแสดง Modal เพิ่มสินค้า
    addProductButton.addEventListener('click', () => {
        addProductModal.style.display = 'block';
    });

    closeAddBtn.addEventListener('click', () => addProductModal.style.display = 'none');
    cancelAddBtn.addEventListener('click', () => addProductModal.style.display = 'none');

    // ฟังก์ชันสำหรับการเปิด Modal แก้ไขสินค้า
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const row = event.target.closest('tr');
            const productId = row.dataset.productId;

            // เติมข้อมูลในฟอร์มแก้ไขจากแถวตาราง
            document.getElementById('editProductName').value = row.cells[1].innerText;
            document.getElementById('editCategory').value = row.cells[2].innerText;
            document.getElementById('editSize').value = row.cells[5].innerText;
            document.getElementById('editPrice').value = row.cells[3].innerText;
            document.getElementById('editStock').value = row.cells[4].innerText;

            editProductForm.dataset.productId = productId; // เก็บ ID สินค้า
            editProductModal.style.display = 'block';
        }
    });

    closeEditBtn.addEventListener('click', () => editProductModal.style.display = 'none');
    cancelEditBtn.addEventListener('click', () => editProductModal.style.display = 'none');

    // ส่งข้อมูล Product Form ไป Backend
    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const categoryName = document.getElementById('category').value;
        const size = document.getElementById('size').value;
        const price = document.getElementById('price').value;
        const stockQuantity = document.getElementById('stock').value;
        const productImage = document.getElementById('productImage').files[0];

        if (!productName || !categoryName || !size || !price || !stockQuantity) {
            alert('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('category_name', categoryName);
        formData.append('size', size);
        formData.append('price', price);
        formData.append('stock_quantity', stockQuantity);
        if (productImage) {
            formData.append('image_main', productImage);
        }

        try {
            const response = await fetch('/back/add-product', {
                method: 'POST',
                body: formData,
            });
            
            let result;
            try {
                result = await response.json(); // พยายามแปลง Response เป็น JSON
            } catch (error) {
                console.error('Invalid JSON response:', error);
                alert('An unexpected server error occurred.');
                return;
            }
            
            if (response.ok) {
                alert('Product added successfully!');
                addProductModal.style.display = 'none';
                fetchStockData();
            } else {
                alert(`Error: ${result.error || 'Unknown error occurred'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add product');
        }
    });
    

    // ฟังก์ชันสำหรับการแก้ไขสินค้า
    editProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const productId = editProductForm.dataset.productId;

        const data = {
            product_name: document.getElementById('editProductName').value,
            category_name: document.getElementById('editCategory').value,
            size: document.getElementById('editSize').value,
            price: document.getElementById('editPrice').value,
            stock_quantity: document.getElementById('editStock').value
        };

        try {
            const response = await fetch(`/back/update-product/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                alert('Product updated successfully!');
                editProductModal.style.display = 'none';
                fetchStockData();
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    });

    // ฟังก์ชันโหลดข้อมูลสินค้า
    async function fetchStockData() {
        try {
            const response = await fetch('/back/stock');
            const { products } = await response.json();

            const tableBody = document.getElementById('productTableBody');
            tableBody.innerHTML = ''; // ลบข้อมูลเก่าที่มีอยู่

            products.forEach(product => {
                const row = `
                    <tr data-product-id="${product.product_id}">
                        <td><img src="${product.image_main}" alt="${product.product_name}" class="card-image"></td>
                        <td>${product.product_name}</td>
                        <td>${product.category_name || '-'}</td>
                        <td>${product.price}</td>
                        <td>${product.stock_quantity}</td>
                        <td>${product.size}</td>
                        <td>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
        } catch (error) {
            console.error('Failed to fetch stock data:', error);
        }
    }
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const row = event.target.closest('tr');
            const productId = row.dataset.productId;
    
            if (confirm('Are you sure you want to delete this product?')) {
                try {
                    // ส่งคำขอ DELETE ไปยัง Backend
                    const response = await fetch(`/back/delete-product/${productId}`, {
                        method: 'DELETE',
                    });
    
                    const result = await response.json();
    
                    if (response.ok) {
                        alert('Product deleted successfully');
                        row.remove(); // ลบแถวจากตารางโดยไม่ต้องโหลดข้อมูลใหม่
                    } else {
                        alert(`Error: ${result.error}`);
                    }
                } catch (error) {
                    console.error('Error deleting product:', error);
                    alert('Failed to delete product');
                }
            }
        }
    });
        

    // โหลดข้อมูลสินค้าเมื่อหน้าเว็บโหลดเสร็จ
    fetchStockData();
});
