import html from "../core/core.js";
import { connect } from "../core/store.js";
const connector = connect((state) => ({
  cart: state.shopcart,
}));
const shopcart = ({ cart }) => {
  let totailcont = cart.reduce((totail, current) => {
    return totail + current.cont * current.quantity;
  }, 0);
  document.getElementById("totail-cont").innerText =
    totailcont.toLocaleString("de-DE") + " vnd";
  document.getElementById("countproductofcart").innerText =
    cart.length === 0 ? "" : cart.length;
  return html`
    <div>
      ${cart.map(
        (product, index) => `<div> ${product.title}:${
          product.cont * product.quantity
        } 
      
      <div onclick = "dispatch('delete',${index})">X</div>
      <div onclick = "dispatch('addProduct',${index},${
          product.quantity
        })">+</div>
      <div  ${
        product.quantity === 1 ? `style =" pointer-events: none;"` : ""
      } onclick = "dispatch('deleteProduct',${index})" >-</div>
      </div>`
      )}
    </div>
  `;
};
const viewCart = ({ cart }) => {
  console.log(cart);
  let totailcont = cart.reduce((totail, current) => {
    return totail + current.cont * current.quantity;
  }, 0);
  console.log(document.getElementById("totail-cont"));
  document.getElementById("totail-cont").innerText =
    totailcont.toLocaleString("de-DE") + " vnd";
  return html`
    <div>
      ${cart.map(
        (product, index) => `<div> ${product.title}:${
          product.cont * product.quantity
        } 
      
      <div onclick = "dispatch('delete',${index})">X</div>
      <div onclick = "dispatch('addProduct',${index},${
          product.quantity
        })">+</div>
        <div>${product.quantity}</div>
      <div  ${
        product.quantity === 1 ? `style =" pointer-events: none;"` : ""
      } onclick = "dispatch('deleteProduct',${index})" >-</div>
      </div>`
      )}
    </div>
  `;
};
const fuc1 = connector(shopcart);
const fuc2 = connector(viewCart);
export { fuc1, fuc2 };
