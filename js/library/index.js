import { attach } from "./core/store.js";
import App from "./App.js";
import { fuc1, fuc2 } from "./components/shopcart.js";
const root = document.getElementById("root-product");
const cart = document.getElementById("shopcart");
const viewCartE = document.getElementById("ViewCart");

if (root) {
  attach(App, root);
}
if (cart) {
  attach(fuc1, cart);
}
if (viewCartE) {
  attach(fuc2, viewCartE);
}
