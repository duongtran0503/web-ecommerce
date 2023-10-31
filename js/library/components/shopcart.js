import html from "../core/core.js";
import { connect } from "../core/store.js";
const connector = connect((state) => ({
  cart: state.shopcart,
}));
const shopcart = ({ cart }) => {
  console.log("refesh");
  let totailcont = cart.reduce((totail, current) => {
    return totail + current.cont;
  }, 0);
  document.getElementById("totail-cont").innerText = totailcont + " vnd";
  document.getElementById("countproductofcart").innerText =
    cart.length === 0 ? "" : cart.length;
  return html`
    <div>
      ${cart.map((product) => `<div> ${product.title}:${product.cont}</div>`)}
    </div>
  `;
};
export default connector(shopcart);
