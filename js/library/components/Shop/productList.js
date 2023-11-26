import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const conector = connect((state) => ({
  searchProduct: state.searchProductList,

  productlist: state.productList,
  start: state.limitPage.start,
  end: state.limitPage.end,
  item: state.limitPage.item,
}));
const productlist = ({ searchProduct, productlist, item, start, end }) => {
  if (item.length === 0 && searchProduct.length === 0) {
    let indexstart = start;
    let indexend = end;
    for (indexstart; indexstart <= indexend; indexstart++) {
      item.push(productlist[indexstart]);
    }
  } else if (searchProduct.length !== 0) {
    item = searchProduct;
  }
  function converJson(obj) {
    return JSON.stringify(obj);
  }
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return html`
    ${item.map(
      (element, index) =>
        `  
         <div class="card-cpc">
           <div class="card-image-cpc">
          ${
            element.productType
              ? ` <img src="../image/product/${element.productType}/${element.image}" alt="" />`
              : ""
          }
          <span class ="sale-1">Giảm 12%</span>
          <span class = "sale-2">Bảo hành 12 tháng</span>
          <span class = "sale-3">Trả góp 4%</span>
           </div>
             <div class="card-description-cpc">
          <div class="card-des-content-cpc">
              <div class="card-title-cpc">
          <h3>${element.title}</h3>
             </div>
            <div class="card-des-cpc">
          <p>${element.trademark}</p>
           </div>
         <div class="card-price-cpc">
          <h3>${VND.format(element.price)}</h3>
           </div>
          </div>
          <div class="card-button-cpc">
           <button   onclick = "dispatch('add',${element.id},'${
          element.nameStore
        }')">Thêm vào giỏ hàng</button>
        <button class="seemore" onclick ="HandleEvent('show',this,'${
          element.nameStore
        }','${element.id}')">Show</button>
            </div>
           </div>
             </div>
        `
    )}
  `;
};

export default conector(productlist);
