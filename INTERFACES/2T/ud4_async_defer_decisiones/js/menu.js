const btnMenu = document.getElementById("btnMenu");
const nav = document.getElementById("nav");
btnMenu.addEventListener("click", () => {
  nav.style.display = nav.style.display === "block" ? "none" : "block";
});
