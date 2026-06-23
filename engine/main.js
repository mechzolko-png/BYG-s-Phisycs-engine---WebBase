const c = document.getElementById("c");
const ctx = c.getContext("2d");

const FPS = 60;
const FrameTime = 1000 / FPS;

c.width = window.innerWidth;
c.height = window.innerHeight;

let x = 200;
let y = 200;

let speedX = 1500;
let speedY = 0;

let gravity = 2;
let landingLoss = 0.2;
let friction = 1;
let airFriction = 0.3;

// let isOnGround = false;

if (FPS > 1) {
    speedX = speedX / FPS;
    speedY = speedY / FPS;
    gravity = gravity / FPS;
    friction = friction / FPS;
}

// ---------------- UPDATE ----------------

function box1() {
    // gravity logic
    speedY += gravity;

    x += speedX;
    y += speedY;

    if (x > c.width - 100) {
        x = c.width - 100;
        speedX = -speedX * landingLoss;

        // if (Math.abs(speedX) < 1) speedX = 0;
    }

    if (x <= 0) {
        x = 0;
        speedX = -speedX;
        speedX *= landingLoss;
    }

    if (y >= c.height - 112) {
        y = c.height - 112;
        speedY = -speedY * landingLoss;
        isOnGround = true
    } else {
        isOnGround = false
    }

    if (y <= 0) {
        y = 0;
        speedY = -speedY;
        speedY *= landingLoss;
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


    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 100, 100);

}

function upd() {   // Update function
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
        console.log(speedX);
    }
}

requestAnimationFrame(animate);
