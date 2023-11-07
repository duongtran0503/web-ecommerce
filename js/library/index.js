import { attach } from "./core/store.js";
import App from "./App.js";
import { fuc1, fuc2 } from "./components/shopcart.js";
import Home from "./components/Home.js";
const root = document.getElementById("root-product");
const cart = document.getElementById("shopcart");
const viewCartE = document.getElementById("ViewCart");
const contentHome = document.getElementsByClassName("l-c-p-w-r");
if (root) {
  attach(App, root);
}
if (cart) {
  attach(fuc1, cart);
}
if (viewCartE) {
  attach(fuc2, viewCartE);
}
if (contentHome) {
  [...contentHome].forEach((element) => {
    attach(Home, element);
  });
}
