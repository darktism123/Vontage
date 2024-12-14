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
