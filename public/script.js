const fireflies = document.querySelectorAll(".firefly");

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
