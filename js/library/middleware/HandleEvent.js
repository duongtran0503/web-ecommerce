export default function HandleEvent(action, element, ...args) {
  switch (action) {
    case "searchItem":
      {
        localStorage.setItem("searchKey", args[0]);
        window.location.href = "./page/Shop.html";
      }
      break;
    case "show":
      {
        let index = args;

        localStorage.setItem("showPIndex", JSON.stringify(index));
        if (window.location.href.includes("index.html")) {
          window.location.href = "./page/Show.html";
        }
        if (window.location.href.includes("Shop.html")) {
          window.location.href = "./Show.html";
        }
        dispatch("show");
      }
      break;
    case "showAdd":
      {
        let item = localStorage.getItem("showProduct");
        let product = item ? JSON.parse(item) : null;
        let count = product.quantity + 1;
        console.log(count);
        dispatch("show", count);
        window.location.href = "./Show.html";
      }
      break;
    case "showSub":
      {
        let item = localStorage.getItem("showProduct");
        let product = item ? JSON.parse(item) : null;
        let count = product.quantity - 1;
        if (count === 0) {
          return;
        }
        console.log(count);
        dispatch("show", count);
        window.location.href = "./Show.html";
      }
      break;
    case "addProduct":
      {
        let item = localStorage.getItem("showProduct");
        let product = item ? JSON.parse(item) : null;
        if (product === null) {
          return;
        }
        dispatch("addProductShow", item);
        window.location.href = `./ViewCart.html`;
      }
      break;
    default:
      return;
  }
}
