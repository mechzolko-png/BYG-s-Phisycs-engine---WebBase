import { PhysicsWorld } from "./engine/API.js";

const world = new PhysicsWorld();

const player = world.spawn(100, 100, 0, 10);

document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "w") {
        player.data.velocity.y = -1000;
    }
    if (event.key.toLowerCase() === "s") {
        player.data.velocity.y = 1000;
    }
    if (event.key.toLowerCase() === "d") {
        player.data.velocity.x = 1000;
    }
    if (event.key.toLowerCase() === "a") {
        player.data.velocity.x = -1000;
    }
});

world.update();