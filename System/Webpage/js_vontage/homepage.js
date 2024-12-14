document.addEventListener('DOMContentLoaded', function () {
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
          640: {
              slidesPerView: 1, // หน้าจอเล็กแสดง 1 การ์ด
              spaceBetween: 10,
          },
          768: {
              slidesPerView: 2, // หน้าจอขนาดกลางแสดง 2 การ์ด
              spaceBetween: 15,
          },
          1024: {
              slidesPerView: 3, // หน้าจอใหญ่แสดง 3 การ์ด
              spaceBetween: 20,
          },
          1440: {
              slidesPerView: 4, // หน้าจอใหญ่มากแสดง 4 การ์ด
              spaceBetween: 25,
          },
      },
  });
});