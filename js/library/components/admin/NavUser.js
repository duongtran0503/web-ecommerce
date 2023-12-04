import html from "../../core/core.js";
const AdminUserpage = () => {
  const item = localStorage.getItem("Account");
  const Account = item ? JSON.parse(item) : [];
  console.log(Account);
  const [admin, ...user] = Account;
  console.log(user);
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
      <a href="#" class="report">
        <i class="bx bx-cloud-download"></i>
        <span>Download thông tins</span>
      </a>
    </div>

    <div class="bottom-data">
      <div class="orders">
        <div class="header">
          <i class="bx bx-receipt"></i>
          <h3>danh sách người dùng</h3>
        </div>
        <table id="customers">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên người dùng</th>
              <th>email</th>
              <th>số hàng đã mua</th>
            </tr>
          </thead>
          <tbody>
            ${user.map(
              (u, index) => ` <tr>
              <td>${index}</td>
              <td>${u.name}</td>
              <td>${u.userName}</td>
              <td>${u.order.length}</td>
            </tr>`
            )}
          </tbody>
        </table>
      </div>
    </div>
  `;
};
export default AdminUserpage;
