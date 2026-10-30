const authCard = document.getElementById("authCard");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const toast = document.getElementById("toast");
let toastTimer;

function showMode(mode) {
  const isLogin = mode === "login";
  authCard.classList.toggle("login-mode", isLogin);
  registerForm.classList.toggle("active", !isLogin);
  loginForm.classList.toggle("active", isLogin);
}

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => showMode(button.dataset.mode));
});

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.toggle);
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    button.textContent = visible ? "Show" : "Hide";
    button.setAttribute("aria-label", visible ? "Show password" : "Hide password");
  });
});

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!registerForm.reportValidity()) return;
  notify("Registration UI is ready. Connect this form to your secure backend to create an account.");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!loginForm.reportValidity()) return;
  notify("Login UI is ready. Connect your authentication API to sign in securely.");
});

document.getElementById("forgotLink").addEventListener("click", (event) => {
  event.preventDefault();
  notify("Connect your password-reset flow to enable account recovery.");
});

document.getElementById("helpLink").addEventListener("click", (event) => {
  event.preventDefault();
  notify("Add your support email or helpline here.");
});

document.querySelectorAll(".social-btn").forEach((button) => {
  button.addEventListener("click", () => {
    notify("Social sign-in is a visual placeholder. Configure OAuth before enabling it.");
  });
});
