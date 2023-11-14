import html from "./core/core.js";
import { connect } from "./core/store.js";
import showProduct from "./components/Shop/showProduct.js";
const connector = connect((state) => ({
  product: state.data,
}));
function App(products) {
  return html` ${showProduct(products.product)} `;
}
export default connector(App);
//delete app
