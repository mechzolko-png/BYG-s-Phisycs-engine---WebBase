const c = document.getElementById("c");
const ctx = c.getContext("2d");

const FPS = 60;
const FrameTime = 1000 / FPS;
const m = 100;

c.width = window.innerWidth;
c.height = window.innerHeight;

let x = 2 * m;
let y = 2 * m;

let speedX = 35 * m;
let speedY = 5 * m;

let gravity = 9.81 * m;
let landingLoss = 0.9;
let friction = 5;
let airFriction = 0.001;
let surface = 30;

let isOnGround = false;

if (FPS > 1) {
  speedX = speedX / FPS; //(FPS*100);
  speedY = speedY / FPS; //(FPS*100);
  gravity = gravity / FPS; //(FPS*100);
  friction = friction / FPS; //(FPS*100);
}

// ---------------- UPDATE ----------------

// if (speedX > 0 && isOnGround) {
//     speedX -= friction;
//     if (speedX < 0) speedX = 0;
// } else if (speedX > 0) {
//     speedX -= airFriction;
//     if (speedX < 0) speedX = 0;
// }

// if (speedX < 0 && isOnGround) {
//     speedX += friction;
//     if (speedX > 0) speedX = 0;
// } else if (speedX < 0) {
//     speedX += airFriction;
//     if (speedX < 0) speedX = 0;
// }

let mouse = {
  x: 0,
  y: 0,
  leftDown: false,
  sx: 0,
  sy: 0,
}; 

let lastMouseX = 0;
let lastMouseY = 0;

addEventListener("mousemove", (e) => {

    mouse.sx = e.clientX - lastMouseX;
    mouse.sy = e.clientY - lastMouseY;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

  addEventListener("mousedown", (e) => {
    mouse.leftDown = true;
  });

  addEventListener("mouseup", (e) => {
    mouse.leftDown = false;
  });

function box1() {

  // gravity logic
  speedY += gravity;

  x += speedX;
  y += speedY;

  if (x > c.width - surface) {
    x = c.width - surface;
    speedX = -speedX * landingLoss;

    // if (Math.abs(speedX) < 1) speedX = 0;
  }

  if (x <= 0) {
    x = 0;
    speedX = -speedX;
    speedX *= landingLoss;
  }

  if (y >= c.height - surface) {
    y = c.height - surface;
    speedY = -speedY * landingLoss;
    isOnGround = true;
  }

  if (y <= 0) {
    y = 0;
    speedY = -speedY;
    speedY *= landingLoss;

    isOnGround = true;
  }

  // Friction logic

  if (isOnGround) {
    if (speedX > 0) {
      speedX -= friction;
      if (speedX < 0) speedX = 0;
    }

    if (speedX < 0) {
      speedX += friction;
      if (speedX > 0) speedX = 0;
    }
  }

  if (!isOnGround) {
    if (speedX > 0) {
      speedX -= airFriction;
      if (speedX < 0) speedX = 0;
    }

    if (speedX < 0) {
      speedX += airFriction;
      if (speedX > 0) speedX = 0;
    }
  }

  if (mouse.leftDown == true) {
    x = mouse.x;
    y = mouse.y;
    speedX = mouse.sx;
    speedY = mouse.sy;
  } else if (mouse.leftDown == false) {
    x = x;
    y = y;
  }

  ctx.beginPath();
  // arc(x, y, radius, startAngle, endAngle)
  ctx.arc(x, y, 0.2 * m, 0, 2 * Math.PI);

  // Choose to fill or stroke
  ctx.fillStyle = "blue";
  ctx.fill(); // Fills the circle with blue

  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke(); // Draws a black outline

  // ctx.clearRect(0, 0, c.width, c.height);
  // ctx.fillStyle = "black";
  // ctx.fillRect(x, y, surface, surface);
}

function upd() {
  // Update function
  ctx.clearRect(0, 0, c.width, c.height);

  box1();
}

// ---------------- LOOP ----------------

let lastTime = 0;
let LastSpeedX = 1;

function animate(timestamp) {
  requestAnimationFrame(animate);

  let time = timestamp - lastTime;

  if (time >= FrameTime) {
    lastTime = timestamp - (time % FrameTime);
    upd();
    console.log(mouse.sx," ",mouse.sy)
  }
}

requestAnimationFrame(animate);
