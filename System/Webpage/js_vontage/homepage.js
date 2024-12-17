new Swiper('.swiper', {
  loop: true, // Enable looping
  slidesPerView: 4, // Number of slides visible at a time
  spaceBetween: 20, // Space between slides
  navigation: {
    nextEl: '.swiper-button-next', // Right arrow
    prevEl: '.swiper-button-prev', // Left arrow
  },
  pagination: {
    el: '.swiper-pagination', // Pagination circles
    clickable: true, // Allow clicking on pagination bullets
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1440: {
      slidesPerView: 5,
    },
  },
});

async function fetchLatestProducts() {
  try {
      const response = await fetch('/latestProductsRoutes'); // Fetch data from backend
      const data = await response.json();

      if (response.ok) {
          const container = document.getElementById('new-arrivals-container');
          container.innerHTML = ''; // Clear existing content

          data.latestProducts.slice(0, 10).forEach(product => { // Only take the first 10 products
              const card = `
                  <div class="swiper-slide">
                      <div class="card-item">
                          <a href="/details?product_id=${product.product_id}">
                              <img src="${product.image_main}" alt="${product.product_name}" class="card-image">
                              <h2>${product.product_name}</h2>
                              <p>$${product.price}</p>
                          </a>
                      </div>
                  </div>`;
              container.innerHTML += card;
          });
      } else {
          console.error('Failed to fetch latest products:', data.message);
      }
  } catch (error) {
      console.error('Error fetching latest products:', error);
  }
}

// Function to fetch and display most sold products
async function fetchMostSoldProducts() {
  try {
      const response = await fetch('/mostSalesRoutes'); // Fetch data from backend
      const data = await response.json();

      if (response.ok) {
          const container = document.getElementById('most-sale-container');
          container.innerHTML = ''; // Clear existing content

          data.topSoldProducts.slice(0, 10).forEach(product => { // Only take the first 10 products
              const card = `
                  <div class="swiper-slide">
                      <div class="card-item">
                          <a href="/details?product_id=${product.product_id}">
                              <img src="${product.image_main}" alt="${product.product_name}" class="card-image">
                              <h2>${product.product_name}</h2>
                              <p>$${product.price}</p>
                          </a>
                      </div>
                  </div>`;
              container.innerHTML += card;
          });
      } else {
          console.error('Failed to fetch most sold products:', data.message);
      }
  } catch (error) {
      console.error('Error fetching most sold products:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch data when page is loaded
    fetchLatestProducts(); // โหลดข้อมูลสินค้าล่าสุด
    fetchMostSoldProducts(); // โหลดข้อมูลสินค้าขายดี
  
    // Initialize Swiper
    new Swiper('.swiper', {
      loop: true, // วนลูป
      slidesPerView: 4, // จำนวนการ์ดที่แสดง
      spaceBetween: 20, // ระยะห่างระหว่างการ์ด
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true, // ให้ pagination กดได้
      },
      breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 15 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
        1440: { slidesPerView: 4, spaceBetween: 25 },
      },
    });
  });
  