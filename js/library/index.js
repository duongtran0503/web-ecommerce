import { attach } from "./core/store.js";
import App from "./App.js";
import { fuc1, fuc2 } from "./components/Shop/shopcart.js";
import Home from "./components/Home/Home.js";
import { slideOfBanner, slideOfContent } from "./module/slideShow.js";

const contentHome = document.getElementsByClassName("l-c-p-w-r");
const phoneHeaderBtn = document.getElementById("ele-header-menu-hdmn"); // header
const phoneHeaderMenu = document.getElementById("ele-phone-menu-hdmn");
const phoneHeaderCloseMenu = document.getElementById("ele-menu-btn-close-hdmn"); // header
const phoneHeaderOptionMenuOne = document.getElementById(
  "ele-product-menu-hdmn"
); // header
const phoneHeaderOptionMenuTow = document.getElementById("ele-main-menu-hdmn"); // header
const phoneHeaderMenuOptionOne = document.getElementById(
  "ele-navigation-1-hdmn"
); // header
const phoneHeaderMenuOptionTow = document.getElementById(
  "ele-navigation-2-hdmn"
); // header
const BannerHomePage = document.getElementById("ele-banner-home-bn");
const MainHomePage = document.getElementById("ele-main-home-mh");
const shopBtnOpenShopCart = document.getElementById(
  "ele-shop-btn-open-shopcart"
); //shop page
const shopContainerShopCart = document.getElementById(
  "ele-container-shopcart-shoppage"
); //shop page
const shopBtnCloseShopCart = document.getElementById(
  "ele-button-close-shopcart"
);
const root = document.getElementById("root-product"); //shop page
const shopShowProduct = document.getElementById("ele-show-product-shopcart"); //shop page
const viewCartE = document.getElementById("ViewCart"); //shop page
//HOme
window.addEventListener("resize", function () {
  if (this.innerWidth > 1023) {
    phoneHeaderMenu.style.display = "none";
  }
});
if (phoneHeaderBtn) {
  phoneHeaderBtn.onclick = function () {
    phoneHeaderMenu.style.display = "block";
  };
  phoneHeaderCloseMenu.onclick = function () {
    phoneHeaderMenu.style.display = "none";
  };
  phoneHeaderOptionMenuOne.onclick = function () {
    phoneHeaderMenuOptionOne.style.display = "block";
    phoneHeaderMenuOptionTow.style.display = "none";
  };
  phoneHeaderOptionMenuTow.onclick = function () {
    phoneHeaderMenuOptionOne.style.display = "none";
    phoneHeaderMenuOptionTow.style.display = "block";
  };
}
if (BannerHomePage) {
  slideOfBanner(
    ".banner .banner-right .buttons #left",
    ".banner .banner-right .buttons #right",
    ".container-banner",
    ".banner .banner-right .banner-slider .slider__list .slider-item",
    ".banner .banner-right .banner-slider .slider__list "
  );
}
if (MainHomePage) {
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
}
// shop
if (shopBtnOpenShopCart) {
  shopBtnOpenShopCart.onclick = function () {
    shopContainerShopCart.classList.toggle("active");
    shopContainerShopCart.firstElementChild.classList.toggle("active");
  };
  shopBtnCloseShopCart.onclick = function () {
    shopContainerShopCart.classList.toggle("active");
    shopContainerShopCart.firstElementChild.classList.toggle("active");
  };
  shopContainerShopCart.firstElementChild.onclick = function () {
    shopContainerShopCart.classList.toggle("active");
    shopContainerShopCart.firstElementChild.classList.toggle("active");
  };
}
if (root) {
  attach(App, root);
}
if (shopShowProduct) {
  attach(fuc1, shopShowProduct);
}
if (viewCartE) {
  attach(fuc2, viewCartE);
}
if (contentHome) {
  [...contentHome].forEach((element) => {
    attach(Home, element);
  });
}
