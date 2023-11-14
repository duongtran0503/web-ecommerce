const containerCart = document.querySelector(
  " .header .header-bottom .header__bottom-right .header__viewCart-btn .container-shopcard "
);
const btnViewCart = document.querySelector(
  ".header .header-bottom .header__bottom-right .header__viewCart-btn .viewCart-btn"
);
const btnCloseViewCart = document.querySelector(
  ".header .header-bottom .header__bottom-right .header__viewCart-btn .container-shopcard .btn-close .btn"
);
btnViewCart.onclick = (e) => {
  containerCart.classList.toggle("active");
  containerCart.firstElementChild.classList.toggle("active");
};
btnCloseViewCart.onclick = () => {
  containerCart.classList.toggle("active");
  containerCart.firstElementChild.classList.toggle("active");
};
containerCart.firstElementChild.onclick = () => {
  containerCart.classList.toggle("active");
  containerCart.firstElementChild.classList.toggle("active");
};
