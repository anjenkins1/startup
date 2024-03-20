(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    document.querySelector('#scientistName').textContent = userName;
    setDisplay('loginControls', 'none');
    setDisplay('calculatorControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('calculatorControls', 'none');
  }
})();

async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#userPassword')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem('userName', userName);
    window.location.href = 'calculator.html';
  } else {
    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

function calculator() {
  window.location.href = 'calculator.html';
}

function logout() {
  localStorage.removeItem('userName');
  localStorage.removeItem('reactions')
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
  // See if we have a user with the given email.
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  console.log("setting it up")
  const scientistControlEl = document.querySelector(`#${controlId}`);
  if (scientistControlEl) {
    scientistControlEl.style.display = display;
  }
}


// function login() {
//     const userNameEl = document.querySelector("#username");
//     const passwdEl = document.querySelector("#password")

//     localStorage.setItem("userName", userNameEl.value);
//     localStorage.setItem("passwd", passwdEl.value);

//     console.log(userNameEl.value)
//     console.log(passwdEl.value)

//     // localStorage.setItem("user", {"userName": userNameEl.value, "passwd": passwdEl.value});
//     window.location.href = "calculator.html";
//   }