import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const connetor = connect((state) => ({
  product: state.showProduct,
}));
const getData = ({ product }) => {
  let items = [product];
  let prop = product.detail.split(",");
  items = items.map((curr) => {
    return {
      ...curr,
      prop: prop,
    };
  });
  product = items[0];
  console.log(product);

  return product;
};
let state;
const showProduct = (
  eleImage,
  eleTitle,
  eleTramake,
  elePrice,
  eleProp,
  eleQuantity
) => {
  state = connetor(getData)();
  console.log(state);
  if (state === null) {
    return;
  }
  eleImage.innerHTML = `
     <div class="image">
     <img src="../image/product/${state.nameStore}/${state.image}" alt="" />
   </div>
     `;
  eleTitle.innerHTML = `
     <div class="title" id="ele-title-showProduct">
      ${state.title}
   </div>
     `;
  eleTramake.innerHTML = `
     <div class="tramake" id="ele-tramake-showProductPage">${state.trademark}</div>
     `;
  elePrice.innerHTML = `
     <div class="price" id="ele-price-showProductPage">
      ${state.price.toLocaleString("de-DE")} vnd
   </div>
     `;
  eleQuantity.innerHTML = `${state.quantity}`;
  eleProp.innerHTML = html`${state.prop.map(
    (prop) => `
          <tr>
           <td>
           ${prop}
           </td>
          </tr>
        `
  )}`;
};
export default showProduct;
