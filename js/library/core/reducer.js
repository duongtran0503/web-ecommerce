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

let check = localStorage.getItem("user");
if (!check) {
  localStorage.setItem("user", JSON.stringify({}));
}
const checked = check ? JSON.parse(check) : false;
if (!checked) {
  localStorage.setItem("Account", JSON.stringify(Acount));
  localStorage.setItem("data", JSON.stringify(tmp));
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
      const newList =
        state.searchProductList.length !== 0
          ? state.searchProductList
          : state.productList;
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
      let index = 1;
      pagination.forEach((element) => {
        if (element.classList.contains("active")) {
          index = +element.id;
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
      const shopcart = state.shopcart;
      let check = shopcart.some((p) => {
        return item.nameStore === p.nameStore && item.id === p.id;
      });
      let newProduct = [...shopcart, item];
      if (check) {
        newProduct = shopcart.map((p) => {
          if (item.nameStore === p.nameStore && item.id === p.id) {
            p.quantity += item.quantity;
          }
          return {
            ...p,
          };
        });
      }
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
      let user__detail = args[0];
      let order_detail = buyProduct.map((product) => {
        return {
          ...product,
          ...user,
          check: false,
          user__detail,
        };
      });
      const newOrder = buyProduct.map((p) => {
        return {
          ...p,
          check: false,
        };
      });
      user.order = [...newOrder, ...user.order];
      order = [...order, order_detail];
      localStorage.setItem("user", JSON.stringify(user));
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
      const Acounts = JSON.parse(localStorage.getItem("Account"));
      let item = Acounts.find((value) => data.userName === value.userName);
      if (!item) {
        MessageBox("Thông báo", "tên đăng nhập hoặc mật khẩu sai", "warning");
        return {
          ...state,
        };
      } else if (item.passWorld !== data.passWorld) {
        MessageBox("Thông báo", "mật khẩu không đúng", "warning");
        return {
          ...state,
        };
      } else {
        check = true;
        data = item;
      }
      if (check) {
        localStorage.setItem("user", JSON.stringify(data));
        const state = { state: 0, mess: 1 };

        const url = window.location.href;
        if (data.permisson === "customer") {
          state.state = 404;
          localStorage.setItem("state", JSON.stringify(state));
          window.location.href = url;
        } else if (data.permisson === "admin") {
          state.state = 101;
          localStorage.setItem("state", JSON.stringify(state));

          if (window.location.href.includes("page")) {
            window.location.href = "./AdminPage.html";
          } else {
            window.location.href = "./page/AdminPage.html";
          }
        }
      }
      return {
        ...state,
      };
    }
    case "logout": {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.permisson === "admin") {
        localStorage.setItem("user", JSON.stringify({}));
        localStorage.removeItem("state");
        localStorage.removeItem("buyProduct");
        window.location.href = "../index.html";
        return {
          ...state,
        };
      }
      const data_Acount = JSON.parse(localStorage.getItem("Account"));
      const Update_data = data_Acount.map((acount) => {
        if (acount.userName === user.userName) {
          let newOrder = user.order;
          user.order = [...acount.order, ...newOrder];
          return {
            ...user,
          };
        }
        return {
          ...acount,
        };
      });

      localStorage.setItem("Account", JSON.stringify(Update_data));

      localStorage.setItem("user", JSON.stringify({}));
      localStorage.removeItem("state");
      localStorage.removeItem("buyProduct");
      window.location.href = "../index.html";
      return {
        ...state,
      };
    }
    case "admin/checkOrder": {
      const [data, index, stote] = args;
      const Account = JSON.parse(localStorage.getItem("Account"));
      let item = Account.find((value) => data === value.userName);
      let checked_order = item.order.map((p) => {
        if (p.id === index && p.nameStore === stote) {
          return {
            ...p,
            check: true,
          };
        }
        return {
          ...p,
        };
      });
      const Update_data = Account.map((ac) => {
        if (ac.userName === data) {
          return {
            ...ac,
            order: checked_order,
          };
        }
        return ac;
      });
      localStorage.setItem("Account", JSON.stringify(Update_data));
      return {
        ...state,
      };
    }
    case "admin/shopSearchInput": {
      const keyword = args[0].trim();
      if (keyword.length === 0) {
        return {
          ...state,
        };
      }
      if (keyword === "@previous") {
        return {
          ...state,
          searchProductList: [],
        };
      }
      const result = [];
      let prevArray = [];
      const store = state.data;
      for (const property in store) {
        prevArray = prevArray.concat(store[property]);
      }
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
      return {
        ...state,
        searchProductList: result,
      };
    }
    case "admin/deleteProduct": {
      let store = state.data;
      const p_D_store = args[0];
      const p_D_index = args[1];
      const newStore = store[`${p_D_store}`].filter((p) => p.id !== +p_D_index);
      store[`${p_D_store}`] = newStore;
      MessageBox("thông báo", "xóa sản phẩm thành  công");
      return {
        ...state,
        data: store,
        searchProductList: [],
      };
    }
    case "admin/shopAddProdcut": {
      let store = state.data;

      const prodcut = {
        id: "",
        nameStore: "",
        quantity: 1,
        productType: "",
        title: "",
        image: "",
        price: 7490000,
        detail: " ",
        trademark: " ",
      };
      const item = args[0];
      prodcut.title = item.name;
      if (item.type === "man_hinh") {
        prodcut.nameStore = "monitor";
        prodcut.productType = item.type;
      } else {
        prodcut.nameStore = item.type;
        prodcut.productType = item.type;
      }
      prodcut.image = item.image[0].name;
      prodcut.price = +item.price;
      if (item.describe) {
        prodcut.detail = item.describe;
      }

      let newStore = store[`${prodcut.nameStore}`];
      prodcut.id = newStore.length;
      newStore = [...newStore, prodcut];
      store[`${prodcut.nameStore}`] = newStore;
      MessageBox("thông báo", "thêm sản phẩm thành  công");

      return {
        ...state,
        data: store,
        searchProductList: [],
      };
    }
    case "admin/shopEditProdcut": {
      let store = state.data;
      const p_D_index = args[2];
      const p_D_store = args[1];
      const prevProduct = store[`${p_D_store}`][+p_D_index];
      const prodcut = {
        id: "",
        nameStore: "",
        quantity: 1,
        productType: "",
        title: "",
        image: "",
        price: 7490000,
        detail: " ",
        trademark: " ",
      };
      const item = args[0];
      prodcut.title = item.name;
      if (item.type === "man_hinh") {
        prodcut.nameStore = "monitor";
        prodcut.productType = item.type;
      } else {
        prodcut.nameStore = item.type;
        prodcut.productType = item.type;
      }
      if (item.describe.length === 0) {
        prodcut.detail = prevProduct.detail;
      } else {
        prodcut.detail = item.describe;
      }
      if (item.image.length === 0) {
        prodcut.image = prevProduct.image;
      } else {
        prodcut.image = item.image[0].name;
      }
      prodcut.price = item.price;
      prodcut.id = prevProduct.id;
      prodcut.trademark = prevProduct.trademark;
      store[`${p_D_store}`][+p_D_index] = prodcut;
      MessageBox("thông báo", "sửa sản phẩm thành  công");

      return {
        ...state,
        data: store,
        searchProductList: [],
      };
    }
    case "customer/register": {
      let item = localStorage.getItem("Account");
      let Account = item ? JSON.parse(item) : [];
      const data = args[0];
      const user = {
        userName: "",
        passWorld: "",
        permisson: "customer",
        name: "",
        order: [],
      };
      user.name = data.name;
      user.userName = data.email;
      user.passWorld = data.password;
      Account = [...Account, user];
      localStorage.setItem("Account", JSON.stringify(Account));
      window.location.href = "../index.html";
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
