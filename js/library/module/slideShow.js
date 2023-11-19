function slideOfBanner(
  buttonLefts,
  buttonRights,
  containerBanners,
  listSlides,
  sliders
) {
  const buttonLeft = document.querySelector(buttonLefts);
  const buttonRight = document.querySelector(buttonRights);
  const containerBanner = document.querySelector(containerBanners);
  let autoNextSlide = setInterval(() => {
    buttonRight.click();
  }, 5000);
  const handleNextSlide = () => {
    const listSlide = document.querySelectorAll(listSlides);
    const slider = document.querySelector(sliders);
    slider.appendChild(listSlide[0]);
    containerBanner.style.backgroundColor =
      listSlide[0].getAttribute("bgcolor");
    clearInterval(autoNextSlide);
    autoNextSlide = setInterval(() => {
      buttonRight.click();
    }, 5000);
  };
  const handlePrevSlide = () => {
    const listSlide = document.querySelectorAll(listSlides);
    const slider = document.querySelector(sliders);
    slider.prepend(listSlide[listSlide.length - 1]);
    containerBanner.style.backgroundColor =
      listSlide[0].getAttribute("bgcolor");
    clearInterval(autoNextSlide);
    autoNextSlide = setInterval(() => {
      buttonRight.click();
    }, 5000);
  };
  buttonRight.addEventListener("click", handleNextSlide);
  buttonLeft.addEventListener("click", handlePrevSlide);
}

//  slide  of content

function slideOfContent(elementContent, elementButtonLeft, elementButtonRight) {
  const content = document.getElementById(elementContent);
  const contentBtnLeft = document.getElementById(elementButtonLeft);
  const contentBtnRight = document.getElementById(elementButtonRight);
  const widthOfContent = 950;
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
export { slideOfBanner, slideOfContent };
