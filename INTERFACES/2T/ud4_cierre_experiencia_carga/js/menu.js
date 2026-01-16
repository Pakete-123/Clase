// menu.js
console.log("[menu] cargado");

const btnMenu = document.getElementById("btnMenu");
const nav = document.getElementById("nav");

btnMenu.addEventListener("click", () => {
  const isHidden = nav.style.display === "none" || nav.style.display === "";
  nav.style.display = isHidden ? "block" : "none";
  btnMenu.setAttribute("aria-expanded", String(isHidden));
  console.log("[menu] menú:", isHidden ? "abierto" : "cerrado");
});
