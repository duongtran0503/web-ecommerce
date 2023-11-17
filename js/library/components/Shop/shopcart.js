import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const connector = connect((state) => ({
  cart: state.shopcart,
}));
let i = 1;

const shopcart = ({ cart }) => {
  console.log("lan chay", i++);
  let totailcont = cart.reduce((totail, current) => {
    return totail + current.price * current.quantity;
  }, 0);
  document.getElementById("totail-cont").innerText =
    totailcont.toLocaleString("de-DE") + " vnd";

  return html`
    ${cart.map(
      (product, index) => `
        <div class="container-cpsitem">
      <button class="deletebtn-cpsitem"  onclick = "dispatch('delete',${index})">X</button>


      <div class="content-cpsitem">
        <div class="image-cpsitem">
        <div class="card-image-cpc">
        ${
          product.productType
            ? ` <img src="../image/product/${product.productType}/${product.image}" alt="" />`
            : ""
        }
        </div>
        <div class="title-cpsitem">
                 ${product.title}
        </div>
      </div>
      <div class="buttons-cpsitem">
        <div class="add-cpsitem"  onclick = "dispatch('addProduct',${index},${
        product.quantity
      })">+</div>
        <div class="quantity-cpsitem">${product.quantity}</div>
        <div class="sub-cpsitem"  ${
          product.quantity === 1 ? `style =" pointer-events: none;"` : ""
        } onclick = "dispatch('deleteProduct',${index})" >-</div>
      </div>
      <div class="price-cpsitem"> ${product.price * product.quantity}đ</div>
    </div>
        `
    )}
  `;
  return html``;
};
const viewCart = ({ cart }) => {
  console.log(cart);
  let totailcont = cart.reduce((totail, current) => {
    return totail + current.price * current.quantity;
  }, 0);
  console.log(document.getElementById("totail-cont"));
  document.getElementById("totail-cont").innerText =
    totailcont.toLocaleString("de-DE") + " vnd";
  let check = cart.length === 0;
  console.log(check);
  return html`
    <div>
      ${check &&
      "không có sản phẩm nào trong giỏ hàng! <button onclick =' location.href =`./Shop.html`' >đến cữa hàng</button>"}
      ${cart.map(
        (product, index) => `
        <div class="container-cpsitem">
      <button class="deletebtn-cpsitem"  onclick = "dispatch('delete',${index})">X</button>


      <div class="content-cpsitem">
        <div class="image-cpsitem">
          <img src="../image/product/dien_thoai/${product.image}" alt="" />
        </div>
        <div class="title-cpsitem">
                 ${product.title}
        </div>
      </div>
      <div class="buttons-cpsitem">
        <div class="add-cpsitem"  onclick = "dispatch('addProduct',${index},${
          product.quantity
        })">+</div>
        <div class="quantity-cpsitem">${product.quantity}</div>
        <div class="sub-cpsitem"  ${
          product.quantity === 1 ? `style =" pointer-events: none;"` : ""
        } onclick = "dispatch('deleteProduct',${index})" >-</div>
      </div>
      <div class="price-cpsitem"> ${product.price * product.quantity}d</div>
    </div>
        `
      )}
    </div>
  `;
  return html``;
};
const fuc1 = connector(shopcart);
const fuc2 = connector(viewCart);
export { fuc1, fuc2 };
