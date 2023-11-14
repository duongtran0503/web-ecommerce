const button = document.querySelector(
  ".header .header-bottom .header__bottom-right .header__buttons .account"
);
const form = document.querySelector(
  ".header .header-bottom .header__bottom-right .header__buttons .from-wrap "
);
const handleClick = () => {
  form.classList.toggle("active");
};
button.addEventListener("click", handleClick);
