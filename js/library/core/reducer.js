import product from "../../Data/Data.js";
const init = {
  data: product,
  shopcart: localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : [],
};
export default function reducer(state = init, action, args) {
  switch (action) {
    case "add": {
      let property = args[1];
      const newProduct = state.data[property][args[0]];
      const prevShopCart = [...state.shopcart];
      let newProductList = [...state.shopcart];
      let check = prevShopCart.some((cart) => {
        return cart.id === newProduct.id;
      });
      if (check) {
        alert("sản phẩm đã có trong giỏ hàng");
      } else {
        newProductList = [...state.shopcart, newProduct];
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
    default:
      return state;
  }
}
