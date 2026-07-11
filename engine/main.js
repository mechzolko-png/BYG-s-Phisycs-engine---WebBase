// This file contains the core loop and update and the FPS handling...

// import 
import {GameObject, WallObject} from "./object.js";
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
for (let i = 0; i <= 20; i++) {
    const obj = new GameObject("random","random",10,10,"circle",world,"random");
    world.add(obj);
};

const wall = new WallObject(600, 600, 100, 600, "black");
world.place(wall);


// let f = 0;

// update 
function update (dt) {
    // f++;
    //    if (f >= 200) { 
    //      const obj2 = new GameObject("random",10,5,5,"circle",world,"blue");
    //      world.add(obj2);
           
    //     f = 0;
    //    };
    
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
    };

    requestAnimationFrame(loop);
};

requestAnimationFrame(loop);