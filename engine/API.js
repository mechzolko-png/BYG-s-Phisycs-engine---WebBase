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
        this.lastTime = 0;
    }


    update (ct) {
        // game loop
        const dt = (ct - this.lastTime) / 1000;

        this.lastTime = ct;

        this.collisions = this.world.update(dt);
        this.render.render(this.world.getRenderData());
    }

    //-------------------------------------------------------------------------
    // SPECIAL PHYSICS FUNCTIONS
    isCollideWith(ID1, ID2) {
        return this.collisions.some(c =>
            (c.objectA === ID1 && c.objectB === ID2) ||
            (c.objectA === ID2 && c.objectB === ID1)
        );
    }

    //-------------------------------------------------------------------------
    // PROPERTY FUNCTIONS
    addVelocity (ID,x,y) {
        this.world.addVelocity(ID,x,y)
    }

    getVelocity (ID) {
        let res = this.world.getVelocity(ID)
        return res
    }

    setMass (ID,mass) {
        this.world.setMass(ID,mass);
    }

    getMass(ID) {
        let res = this.world.getMass(ID)
        return res
    }

    setPosition (ID,x,y) {
        this.world.setPosition(ID,x,y)
    }

    getPosition (ID) {
        let res = this.world.getPosition(ID)
        return res
    }

    setRadius (ID,r) {
        this.world.setRadius(ID,r)
    }

    getRadius (ID) {
        let res = this.world.getRadius(ID)
        return res
    }

    setBounce (ID,b) {
        this.world.setBounce(ID,b)
    }

    getBounce (ID) {
        let res = this.world.getBounce(ID)
        return res
    }

    //-------------------------------------------------------------------------
    // BUILDING API FUNCTIONS
    destroy (ID) {
        this.world.destroy(ID);
    }

    place (x1,y1,x2,y2) {
        this.world.place(x1,y1,x2,y2);
    }

    spawn (x,y,vx,vy) {
        let ball = this.world.spawn(x,y,vx,vy);
        return ball;
    }

}


/*

TODO:
- 
- 

*/