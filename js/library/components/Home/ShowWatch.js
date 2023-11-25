import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const connector = connect((state) => ({
  product: state.data.Laptop,
}));
let i = 0;
const ShowLaptop = ({ product }) => {
  let list = [];
  for (let i = 0; i < 10; i++) {
    if (product[i]) {
      list.push(product[i]);
    }
  }
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return html`
    ${list.map(
      (element, index) =>
        `   
       <div class="card-cpc">
         <div class="card-image-cpc">
          <img src="./image/product/Laptop/${element.image}" alt=""/>
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
         <button   onclick = "dispatch('add',${index},'${
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
export default connector(ShowLaptop);
