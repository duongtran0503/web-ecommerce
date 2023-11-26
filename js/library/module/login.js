import Acount from "../../Data/Acount.js";
const Login = (inputEmail, inputPass, btnSubmit) => {
  const checkEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email.trim());
  };
  const infor = {};
  [inputEmail, inputPass].forEach((ele) => {
    ele.onblur = function () {
      if (this.value.trim().length === 0) {
        this.parentElement.lastElementChild.innerText =
          "Trường này không được để trống";
      } else if (this === inputEmail) {
        if (!checkEmail(inputEmail.value)) {
          this.parentElement.lastElementChild.innerText =
            "định dạng email không chính xác";
        }
      }
    };
    ele.onfocus = function () {
      this.parentElement.lastElementChild.innerText = "";
    };
  });
  btnSubmit.parentElement.onkeypress = function () {
    if (checkEmail(inputEmail.value) && inputPass.value.length !== 0) {
      btnSubmit.disabled = false;
    } else {
      btnSubmit.disabled = true;
    }
  };
  btnSubmit.parentElement.onchange = () => {
    if (checkEmail(inputEmail.value) && inputPass.value.length > 1) {
      btnSubmit.disabled = false;
    } else {
      btnSubmit.disabled = true;
    }
    console.log(4);
  };
  btnSubmit.onclick = function (e) {
    e.preventDefault();
    infor.userName = inputEmail.value;
    infor.passWorld = inputPass.value;
    if (infor.userName.includes("admin@gmail.com")) {
      infor.permisson = "admin";
    } else {
      infor.permisson = "customer";
    }
    dispatch("login", infor);
  };
};
export default Login;
