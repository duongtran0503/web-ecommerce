import html from "../../core/core.js";
const showProduct = (products) => {
  let datas = [];
  for (const property in products) {
    datas.push(products[property]);
  }
  return html`${datas.map(
    (data) =>
      html`${data.map(
        (element, index) =>
          `<div class="card-cpc">
              <div class="card-image-cpc">
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
            </div>`
      )}`
  )}`;

  return html`null`;
};
export default showProduct;
