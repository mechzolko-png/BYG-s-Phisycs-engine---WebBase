import { BallPhysics } from "./physics.js";

export class ball {
    constructor (positionX,positionY,radius,mass,bounce,worldSize,dt) {
        this.data = {
            x: positionX,
            y: positionY,
            r: radius,
            m: mass,
            b: bounce,
            friction: 0.8,

            velocity: {
                x: 0,
                y: 0
            },

            state: {
                collision: false,
                onTouch: false,
                selected: false
            },

            world: {
                height: worldSize.height,
                width: worldSize.width
            },

            dt: dt
        };
        this.bp = new BallPhysics(this.data,this.data.world,this.data.dt)
    };

    update (dt) {
        this.bp.update(dt);
        return this.object = {x: this.data.x, y: this.data.y, r: this.data.r};
    };
};

export class wall {
    constructor () {
        // wall data
    };
};