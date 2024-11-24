new Swiper('.card-warpper', {
    loop: true,
    spaceBetween: 30,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    breakpoints: {
        0:{
            sliderPerViwe: 1 
        },
        768:{
            sliderPerViwe: 2
        },
        1024:{
            sliderPerViwe: 3
        },
    }
    
  });