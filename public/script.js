const fireflies = document.querySelectorAll(".firefly");

function handleYes() {
  window.location.href = "./chatroom.html";
}

function handleNo() {
  const noBtn = event.target;
  const randomX = Math.random() * (window.innerWidth - 200);
  const randomY = Math.random() * (window.innerHeight - 100);
  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
}

function randomPosition() {
  return Math.random() * window.innerWidth;
}
function randomTop() {
  return Math.random() * window.innerHeight * 0.8;
}

fireflies.forEach((f) => {
  f.style.left = randomPosition() + "px";
  f.style.top = randomTop() + "px";
});
