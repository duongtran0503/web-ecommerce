import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const conector = connect((state) => ({
  searchProduct: state.searchProductList,

  productlist: state.data,
}));
const showItem = ({ searchProduct, productlist }) => {
  let product = [];
  if (product.length === 0 && searchProduct.length === 0) {
    for (const property in productlist) {
      product = product.concat(productlist[property]);
    }
  } else {
    product = searchProduct;
  }
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return html`
    ${product.map(
      (p) => `
     <tr style ="cursor:context-menu;" >
      <td>${p.productType}</td>
      <td>
     
      ${
        p.productType
          ? ` <img src="../image/product/${p.productType}/${p.image}" alt="" width = "50px" height ="50px" />`
          : ""
      }
       </td>
      <td style = "cursor:pointer;" onclick = "showInforProduct(this)">${
        p.title
      }
        <div style = "display:none;">
        <div class="infor-content">
        <div class="infor-content-left">
        ${
          p.productType
            ? ` <img src="../image/product/${p.productType}/${p.image}" alt="" />`
            : ""
        }
        </div>
        <div class="infor-content-right">
          <div class="box-infor">
            <h3 class="c-infor">Tên sản phẩm:${p.title}</h3>
          </div>
          <div class="box-infor">
            <h3 class="c-infor">giá:${VND.format(p.price)}</h3>
          </div>
          <div class="box-infor">
            <h3 class="c-infor">số lượng:${p.quantity}
            </h3>
          </div>
          <div class="box-infor">
            <h3 class="c-infor">Thương hiệu:${p.trademark}</h3>
          </div>
          <div class="box-infor">
            <h3 class="c-infor">nhà phân phối Ecommere</h3>
          </div>
          <div class="box-infor">
            <h3 class="c-infor">
              mô tả:${p.detail}
            </h3>
          </div>
         
        </div>
      </div>
        </div>
      </td>
      <td>${VND.format(p.price)}</td>
      <td><button 
        onclick ="handleOpenFormEditProduct('${p.title}','${p.detail}','${
        p.price
      }','${p.productType}','../image/product/${p.productType}/${p.image}','${
        p.nameStore
      }','${p.id}')"
      id="btn-shop-edit-product"><i class="fa-solid fa-pen-to-square"></i>
      
     
      
      </button>
       <button 
        onclick = "handleBtnDeleteProduct(this,'${p.nameStore}','${p.id}')"
       id = "btn-shop-dele-product"><i class="fa-regular fa-trash-can"></i></button>
      </td>
      <td style = "display:none">
      <div id="notifi-header">thông báo</div>
      <div id="notify-body">xóa sản phẩm ${p.title} 
         <div id = "notify-body-image" >
         ${
           p.productType
             ? ` <img src="../image/product/${p.productType}/${p.image}" alt="" width = "50px" height ="50px" />`
             : ""
         }</div>
        
      </div>
      <div id="notify-bottom">
        <button id="notify-bottom-btn-left" onclick=" handleCloseBtnNotify()">
          hủy bỏ
        </button>
        <button id="notify-bottom-btn-right" onclick="handleBtnAgree()">
          đồng ý
        </button>
      </div>
      </td>
     
     </tr>
    `
    )}
  `;
};
const AdminShoppage = () => {
  return html`
    <div class="header">
      <div class="left">
        <h1 id="title-admin"></h1>
        <ul class="breadcrumb">
          <li><a href="#"> thống kê </a></li>
          /
          <li><a href="#" class="active">cữa hàng</a></li>
        </ul>
      </div>
      <div href="#" class="report" onclick="handleOpentFormAddProduct()">
        <i class="fa-solid fa-plus-minus"></i>
        <span>Thêm sản phẩm</span>
      </div>
    </div>

    <div class="bottom-data">
      <div class="orders">
        <div class="header">
          <i
            onclick="dispatch('admin/shopSearchInput', '@previous')"
            class="bx bx-receipt"
          ></i>
          <h3>danh sách sản phẩm</h3>
          <div class="fui-search-input-effect">
            <input type="checkbox" id="check" />
            <div class="search-box">
              <input type="text" placeholder="Search..." />
              <label for="check" class="icon" onclick="handleSearchBtn(this)">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z"
                    fill="currentColor"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>
        <table id="customers">
          <thead>
            <tr>
              <th>loại</th>
              <th>ảnh</th>
              <th>tên sản phẩm</th>
              <th>giá</th>
              <th>tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            ${conector(showItem)()}
          </tbody>
        </table>
      </div>
    </div>
  `;
};
export default AdminShoppage;
