import html from "../../core/core.js";
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
  console.log(totail_acces, totail_cont, totail_product);
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
              <th>người đặt hàng</th>
              <th>Thời gian</th>
              <th>sản phẩm</th>
              <th>giá</th>
              <th>trạng thái</th>
            </tr>
          </thead>
          <tbody id="ele-history-shop">
            ${order.map(
              (order_detail) =>
                ` <tr>
                <td>${order_detail.userName}</td>
                <td>${order_detail.date}</td>
                <td>${order_detail.title}x<span style = "color:red;">${
                  order_detail.quantity
                }</span></td>
                 <td>${VND.format(
                   order_detail.price * order_detail.quantity
                 )}</td>
                <td>đã thanh toán</td>
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
