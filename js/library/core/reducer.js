import DATA from "../../Data/Data.js";
import MessageBox from "../module/MessageBox.js";
let list = [];
for (const property in DATA) {
  list = list.concat(DATA[property]);
}
let tmp = [...list];
for (let i = 0; i < 5; i++) {
  list = list.concat(tmp);
}
console.log(list);
const init = {
  data: DATA,
  shopcart: localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : [],
  productList: [...list],
  searchProductList: [],

  limitPage: { start: 0, end: 49, itemperpage: 50, item: [], currentpage: 1 },
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
    case "changePage": {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 200);

      console.log(args[1]);
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
      console.log(element);
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
      console.log(newProduct);
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
      localStorage.removeItem("product");
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
      localStorage.removeItem("product");
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
      localStorage.removeItem("product");
      localStorage.setItem("product", JSON.stringify(newProductList));
      return {
        ...state,
        shopcart: [...state.shopcart],
      };
    }
    case "show": {
      let property = args[1];

      const Product = state.data[property][args[0]];
      console.log(Product);

      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
