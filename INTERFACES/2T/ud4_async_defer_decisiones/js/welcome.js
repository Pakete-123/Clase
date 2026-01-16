const btnMore = document.getElementById("btnMore");
const moreInfo = document.getElementById("moreInfo");
const welcomeBox = document.getElementById("welcomeBox");
btnMore.addEventListener("click", () => {
  moreInfo.hidden = !moreInfo.hidden;
  welcomeBox.hidden = !welcomeBox.hidden;
});
