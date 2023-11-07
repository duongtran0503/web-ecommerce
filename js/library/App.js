import html from "./core/core.js";
import { connect } from "./core/store.js";
const connector = connect((state) => ({
  product: state.data,
}));
function App({ product }) {
  return html`
    ${product.keyandmouse.map(
      (element, index) =>
        `  <div class="card-cpc">
        <div class="card-image-cpc">
          <img src="../image/product/dien_thoai/${element.image}" alt="product" />
        </div>
        <div class="card-description-cpc">
          <div class="card-des-content-cpc">
            <div class="card-title">
              <h3>${element.title}</h3>
            </div>
            <div class="card-des-cpc">
              <p>${element.trademark}</p>
            </div>
            <div class="card-price-cpc">
              <h3>${element.price}₫</h3>
            </div>
          </div>
          <div class="card-button-cpc">
            <button   onclick = "dispatch('add',${index},'${element.nameStore}')">Thêm vào giỏ hàng</button>
            <button class="seemore">Show</button>
          </div>
        </div>
      </div>
      `
    )}
  `;
}
export default connector(App);
