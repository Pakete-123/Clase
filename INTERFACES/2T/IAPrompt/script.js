document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // Crear un elemento para mostrar errores dinámicamente
  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";
  errorMsg.style.fontSize = "14px";
  errorMsg.style.margin = "0";
  // Lo insertamos antes del botón de submit
  form.insertBefore(errorMsg, form.querySelector('input[type="submit"]'));

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe al servidor

    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    // Credenciales simuladas
    const storedUser = "admin";
    const storedPass = "1234";

    if (user === storedUser && pass === storedPass) {
      window.location.href = "home.html";
    } else {
      errorMsg.textContent = "Usuario o contraseña incorrectos";
    }
  });
});
