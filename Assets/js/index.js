var loginForm = document.getElementById("loginForm");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var emailInput = document.getElementById("email");
var termsCheckbox = document.querySelector("#terms input");
var registerForm = document.getElementById("registerForm");
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const termsCheckbox = document.querySelector("#terms input");

  var users = [
    { username: "maryam", password: "123456" },
    { username: "admin", password: "admin123" },
    { username: "testuser", password: "testpass" }
  ];

  function validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const termsAccepted = termsCheckbox.checked;

      if (username === "" || email === "" || password === "") {
        return Swal.fire("Missing Fields", "All fields are required!", "error");
      }

      if (!validateEmail(email)) {
        return Swal.fire("Invalid Email", "Please enter a valid email.", "warning");
      }

      if (password.length < 6) {
        return Swal.fire("Weak Password", "At least 6 characters required.", "warning");
      }

      if (!termsAccepted) {
        return Swal.fire("Terms Not Accepted", "Please accept terms.", "info");
      }

      if (users.some(u => u.username === username || u.email === email)) {
        return Swal.fire("User Exists", "Username or email already in use.", "error");
      }

      users.push({ username, email, password });

      Swal.fire({
        icon: "success",
        title: "Registered Successfully!",
        text: "Redirecting to login...",
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        window.location.href = "./hello.html";
      });

      registerForm.reset();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const termsAccepted = termsCheckbox.checked;

      if (username === "" || password === "") {
        return Swal.fire("Missing Fields", "All fields are required!", "error");
      }

      if (password.length < 6) {
        return Swal.fire("Weak Password", "At least 6 characters required.", "warning");
      }

      if (!termsAccepted) {
        return Swal.fire("Terms Not Accepted", "Please accept terms.", "info");
      }

      const foundUser = users.find(u => u.username === username && u.password === password);
      if (!foundUser) {
        return Swal.fire("Account Not Found", "Invalid username or password.", "error");
      }

      Swal.fire({
        icon: "success",
        title: `Welcome, ${username}!`,
        text: "Login successful.",
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        window.location.href = "./hello.html";
      });
    });
  }
});
