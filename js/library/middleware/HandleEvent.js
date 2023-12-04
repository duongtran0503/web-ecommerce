export default function HandleEvent(action, element, ...args) {
  switch (action) {
    case "searchItem":
      {
        localStorage.setItem("searchKey", args[0]);
        if (window.location.href.includes("page")) {
          window.location.href = "./Shop.html";
        } else {
          window.location.href = "./page/Shop.html";
        }
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
    case "payment":
      {
        let stateUser = JSON.parse(localStorage.getItem("state"));
        if (!stateUser) {
          MessageBox("Thông báo", "Hãy đang nhập để thanh toán đơn hàng");
          return;
        } else {
          window.location.href = "./formthanhtoan.html";
        }
      }
      break;
    case "admin/Router":
      {
        const mainContent = [...args[0]];
        const mainLoading = args[1];
        mainContent.forEach((ele) => {
          if (!ele.classList.contains("active")) {
            ele.classList.add("active");
          }
        });
        mainLoading.classList.remove("active");
        setTimeout(() => {
          mainLoading.classList.add("active");
          element.classList.remove("active");
        }, 1000);
      }
      break;
    case "admin/shopBtnDeleP":
      {
        console.log(element);
      }
      break;
    default:
      return;
  }
}
