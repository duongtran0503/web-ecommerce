import html from "../../core/core.js";
const renderInfor = () => {
  let item = JSON.parse(localStorage.getItem("user"));
  return html`
    <h2 class="name">Họ tên:${item.name}</h2>
    <h2>Email:${item.userName}</h2>
  `;
};
export default renderInfor;
