import html from "./core/core.js";
import { connect } from "./core/store.js";
const connector = connect((state) => ({
  product: state.data,
}));
function App(data) {
  console.log();
  return html`
    ${data.product.map(
      (element, index) =>
        `<div class = "product-wrapper" key = "${index}">
          <button class = "product-btn" onclick = "dispatch('add',${index})" >thêm vào giỏ hàng</button>
       <div class = "image">
        <img  src ="${element.image}"/>
       </div>
       <div>
        <h3>${element.title}</h3>
        <p>${element.cont}</p>
        <p>${element.detail}</p>
       </div>
      </div>
      `
    )}
  `;
}
export default connector(App);
