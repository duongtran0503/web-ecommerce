import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const TotailCont = ({ product }) => {
  const totail = product.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return html` ${VND.format(totail)} `;
};
export default connect((state) => ({
  product: state.shopcart,
}))(TotailCont);
