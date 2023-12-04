import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const connector = connect();
const btnCheck = (userName, id, nameStore) => {
  const Account = JSON.parse(localStorage.getItem("Account"));
  let item = Account.find((value) => userName === value.userName);
  let order = item.order.find((p) => p.id === id && p.nameStore === nameStore);

  return html`<button
    id="btn-check-order"
    class="${order.check ? "action" : ""}"
    onclick="handleChecked(this,'admin/checkOrder','${userName}',${id},'${nameStore}')"
  >
    ${order.check ? "đã xác nhận" : "chưa xác nhận"}
  </button>`;
};
connector(btnCheck);
const StaticPage = () => {
  let order = [];
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  let check = localStorage.getItem("order")
    ? JSON.parse(localStorage.getItem("order"))
    : [];

  order = check.reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);

  const totail_cont = order.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);
  const totail_product = order.length;
  const totail_acces = check.length;
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
          <h3>${totail_product}</h3>
          <p>sản phẩm đã bán</p>
        </span>
      </li>
      <li>
        <i class="bx bx-show-alt"></i>
        <span class="info">
          <h3>${totail_acces}</h3>
          <p>lượng truy cập trang</p>
        </span>
      </li>

      <li>
        <i class="bx bx-dollar-circle"></i>
        <span class="info">
          <h3>${VND.format(totail_cont)}</h3>
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
        </div>
        <table id="customers">
          <thead>
            <tr>
              <th>người đặt hàng</th>
              <th>Thời gian</th>
              <th>sản phẩm</th>
              <th>tổng tiên</th>
              <th>trạng thái</th>
              <th>xác nhận đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            ${order.map(
              (order_detail) =>
                ` <tr >
                <td >${order_detail.userName}</td>
                <td>${order_detail.date}</td>
                <td>${order_detail.title}x<span style = "color:red;">${
                  order_detail.quantity
                }</span></td>
                 <td>${VND.format(
                   order_detail.price * order_detail.quantity
                 )}</td>
                <td>đã thanh toán</td>
                <td>
                 <button id ="btn-show-order" onclick = "showInfor(this)">chi tiết</button>
                   ${btnCheck(
                     order_detail.userName,
                     order_detail.id,
                     order_detail.nameStore
                   )}
                 </td>
                <td style = "display:none">
                
                <div class="infor-content">
                  <div class="infor-content-left">
                  <img src="../image/product/${order_detail.productType}/${
                  order_detail.image
                }" alt="" />
                  </div>
                  <div class="infor-content-right">
                    <div class="box-infor">
                      <h3 class="c-infor">Họ tên:${
                        order_detail.user__detail.name
                      }</h3>
                    </div>
                    <div class="box-infor">
                      <h3 class="c-infor">Địa chỉ:${
                        order_detail.user__detail.address
                      }</h3>
                    </div>
                    <div class="box-infor">
                      <h3 class="c-infor">SDT:${
                        order_detail.user__detail["phone-number"]
                      }
                      </h3>
                    </div>
                    <div class="box-infor">
                      <h3 class="c-infor">Email:${
                        order_detail.user__detail.email
                      }</h3>
                    </div>
                    <div class="box-infor">
                      <h3 class="c-infor">thời Gian:${order_detail.date}</h3>
                    </div>
                    <div class="box-infor">
                      <h3 class="c-infor">
                        Tên sản phẩm:${order_detail.title}
                      </h3>
                    </div>
                    <div class="box-infor">
                      <h3 class="c-infor">Giá:${VND.format(
                        order_detail.price
                      )} số lượng: ${order_detail.quantity}</h3>
                    </div>
                  </div>
                </div>
              
              </td>
              </tr>  

              `
            )}
          </tbody>
        </table>
      </div>
    </div>
  `;
};
export default StaticPage;
