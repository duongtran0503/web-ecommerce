import html from "../../core/core.js";
import { connect } from "../../core/store.js";
import { globalTotailCont } from "../../index.js";
const connector = connect((state) => ({
  cart: state.shopcart,
}));
let i = 1;

const shopcart = ({ cart }) => {
  let totailcont = cart.reduce((totail, current) => {
    return totail + current.price * current.quantity;
  }, 0);
  if (globalTotailCont) {
    globalTotailCont.innerText = totailcont.toLocaleString("de-DE") + " vnd";
  }
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
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
      <div class="price-cpsitem"> ${VND.format(
        product.price * product.quantity
      )}</div>
    </div>
   </div>


        `
    )}
  `;

  return html``;
};
const viewCart = ({ cart }) => {
  let totailcont = cart.reduce((totail, current) => {
    return totail + current.price * current.quantity;
  }, 0);
  if (globalTotailCont) {
    globalTotailCont.innerText = totailcont.toLocaleString("de-DE") + " vnd";
  }
  let check = cart.length === 0;
  return html`
    ${check &&
    " <div class ='content-sub'><div class = 'content-sub-title'>không có sản phẩm nào trong giỏ hàng! </div><button onclick =' location.href =`./Shop.html`' >đến cữa hàng</button></div> "}
    ${cart.map(
      (product, index) => `
        <div class="container-cpsitem">
      <button class="deletebtn-cpsitem"  onclick = "dispatch('delete',${index})">X</button>


      <div class="content-cpsitem">
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
      <div class="price-cpsitem"> ${product.price * product.quantity}d</div>
    </div>
        `
    )}
  `;
  return html``;
};
const fuc1 = connector(shopcart);
const fuc2 = connector(viewCart);
export { fuc1, fuc2 };
