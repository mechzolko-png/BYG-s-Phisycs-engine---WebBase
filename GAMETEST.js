import { PhysicsWorld } from "./engine/API.js";

const engine = new PhysicsWorld();


engine.spawn(100, 100, 0, 10);
engine.spawn(200, 100, 0, 10);
engine.spawn(300, 100, 0, 10);
engine.spawn(400, 100, 0, 10);
engine.spawn(500, 100, 0, 10);
engine.spawn(600, 100, 0, 10);


engine.update();