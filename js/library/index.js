import { attach } from "./core/store.js";
import { fuc1, fuc2 } from "./components/Shop/shopcart.js";
import Home from "./components/Home/Home.js";
import { slideOfBanner, slideOfContent } from "./module/slideShow.js";
import countDow from "./module/countDow.js";
import productList from "./components/Shop/productList.js";
import { pagNext, pagPrev } from "./components/Shop/pagination.js";
import HandleEvent from "./middleware/HandleEvent.js";
import CountProduct from "./components/build/CountProduct.js";
import ShowLaptop from "./components/Home/ShowLaptop.js";
import ShowPhone from "./components/Home/ShowPhone.js";
import ShowTivi from "./components/Home/ShowTivi.js";
import ShowKey from "./components/Home/ShowKey.js";
import ShowWatch from "./components/Home/ShowWatch.js";
const globalMessageBox = document.getElementById("messageBox");
const globalCountProductHome = document.getElementById(
  "ele-countproductincart-Home"
);
const globalCountProductShop = document.getElementById(
  "ele-countproductincart-Shop"
);
const globalInputSearch = document.getElementById("ele-input-heađer-global"); //header
//HOne page start get element wrapper
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
const HomeShowPhone = document.getElementById("ele-listcardproduct-phone");
const HomeShowLaptop = document.getElementById("ele-listcardproduct-lap");
const HomeShowTivi = document.getElementById("list-card-product-mouse");
const HomeShowWatch = document.getElementById("list-card-product-watch");
const HomeShowKey = document.getElementById("list-card-product-key");
const HomwShowTable = document.getElementById("list-card-product-tablet");
//shop page start get element wrapper
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
const shopShowProductList = document.getElementById(
  "ele-show-productList-shopPage"
);
const shopPaginationBtnPrev = document.getElementById(
  "ele-pagination-prev-shopPage"
);
const shopPaginationBtnNext = document.getElementById(
  "ele-pagination-next-shopPage"
);
const shopNavBarMainLeftInput = document.getElementById(
  "ele-input-navbar-main-left-shopPage"
);
// global
export { globalMessageBox };
if (globalCountProductHome) {
  attach(CountProduct, globalCountProductHome);
  console.log(4);
}
if (globalCountProductShop) {
  attach(CountProduct, globalCountProductShop);
  console.log(4);
}
//HOme
countDow(
  "ele-day-Home",
  "ele-hour-Home",
  "ele-minutes-Home",
  "ele-second-Home"
);
countDow(
  "ele-sale-day-Home",
  "ele-sale-hour-Home",
  "ele-sale-minutes-Home",
  "ele-sale-second-Home"
);

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
  attach(ShowPhone, HomeShowPhone);
  attach(ShowLaptop, HomeShowLaptop);
  attach(ShowLaptop, HomeShowWatch);
  attach(ShowWatch, HomwShowTable);
  attach(ShowTivi, HomeShowTivi);
  attach(ShowKey, HomeShowKey);
  slideOfContent(
    "ele-listcardproduct-lap",
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
// Shop Page
if (shopShowProductList) {
  attach(productList, shopShowProductList);
}
if (shopPaginationBtnPrev) {
  attach(pagPrev, shopPaginationBtnPrev);
}
if (shopPaginationBtnNext) {
  attach(pagNext, shopPaginationBtnNext);
}
if (shopShowProduct) {
  attach(fuc1, shopShowProduct);
}

if (globalInputSearch) {
  globalInputSearch.onfocus = () => {
    window.scrollTo(0, 0);
  };

  const pagi = document.getElementById("ele-pagination");
  const btnback = document.getElementById("ele-pagination-ch");
  const handleKeyDown = (e) => {
    window.scrollTo(0, 0);
    if (e.keyCode === 13) {
      if (pagi) {
        pagi.classList.add("active");

        btnback.parentElement.classList.remove("active");
      }
      dispatch("searchItem", globalInputSearch.value);
      globalInputSearch.value = "";
      globalInputSearch.blur();
    }
  };
  if (btnback) {
    btnback.onclick = function () {
      pagi.classList.remove("active");
      this.parentElement.classList.add("active");
      dispatch("changePage", 1, this);
    };
  }
  HandleEvent("keyup", handleKeyDown, globalInputSearch);
}
if (shopNavBarMainLeftInput) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch("searchItem", shopNavBarMainLeftInput.value);
      shopNavBarMainLeftInput.value = "";
      shopNavBarMainLeftInput.blur();
    }
  };
  HandleEvent("keydown", handleKeyDown, shopNavBarMainLeftInput);
}
if (viewCartE) {
  attach(fuc2, viewCartE);
}
if (contentHome) {
  [...contentHome].forEach((element) => {
    attach(Home, element);
  });
}
