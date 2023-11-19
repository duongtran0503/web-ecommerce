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
import MessageBox from "./module/MessageBox.js";
import purcharedProduct from "./components/Shop/purchasedProduct.js";
window.MessageBox = MessageBox;
const globalMessageBox = document.getElementById("messageBox");
const globalCountProductHome = document.getElementById(
  "ele-countproductincart-Home"
);
const globalCountProductShop = document.getElementById(
  "ele-countproductincart-Shop"
);
const globalInputSearch = document.getElementById("ele-input-heađer-global"); //header
const globalbtnSearch = document.getElementById("ele-btn-header-search"); //header
const globalTotailCont = document.getElementById("totail-cont");
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
const phoneInputsearch = document.getElementById("ele-input-phone-search");
const phoneBtnSearch = document.getElementById("ele-btn-phone-search");
const HomebtnOpenAcount = document.getElementById("ele-btn-open-account");
const HomeMainAcount = document.getElementById("ele-accout");
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
const shopShowProduct = document.getElementById("ele-show-product-shopcart"); //shop page
const viewCartE = document.getElementById("ele-viewCart-cartpage"); //shop page
const shopShowProductList = document.getElementById(
  "ele-show-productList-shopPage"
);
const shopPagination = document.getElementById("ele-pagination");
const shopPaginationBtnPrev = document.getElementById(
  "ele-pagination-prev-shopPage"
);
const shopPaginationBtnNext = document.getElementById(
  "ele-pagination-next-shopPage"
);
//  viewCart
const ViewCartHis = document.getElementById("ele-history-shop");
// global
export { globalMessageBox, globalTotailCont };
if (globalCountProductHome) {
  attach(CountProduct, globalCountProductHome);
}
if (globalCountProductShop) {
  attach(CountProduct, globalCountProductShop);
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
if (HomebtnOpenAcount) {
  HomebtnOpenAcount.onclick = () => {
    HomebtnOpenAcount.classList.toggle("active");
    HomeMainAcount.classList.toggle("active");
  };
}

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
  if (phoneInputsearch) {
    const pagi = document.getElementById("ele-pagination");
    const btnback = document.getElementById("ele-pagination-ch");
    if (btnback) {
      btnback.onclick = function () {
        pagi.classList.remove("active");
        this.parentElement.classList.add("active");
        dispatch("changePage", 1, this);
      };
    }
    phoneBtnSearch.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(
        window.location.href.includes("index.html") &&
          phoneInputsearch.value.length !== 0
      );
      if (
        window.location.href.includes("index.html") &&
        phoneInputsearch.value.length !== 0
      ) {
        localStorage.setItem("searchKey", phoneInputsearch.value);
        window.location.href = "./page/Shop.html";
      }
      if (pagi) {
        pagi.classList.add("active");

        btnback.parentElement.classList.remove("active");
      }
      dispatch("searchItem", phoneInputsearch.value);
      phoneInputsearch.value = "";
      phoneInputsearch.blur();
      phoneHeaderMenu.style.display = "none";
    };
    let check = localStorage.getItem("searchKey")
      ? localStorage.getItem("searchKey")
      : "";
    if (phoneInputsearch.value.length === 0 && check.length !== 0) {
      dispatch("searchItem", check);
      localStorage.setItem("searchKey", "");
      phoneHeaderMenu.style.display = "none";

      if (pagi) {
        pagi.classList.add("active");

        btnback.parentElement.classList.remove("active");
      }
    }
  }
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
  let searchKey = "";
  globalInputSearch.onfocus = () => {
    window.scrollTo(0, 0);
  };
  globalbtnSearch.onclick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    searchKey = globalInputSearch.value;
    if (
      window.location.href.includes("index.html") &&
      globalInputSearch.value.length !== 0
    ) {
      localStorage.setItem("searchKey", globalInputSearch.value);
      window.location.href = "./page/Shop.html";
    }

    dispatch("searchItem", searchKey);
    searchKey = "";
    globalInputSearch.value = "";
    globalInputSearch.blur();
  };

  const pagi = document.getElementById("ele-pagination");
  const btnback = document.getElementById("ele-pagination-ch");
  const handleKeyDown = (e) => {
    window.scrollTo(0, 0);
    if (e.keyCode === 13) {
      if (
        window.location.href.includes("index.html") &&
        globalInputSearch.value.length !== 0
      ) {
        localStorage.setItem("searchKey", globalInputSearch.value);
        window.location.href = "./page/Shop.html";
      }
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
  HandleEvent("keydown", handleKeyDown, globalInputSearch);
  let check = localStorage.getItem("searchKey")
    ? localStorage.getItem("searchKey")
    : "";
  console.log(check);
  if (globalInputSearch.value.length === 0 && check.length !== 0) {
    dispatch("searchItem", check);
    localStorage.setItem("searchKey", "");
  }
}

if (viewCartE) {
  attach(fuc2, viewCartE);
}
if (contentHome) {
  [...contentHome].forEach((element) => {
    attach(Home, element);
  });
}
// viewCart
if (ViewCartHis) {
  attach(purcharedProduct, ViewCartHis);
}
