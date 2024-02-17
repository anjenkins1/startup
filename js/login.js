function login() {
    const userNameEl = document.querySelector("#username");
    const passwdEl = document.querySelector("#password")

    localStorage.setItem("userName", userNameEl.value);
    localStorage.setItem("passwd", passwdEl.value);

    console.log(userNameEl.value)
    console.log(passwdEl.value)

    // localStorage.setItem("user", {"userName": userNameEl.value, "passwd": passwdEl.value});
    window.location.href = "calculator.html";
  }