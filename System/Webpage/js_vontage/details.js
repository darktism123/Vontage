let slideIndex = 1;

window.onload = function() {
  showSlides(slideIndex); // Ensure the first slide is shown when the page loads
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

document.addEventListener("DOMContentLoaded", function () {
  const quantityValue = document.querySelector(".quantity-value");
  const minusBtn = document.querySelectorAll(".quantity-btn")[0];
  const plusBtn = document.querySelectorAll(".quantity-btn")[1];

  minusBtn.addEventListener("click", function () {
      let currentValue = parseInt(quantityValue.textContent);
      if (currentValue > 1) {
          quantityValue.textContent = currentValue - 1;
      }
  });

  plusBtn.addEventListener("click", function () {
      let currentValue = parseInt(quantityValue.textContent);
      if (currentValue < 99) {
        quantityValue.textContent = currentValue + 1;
    }
  });
});

