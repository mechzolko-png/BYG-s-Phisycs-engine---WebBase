import { ball } from "./object.js";
import { Random } from "./math.js";
import { Collision } from "./collision.js";
import { wall } from "./object.js";
import { Interact } from "../interact/basicInteract.js";
const random = new Random;
const collision = new Collision;
const interact = new Interact;


export class World {

    constructor (canvas) {
        this.size = {
            height: canvas.height,
            width: canvas.width
        };

        this.objects = [];
        this.RenderData = [];
        this.collisionData = [];
        this.amount = 30

        this.place(0, 700, 1200, 700);   
        this.place(0, 0, 0, 700);        
        this.place(1200, 0, 1200, 700);  
        this.place(0, 0, 1200, 0);       

        this.place(200, 550, 500, 450);
        this.place(500, 450, 800, 550);
        this.place(700, 300, 1000, 300);
        this.place(300, 250, 500, 150);

    };

    spawn (x,y,vx,vy) {
        this.x = this.size.width;
        this.y = this.size.height;
        // let ID = this.objects.length;
        const Ball = new ball(x,y,vx,vy,20,1,0.5,this.size)//,this.dt,)//ID);
        this.objects.push(Ball);
        // console.log("BALL ID SPAWN: ", ID);
        // return this.ball
        console.log(
            "SPAWN SNAPSHOT:",
            "x =", Ball.data.x,
            "y =", Ball.data.y,
            "vx =", Ball.data.velocity.x,
            "vy =", Ball.data.velocity.y,
            "dt =", Ball.data.dt
        );
    };

    place (x1,y1,x2,y2) {
        this.wall = new wall(x1,y1,x2,y2);
        this.objects.push(this.wall);
    };

    update(dt) {
        this.RenderData = [];
        for (const object of this.objects) {     
            if (object.type == "ball") {
                interact.grabBall(object);
                const obj = object.update(dt);
                this.RenderData.push(obj);
            }

            if (object.type == "wall") {
                const obj = object.getData();
                this.RenderData.push(obj)
            };

            collision.update(this.objects);
        };
    };

    getRenderData () {
        return this.RenderData;
    };
};