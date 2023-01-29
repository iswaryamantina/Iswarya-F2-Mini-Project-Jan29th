let score = document.querySelector(".score");
let highest = document.querySelector(".Highest-score");
let gameScreen = document.querySelector(".gameScreen");
let startScreen = document.querySelector(".startScreen");

startScreen.addEventListener("click", startGame);

document.addEventListener("keydown", keyPressed);

document.addEventListener("keyup", keyReleased);

let player = {
  speed: 5,
  score: 0,
  start: false,
};

let controls = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function keyPressed(e) {
  e.preventDefault();
  if (controls[e.key] == false) {
    controls[e.key] = true;
  }
}

function keyReleased(e) {
  e.preventDefault();
  if (controls[e.key] == true) {
    controls[e.key] = false;
  }
}

function start() {
  let car = document.querySelector(".car");

  let road = gameScreen.getBoundingClientRect(); // this will give us the boundaries values

  moveCar(car);
  let carRect = car.getBoundingClientRect();

  if (controls.ArrowUp && player.y > road.top) {
    player.y = player.y - player.speed;
  }

  if (controls.ArrowDown && player.y < road.bottom - carRect.height / 2) {
    player.y = player.y + player.speed;
  }

  if (controls.ArrowLeft && player.x > road.left * 0) {
    //
    player.x = player.x - player.speed;
  }

  if (controls.ArrowRight && player.x < 370) {
    player.x = player.x + player.speed;
  }

  if (player.start) {
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    player.score++;
    window.requestAnimationFrame(start);
    score.innerHTML = player.score;
    if (player.score > 0) {
      highest.innerHTML = player.score;
    }
  }
}

function startGame() {
  player.start = true;
  startScreen.classList.add("hide");
  gameScreen.classList.remove("hide");

  let car = document.createElement("div");
  car.setAttribute("class", "car");

  // car.innerText = "car";

  car.style.backgroundColor = "red";
  gameScreen.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  window.requestAnimationFrame(start);

  // Creating The Road Lines
  for (let i = 0; i < 5; i++) {
    let RoadLines = document.createElement("div");
    RoadLines.setAttribute("class", "RoadLines");
    RoadLines.Y = i * 140;
    RoadLines.style.top = RoadLines.Y + "px";
    gameScreen.appendChild(RoadLines);
  }

  // Creating The Opponents Car
  for (let I = 0; I < 3; I++) {
    let Opponents = document.createElement("div");
    Opponents.setAttribute("class", "Opponents");
    Opponents.Y = I * -350;
    Opponents.style.top = Opponents.Y + "px";
    gameScreen.appendChild(Opponents);
    Opponents.style.Left = Math.floor(Math.random() * 100) + "px";
  }
}

function moveCar(car) {
  let other = document.querySelectorAll(".Opponents");
  other.forEach(function (item) {
    if (isCollide(car, item)) {
      console.log("HIT");
      endGame();
    }
    if (item.y >= 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function endGame() {
  let other = document.querySelectorAll(".Opponents");
  player.start = false;
  startScreen.classList.remove("hide");
  let h = document.createElement("h1");
  h.innerText = "Game Over, Your score is :" + player.score;
  startScreen.appendChild(h);
}
