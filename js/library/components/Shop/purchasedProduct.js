import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const connector = connect((state) => ({
  product: state.purcharedProduct,
}));
const purcharedProduct = ({ product }) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  let check = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  if (check.order.length !== 0 && product.length === 0) {
    product = [...check.order];
  }
  return html`
    ${product.length === 0
      ? "<div>Bạn chưa mua sản phẩm nào</div>"
      : `
         ${product.map(
           (element) =>
             `  <tr>
             <td>${element.date}</td>
                 <td>${element.title} x <span style = "color:red;">${
               element.quantity
             }</span></td>
                 <td>${VND.format(element.price * element.quantity)}</td>
                 <td>${
                   !element.check ? "Dang chở xác nhận" : "đang vận chuyển"
                 }</td>
               </tr>`
         )}
        `}
  `;
};
export default connector(purcharedProduct);
