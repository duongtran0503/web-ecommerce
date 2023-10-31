import product from "../../Data/proudct.js";
const init = {
  data: product,
  shopcart: [],
};
export default function reducer(state = init, action, args) {
  switch (action) {
    case "add": {
      const newProduct = state.data[args];

      return {
        ...state,
        shopcart: [...state.shopcart, newProduct],
      };
    }

    default:
      return state;
  }
}
