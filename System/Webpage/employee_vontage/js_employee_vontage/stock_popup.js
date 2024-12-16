document.addEventListener('DOMContentLoaded', () => {
    const addProductButton = document.getElementById('addProductButton');
    const addProductModal = document.getElementById('addProductModal');
    const closeBtn = document.querySelector('#addProductModal .close');
    const cancelBtn = document.querySelector('#addProductModal .close-btn');
    const addProductForm = document.getElementById('addProductForm');

    // เปิด Modal
    addProductButton?.addEventListener('click', () => {
        addProductModal.style.display = 'block';
    });

    // ปิด Modal
    closeBtn?.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    cancelBtn?.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === addProductModal) {
            addProductModal.style.display = 'none';
        }
    });

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

            const result = await response.json();
            if (response.ok) {
                alert('Product added successfully!');
                addProductModal.style.display = 'none';
                fetchStockData(); // โหลดข้อมูลใหม่
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add product');
        }
    });

    // โหลดข้อมูลเมื่อหน้าเว็บพร้อมใช้งาน
    async function fetchStockData() {
        try {
            const response = await fetch('/back/stock');
            const { products } = await response.json();

            console.log('Products:', products);
            // Populate product table (ตามที่ต้องการ)
        } catch (error) {
            console.error('Failed to fetch stock data:', error);
        }
    }

    fetchStockData();
});
