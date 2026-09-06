import { BallPhysics } from "./physics.js";
import { Random } from "./math.js";

const random = new Random


export class ball {
    constructor (positionX,positionY,vx,vy,radius,mass,bounce,worldSize,dt,ID) {
        this.type = "ball";
        this.data = {
            x: positionX,
            y: positionY,
            r: radius,
            m: mass,
            b: bounce,
            friction: 0.9,
            restitution: 0.9,

            velocity: {
                x:vx, //random.randint(-1000,10000),
                y:vy //random.randint(-1000,1000)
            },

            state: {
                onTouch: false,
            },

            world: {
                height: worldSize.height,
                width: worldSize.width
            },
            ID: ID,
        };
        this.bp = new BallPhysics(this.data,this.data.world,this.data.dt)
    };

    update (dt) {
        this.bp.update(dt);
        return this.object = {x: this.data.x, y: this.data.y, r: this.data.r, type: "ball"};
    };
};

export class wall {
    constructor (aX,aY,bX,bY,) {
        this.type = "wall";
        this.ax = aX;
        this.ay = aY;
        this.bx = bX;
        this.by = bY;
    };

    getData () {
        return this.object = {x1: this.ax, y1: this.ay,x2: this.bx,y2: this.by, type:"wall" };
    };
};