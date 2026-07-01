// This file contains the core loop and update and the FPS handling...

// import 
import {GameObject} from "./object.js";
import {World} from "./world.js";

// canvas and loop (FPS) variables
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const fps = document.getElementById("fps");

const FPS = 60;
const FrameTime = 1000 / FPS;

let lastTime = 0;
let lastFpsTime = 0;
let frames = 0;

c.width = window.innerWidth;
c.height = window.innerHeight;

// objects
const world = new World(c);
const obj = new GameObject("random",100,50,50,"circle",world);
world.add(obj);

// update 
function update (dt) {
    ctx.clearRect(0, 0, c.width, c.height);
    world.update(dt);    
    world.draw(ctx);
};

// LOOP
function loop(time) {
    
    const dt = (time - lastTime) / 1000;
    lastTime = time;
    frames++;

    update(dt);

    // FPS COUNTER
    if (time - lastFpsTime >= 1000) {
        fps.innerHTML = "FPS: " + frames;
        frames = 0;
        lastFpsTime = time;
        console.log(obj.speedX);
    };

    requestAnimationFrame(loop);
};

requestAnimationFrame(loop);