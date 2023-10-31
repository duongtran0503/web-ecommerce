import { attach } from "./core/store.js";
import App from "./App.js";
import shopcart from "./components/shopcart.js";
const root = document.getElementById("root-product");
const cart = document.getElementById("shopcart");
attach(App, root);
attach(shopcart, cart);
