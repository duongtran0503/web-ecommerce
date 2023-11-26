import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const connector = connect((state) => ({
  product: state.purcharedProduct,
}));

const StaticPage = ({ product }) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  let check = localStorage.getItem("buyProduct")
    ? JSON.parse(localStorage.getItem("buyProduct"))
    : [];
  if (check.length !== 0 && product.length === 0) {
    product = [...check];
  }
  return html`
    <div class="header">
      <div class="left">
        <h1 id="title-admin"></h1>
        <ul class="breadcrumb">
          <li><a href="#" class="active"> thống kê </a></li>
          /
          <li><a href="../index.html">cữa hàng</a></li>
        </ul>
      </div>
      <a
        href="#"
        class="report"
        onclick=" MessageBox('thông báo','chức năng chưa được cập nhập','error')"
      >
        <i class="bx bx-cloud-download"></i>
        <span>Download thông tins</span>
      </a>
    </div>

    <!-- Insights -->
    <ul class="insights">
      <li>
        <i class="bx bx-calendar-check"></i>
        <span class="info">
          <h3>1,074</h3>
          <p>sản phẩm đã bán</p>
        </span>
      </li>
      <li>
        <i class="bx bx-show-alt"></i>
        <span class="info">
          <h3>3,944</h3>
          <p>lượng truy cập trang</p>
        </span>
      </li>

      <li>
        <i class="bx bx-dollar-circle"></i>
        <span class="info">
          <h3>$6,742</h3>
          <p>Tổng tiền</p>
        </span>
      </li>
    </ul>
    <!-- End of Insights -->

    <div class="bottom-data">
      <div class="orders">
        <div class="header">
          <i class="bx bx-receipt"></i>
          <h3>đơn hàng đã đặt gần đây</h3>
          <i
            class="bx bx-filter"
            onclick=" MessageBox('thông báo','chức năng chưa được cập nhập','error')"
          ></i>
          <i
            class="bx bx-search"
            onclick=" MessageBox('thông báo','chức năng chưa được cập nhập','error')"
          ></i>
        </div>
        <table id="customers">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>sản phẩm</th>
              <th>giá</th>
              <th>trạng thái</th>
            </tr>
          </thead>
          <tbody id="ele-history-shop">
            ${product.length === 0
              ? "<div>Chưa có đơn hàng nào</div>"
              : `
               ${product.map(
                 (element) =>
                   `  <tr>
                   <td>${element.date}</td>
                       <td>${element.title} x <span style = "color:red;">${
                     element.quantity
                   }</span></td>
                       <td>${VND.format(element.price * element.quantity)}</td>
                       <td>đã được thanh toán</td>
                     </tr>`
               )}
              `}
          </tbody>
        </table>
      </div>
    </div>
  `;
};
export default connector(StaticPage);
