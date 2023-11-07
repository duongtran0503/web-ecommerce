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

//  slide  of content
function slideOfContent(elementContent, elementButtonLeft, elementButtonRight) {
  const content = document.getElementById(elementContent);
  const contentBtnLeft = document.getElementById(elementButtonLeft);
  const contentBtnRight = document.getElementById(elementButtonRight);
  const widthOfContent = content.offsetWidth;
  if (window.innerWidth > 1024) {
    content.addEventListener("wheel", function (e) {
      e.preventDefault();
      this.scrollLeft += e.deltaY;
    });
  }

  let autonext = setInterval(() => {
    if (content.scrollLeft > widthOfContent - 100) {
      content.scrollLeft = 0;
      return;
    }
    contentBtnRight.click();
  }, 5000);
  contentBtnLeft.addEventListener("click", () => {
    if (content.scrollLeft > 300) {
      content.scrollLeft -= 235;
    } else {
      content.scrollLeft = 0;
    }
  });

  contentBtnRight.addEventListener("click", () => {
    content.scrollLeft += 234;
    let maxwidthScroll = widthOfContent - 230;
    if (content.scrollLeft > maxwidthScroll) {
      content.scrollLeft += 1000;
    }
    clearInterval(autonext);
    autonext = setInterval(() => {
      if (content.scrollLeft > widthOfContent - 100) {
        content.scrollLeft = 0;
        return;
      }
      contentBtnRight.click();
    }, 5000);
  });
  content.addEventListener("scroll", () => {
    let maxwidthScroll = widthOfContent - 150;
    if (content.scrollLeft >= maxwidthScroll) {
      contentBtnRight.style.display = "none";
    } else {
      contentBtnRight.style.display = "block";
    }
    if (content.scrollLeft < 200) {
      contentBtnLeft.style.display = "none";
    } else {
      contentBtnLeft.style.display = "block";
    }
  });
}
slideOfContent(
  "listcardproduct-lap",
  "content-product-buttonleft-lap",
  "content-product-buttonright-lap"
);
slideOfContent(
  "list-card-product-key",
  "content-product-buttonleft-key",
  "content-product-buttonright-key"
);
slideOfContent(
  "list-card-product-watch",
  "content-product-buttonleft-watch",
  "content-product-buttonright-watch"
);
slideOfContent(
  "list-card-product-mouse",
  "content-product-buttonleft-mouse",
  "content-product-buttonright-mouse"
);
slideOfContent(
  "list-card-product-tablet",
  "content-product-buttonleft-tablet",
  "content-product-buttonright-tablet"
);
