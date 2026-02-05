const socket = io();

let userRole = null;

socket.on("connect", () => {});

socket.on("assignRole", (role) => {
  userRole = role;

  if (role === "girl") {
    document.body.classList.add("flip-view");
  }
});

function openMenu() {
  document.getElementById("menuModal").classList.add("active");
  document.getElementById("menuOverlay").classList.add("active");
}

function closeMenu() {
  document.getElementById("menuModal").classList.remove("active");
  document.getElementById("menuOverlay").classList.remove("active");
}

function leaveDate() {
  document.getElementById("leaveModal").classList.add("active");
  document.getElementById("leaveOverlay").classList.add("active");
}

function closeLeaveModal() {
  document.getElementById("leaveModal").classList.remove("active");
  document.getElementById("leaveOverlay").classList.remove("active");
}

function confirmLeave() {
  socket.disconnect();
  window.location.href = "index.html";
}

function orderFood(foodType) {
  socket.emit("foodOrder", {
    sender: userRole,
    food: foodType,
  });
  closeMenu();
}

socket.on("foodOrder", (data) => {
  displayFood(data);
});

function displayFood(data) {
  const plateClass =
    data.sender === "boy" ? "food-plate-boy" : "food-plate-girl";

  const existingPlate = document.querySelector(`.food-plate.${plateClass}`);
  if (existingPlate) {
    existingPlate.remove();
  }

  const foodPlate = document.createElement("div");
  foodPlate.className = `food-plate ${plateClass}`;

  const plate = document.createElement("div");
  plate.className = "plate";

  const food = document.createElement("div");
  food.className = `food-${data.food}`;

  const drink = document.createElement("div");
  drink.className = "drink-glass";

  foodPlate.appendChild(plate);
  foodPlate.appendChild(food);
  foodPlate.appendChild(drink);

  document.querySelector(".table-restaurant").appendChild(foodPlate);
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const messageText = input.value.trim();

  if (messageText !== "") {
    socket.emit("chatMessage", {
      sender: userRole,
      text: messageText,
      timestamp: Date.now(),
    });
    input.value = "";
  }
}

socket.on("chatMessage", (data) => {
  displayMessageBubble(data);
});

function displayMessageBubble(data) {
  const characterClass =
    data.sender === "boy" ? ".character-boy" : ".character-girl";
  const character = document.querySelector(characterClass);

  const existingBubble = character.querySelector(".speech-bubble");
  if (existingBubble) {
    existingBubble.remove();
  }

  const bubble = document.createElement("div");
  bubble.className = "speech-bubble";
  bubble.textContent = data.text;
  character.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("messageInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
});
