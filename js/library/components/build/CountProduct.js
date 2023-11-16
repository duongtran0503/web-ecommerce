import { connect } from "../../core/store.js";

const countProduct = ({ cart }) => {
  let count = cart.length === 0 ? 0 : cart.length;
  console.log(count);
  return `${count}`;
};
export default connect((state) => ({
  cart: state.shopcart,
}))(countProduct);
