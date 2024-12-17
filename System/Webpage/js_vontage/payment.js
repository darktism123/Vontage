window.onload = () => {
    // Display QR Payment by default
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
        // Remove 'active' class from all buttons
        paymentButtons.forEach((btn) => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        button.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});

function renderCartItems() {
    const cartContainer = document.getElementById('cart-items-body');
    cartContainer.innerHTML = ''; // Clear existing content

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let subtotal = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="4">Your cart is empty!</td></tr>';
        return;
    }

    cartItems.forEach(item => {
        const cartItem = document.createElement('tr');
        cartItem.innerHTML = `
            <td class="item-image">
                <img src="${item.image_main || 'image_vontage/default_image.png'}" alt="${item.name}">
            </td>
            <td>
                <div class="item_name">
                    <h3><strong>${item.name}</strong></h3>
                    <h5>Size: ${item.size}</h5>
                </div>
            </td>
            <td class="quantity">${item.quantity || 1}</td>
            <td class="price">$${parseFloat(item.price.replace('$', '')).toFixed(2)}</td>
        `;
        cartContainer.appendChild(cartItem);

        // Update subtotal
        subtotal += (parseFloat(item.price.replace('$', '')) || 0) * (item.quantity || 1);
    });

    // Display the total
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td class="total" colspan="3"><h3>TOTAL</h3></td>
        <td class="total_price">$${subtotal.toFixed(2)}</td>
    `;
    cartContainer.appendChild(totalRow);
}

function showQR() {
    document.getElementById('QR_payment').style.display = 'block';
    document.getElementById('destination').style.display = 'none';
}

function showDestination() {
    document.getElementById('QR_payment').style.display = 'none';
    document.getElementById('destination').style.display = 'block';
}

// Function to handle the submission and clear cart
function submitOrder() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if there are items in the cart
    if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    fetch('/orderRoutes/createOrders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems })
    })
    .then(response => response.json())
    .then(data => {
        // Clear the cart from localStorage
        localStorage.removeItem('cartItems');

        // Re-render the cart (which will now be empty)
        renderCartItems();

        // Show a message and redirect
        alert('Thank you for your purchase! Your order has been placed.');
        window.location.href = '/'; // Redirect to homepage or any other page
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error processing your order. Please try again.');
    });
}

