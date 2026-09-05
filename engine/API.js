// Engine setup
import { World } from "./world.js";
import { Render } from "./render.js";
import { Random } from "./math.js";
import { ball } from "./object.js";



export class PhysicsWorld {
    constructor () {
        // engine building on birth
        this.render = new Render();
        this.render.setUpCanvas();
        this.world = new World(this.render.canvas);
        this.random = new Random()
        this.collisions = [];
    }

    spawn (x,y,vx,vy) {
        let ball = this.world.spawn(x,y,vx,vy);
        return ball;
    }

    update () {
        // game loop
        let lastTime = 0
        const loop = (ct) => {
            const dt = (ct - lastTime) / 1000;

            lastTime = ct;

            this.collisions = this.world.update(dt);
            this.render.render(this.world.getRenderData());

            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
    }

    isCollideWith (ID1,ID2) {
        return this.collisions == {1:ID1, 2:ID2} || this.collisions == {1:ID2,2:ID1};
    }

}


/*

API:
- isCollidedWith(): |function that returns if the selected object collided with the other object| >> needs 2 args: the target object, the collide object >> returns: ture or false
- 

*/