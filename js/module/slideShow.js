const buttonLeft = document.querySelector(
  ".banner .banner-right .buttons #left"
);
const buttonRight = document.querySelector(
  ".banner .banner-right .buttons #right"
);
const containerBanner = document.querySelector(".container-banner");
let autoNextSlide = setInterval(() => {
  buttonRight.click();
}, 3000);
const handleNextSlide = () => {
  const listSlide = document.querySelectorAll(
    ".banner .banner-right .banner-slider .slider__list .slider-item"
  );
  const slider = document.querySelector(
    ".banner .banner-right .banner-slider .slider__list "
  );
  slider.appendChild(listSlide[0]);
  containerBanner.style.backgroundColor = listSlide[0].getAttribute("bgcolor");
  clearInterval(autoNextSlide);
  autoNextSlide = setInterval(() => {
    buttonRight.click();
  }, 3000);
};
const handlePrevSlide = () => {
  const listSlide = document.querySelectorAll(
    ".banner .banner-right .banner-slider .slider__list .slider-item"
  );
  const slider = document.querySelector(
    ".banner .banner-right .banner-slider .slider__list"
  );
  slider.prepend(listSlide[listSlide.length - 1]);
  containerBanner.style.backgroundColor = listSlide[0].getAttribute("bgcolor");
  clearInterval(autoNextSlide);
  autoNextSlide = setInterval(() => {
    buttonRight.click();
  }, 3000);
};
buttonRight.addEventListener("click", handleNextSlide);
buttonLeft.addEventListener("click", handlePrevSlide);
