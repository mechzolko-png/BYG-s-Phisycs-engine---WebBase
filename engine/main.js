// imports
import { Render } from "./render.js";
import { World } from "./world.js";
import { Fps } from "./FPShandler.js";
import { UI } from "../UI/index.js";

// objects
const render = new Render;
// const fps = new Fps(60,render);
const ui = new UI();
// setup
render.setUpCanvas();


const world = new World(render.canvas);


// let lastTime = 0;
// let frameTime = 1 / 60;

// LOOP
// function loop(currentTime) {
//     let dt = (currentTime - lastTime) / 1000;
//     lastTime = currentTime;

    // const dt = fps.handleFPS(currentTime);

    // if (dt > 0) {
    //     world.update(dt);
    //     render.render(world.getRenderData());
    // }

    // ui.prodFPS(fps.FpS);

//     if (dt >= frameTime) {
//         world.update(dt);
//         render.render(world.getRenderData());
//     };

//     requestAnimationFrame(loop);
// }

let lastTime = 0;

let fpsTimer = 0;
let frameCount = 0;
let averageFPS = 0;

function loop(currentTime) {
    const dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    world.update(dt);
    render.render(world.getRenderData());

    frameCount++;
    fpsTimer += dt;

    if (fpsTimer >= 1) {
        averageFPS = frameCount / fpsTimer;

        ui.prodFPS(Math.round(averageFPS));

        frameCount = 0;
        fpsTimer = 0;
    }

    requestAnimationFrame(loop);
}


requestAnimationFrame(loop);