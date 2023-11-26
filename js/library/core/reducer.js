import DATA from "../../Data/Data.js";
import Acount from "../../Data/Acount.js";
import MessageBox from "../module/MessageBox.js";
let list = [];
for (const property in DATA) {
  list = list.concat(DATA[property]);
}
let tmp = [...list];
for (let i = 0; i < 5; i++) {
  list = list.concat(tmp);
}
localStorage.setItem("Acount", JSON.stringify(Acount));
let check = localStorage.getItem("user");
if (!check) {
  localStorage.setItem("user", JSON.stringify({}));
}
const init = {
  data: DATA,
  shopcart: localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : [],
  productList: [...list],
  searchProductList: [],

  limitPage: { start: 0, end: 49, itemperpage: 50, item: [], currentpage: 1 },
  purcharedProduct: [],
  showProduct: localStorage.getItem("showProduct")
    ? JSON.parse(localStorage.getItem("showProduct"))
    : {},
};
export default function reducer(state = init, action, args) {
  switch (action) {
    case "searchItem": {
      const keyword = args[0].trim();
      if (keyword.length === 0) {
        console.log("none");
        return {
          ...state,
        };
      }
      const result = [];
      const prevArray = state.productList;
      prevArray.forEach((product) => {
        if (product.title.toUpperCase().includes(keyword.toUpperCase())) {
          result.push(product);
        }
      });
      if (result.length === 0) {
        MessageBox("thông báo", "sản không có trong giỏ hàng", "warning");
        return {
          ...state,
        };
      } else {
        MessageBox(
          "thông báo",
          `đã tìm thất ${result.length} sản phẩm`,
          "success"
        );
      }

      const newLimitPage = {
        ...state.limitPage,

        start: 0,
        end: result.length - 1,
        currentpage: 1,
      };
      return {
        ...state,
        searchProductList: result,
        limitPage: newLimitPage,
      };
    }
    case "filterPr": {
      const newList = state.productList;
      const condition = args[0];
      if (condition === "highttolow") {
        newList.sort((p1, p2) => parseFloat(p2.price) - parseFloat(p1.price));
      } else if (condition === "lowtohight") {
        newList.sort((p1, p2) => parseFloat(p1.price) - parseFloat(p2.price));
      }
      return {
        ...state,
        searchProductList: newList,
      };
    }
    case "changePage": {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 200);

      const element = args[1];
      const pagination = [...element.parentElement.children];
      pagination.forEach((element) => {
        element.classList.remove("active");
      });
      element.classList.toggle("active");
      const itemperpage = state.limitPage.itemperpage;
      let newLimitPage = {
        ...state.limitPage,

        start: (args[0] - 1) * itemperpage,
        end: args[0] * itemperpage,
        currentpage: args[0],
      };
      let list = [];
      let start = newLimitPage.start;
      let end = newLimitPage.end;
      for (start; start <= end; start++) {
        list.push(state.productList[start]);
      }
      newLimitPage = {
        ...newLimitPage,
        item: list,
      };
      return {
        ...state,
        searchProductList: [],

        limitPage: newLimitPage,
      };
    }
    case "nextPage": {
      window.scrollTo(0, 0);

      const element = args[0];
      const pagination = [...element.parentElement.parentElement.children];
      console.log(pagination);
      let index = 1;
      pagination.forEach((element) => {
        if (element.classList.contains("active")) {
          index = +element.id;
          console.log(element);
          element.classList.remove("active");
        }
      });
      pagination[++index].classList.toggle("active");
      const itemperpage = state.limitPage.itemperpage;
      let newLimitPage = {
        ...state.limitPage,

        start: (index - 1) * itemperpage,
        end: index * itemperpage,
        currentpage: index,
      };

      let list = [];
      let start = newLimitPage.start;
      let end = newLimitPage.end;
      for (start; start <= end; start++) {
        list.push(state.productList[start]);
      }
      newLimitPage = {
        ...newLimitPage,
        item: list,
      };
      return {
        ...state,
        searchProductList: [],

        limitPage: newLimitPage,
      };
    }
    case "prevPage": {
      window.scrollTo(0, 0);

      const element = args[0];
      const pagination = [...element.parentElement.parentElement.children];
      let index = 1;
      pagination.forEach((element) => {
        if (element.classList.contains("active")) {
          index = +element.id;
          element.classList.remove("active");
        }
      });
      pagination[--index].classList.toggle("active");

      const itemperpage = state.limitPage.itemperpage;
      let newLimitPage = {
        ...state.limitPage,

        start: (index - 1) * itemperpage,
        end: index * itemperpage,
        currentpage: index,
      };
      let list = [];
      let start = newLimitPage.start;
      let end = newLimitPage.end;
      for (start; start <= end; start++) {
        list.push(state.productList[start]);
      }
      newLimitPage = {
        ...newLimitPage,
        item: list,
      };

      return {
        ...state,
        searchProductList: [],

        limitPage: newLimitPage,
      };
    }
    case "add": {
      let property = args[1];
      const newProduct = state.data[property][args[0]];
      const prevShopCart = [...state.shopcart];
      let newProductList = [...state.shopcart];
      let check = prevShopCart.some((cart) => {
        return (
          cart.id === newProduct.id && cart.nameStore === newProduct.nameStore
        );
      });
      if (check) {
        MessageBox("thông báo", "sản phẩm đã có trong giỏ hàng", "warning");
      } else {
        newProductList = [...state.shopcart, newProduct];
        MessageBox(
          "thông bảo",
          "sản phẩm đã được thêm vào giỏ hàng",
          "success"
        );
      }
      localStorage.setItem("product", JSON.stringify(newProductList));

      return {
        ...state,
        shopcart: newProductList,
      };
    }
    case "delete": {
      const templatearr = state.shopcart;
      const elementDelete = templatearr[args];
      const newProductList = templatearr.filter((e) => e !== elementDelete);
      localStorage.removeItem("product");
      localStorage.setItem("product", JSON.stringify(newProductList));
      return {
        ...state,
        shopcart: newProductList,
      };
    }
    case "addProduct": {
      const templatearr = state.shopcart;
      templatearr[args[0]].quantity++;
      const newProductList = templatearr;
      localStorage.setItem("product", JSON.stringify(newProductList));
      return {
        ...state,
        shopcart: [...state.shopcart],
      };
    }
    case "deleteProduct": {
      const templatearr = state.shopcart;
      templatearr[args[0]].quantity--;
      const newProductList = templatearr;
      localStorage.setItem("product", JSON.stringify(newProductList));
      return {
        ...state,
        shopcart: [...state.shopcart],
      };
    }
    case "show": {
      let quantity = args[0] ? args[0] : 1;
      let item = localStorage.getItem("showPIndex");
      let index = item ? JSON.parse(item) : "";
      let property;
      let Product;
      if (index) {
        property = index[0];
        Product = state.data[property][index[1]];
        Product.quantity = quantity;
        localStorage.setItem("showProduct", JSON.stringify(Product));
        console.log(Product);
      } else {
        return {
          ...state,
        };
      }

      return {
        ...state,
        showProduct: Product,
      };
    }
    case "showProductIncrease": {
      const Product = state.showProduct;
      Product.quantity++;

      localStorage.setItem("showProduct", JSON.stringify(Product));

      return {
        ...state,
        showProduct: Product,
      };
    }
    case "showProductDecrease": {
      const Product = state.showProduct;
      Product.quantity--;

      localStorage.setItem("showProduct", JSON.stringify(Product));

      return {
        ...state,
        showProduct: Product,
      };
    }
    case "addProductShow": {
      const item = JSON.parse(args[0]);
      const { prop, ...product } = item;
      const newProduct = [...state.shopcart, product];
      localStorage.setItem("product", JSON.stringify(newProduct));
      return {
        ...state,
        shopcart: newProduct,
      };
    }
    case "payment": {
      let stateUser = JSON.parse(localStorage.getItem("state"));
      if (!stateUser) {
        MessageBox("Thông báo", "Hãy đang nhập để thanh toán đơn hàng");
        return {
          ...state,
        };
      }

      let buyProduct = [...state.shopcart];
      if (buyProduct.length === 0) {
        MessageBox("Thông báo", "không còn đơn hàng nào trong giở hàng");
        return {
          ...state,
        };
      }
      buyProduct = buyProduct.map((item) => {
        let temp = item;
        let now = new Date();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let time = `${hours}:${minutes} ngày ${day} tháng ${month}`;
        return {
          ...temp,
          date: time,
        };
      });
      let check = localStorage.getItem("buyProduct")
        ? JSON.parse(localStorage.getItem("buyProduct"))
        : [];

      buyProduct = [...buyProduct, ...check];
      localStorage.setItem("buyProduct", JSON.stringify(buyProduct));
      localStorage.removeItem("product");
      let user = JSON.parse(localStorage.getItem("user"));
      let item = localStorage.getItem("order");
      let order = item ? JSON.parse(item) : [];
      order = [
        ...order,
        {
          user,
          buyProduct,
        },
      ];
      localStorage.setItem("order", JSON.stringify(order));
      MessageBox("Thông báo", "thanh toán thành công");
      return {
        ...state,
        shopcart: [],
        purcharedProduct: buyProduct,
      };
    }
    case "login": {
      let check = false;
      let data = args[0];
      Acount.forEach((value) => {
        if (
          value.userName === data.userName &&
          value.passWorld === data.passWorld
        ) {
          check = true;
          data = value;
        }
      });
      if (check) {
        localStorage.setItem("user", JSON.stringify(data));
        const state = { state: 404, mess: 1 };
        localStorage.setItem("state", JSON.stringify(state));
        const url = window.location.href;
        if (data.permisson === "customer") {
          window.location.href = url;
        } else {
          window.location.href = "./page/AdminPage.html";
        }
      }
      return {
        ...state,
      };
    }
    case "logout": {
      localStorage.removeItem("user");
      localStorage.removeItem("state");
      localStorage.removeItem("buyProduct");
      window.location.href = "../index.html";
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
