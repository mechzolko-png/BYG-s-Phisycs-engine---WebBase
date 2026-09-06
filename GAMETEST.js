import { PhysicsWorld } from "./engine/API.js";

const engine = new PhysicsWorld();


let ball = engine.spawn(100, 100, 0, 10);
let ball2 = engine.spawn(200, 100, 0, 10);
let ball3 = engine.spawn(1000, 100, 0, 10);
let ball4 = engine.spawn(400, 100, 0, 10);

let admiss = false

document.addEventListener("click", () => {
    admiss = true
})

function loop (ct) {

    engine.addVelocity(ball,10,0);
    engine.addVelocity(ball2,10,0);
    engine.setMass(ball3,10);

    if (engine.isCollideWith(ball3,ball)) {
        engine.destroy(ball)
        engine.destroy(ball2)
        engine.destroy(ball3)
        engine.destroy(ball4)
    }
    if (admiss) { engine.destroy(ball4)};


    engine.update(ct);
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

