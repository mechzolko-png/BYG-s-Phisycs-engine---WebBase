// imports
import { Render } from "./render.js";
import { World } from "./world.js";
import { UI } from "../UI/index.js";
import { Random } from "./math.js";

const random = new Random
// objects
const render = new Render;
// const fps = new Fps(60,render);
const ui = new UI();
// setup
render.setUpCanvas();   

const world = new World(render.canvas);


world.spawn(random.randint(0,100),random.randint(0,100),random.randint(0,100),random.randint(0,100));
world.spawn(random.randint(0,100),random.randint(0,100),random.randint(0,100),random.randint(0,100));


let lastTime = 0;

let fpsTimer = 0;
let frameCount = 0;
let averageFPS = 0;

function loop(currentTime) {
    const dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    world.update(dt);
    render.render(world.getRenderData()); // giving out all world render data

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