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
        
        for (let i = 0; i < this.amount; i++) { // world object born -> new balls spawn
            // this.spawn(200,500,100,0);
            // this.spawn(2000,500,-1000,0);
            this.spawn(random.randint(0,this.size.width),random.randint(0,this.size.height),random.randint(-1000,1000),random.randint(-1000,1000))
        };

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
        this.x = this.size.width
        this.y = this.size.height;
        this.ball = new ball(x,y,vx,vy,20,1,0.5,this.size,this.dt);
        this.objects.push(this.ball);
    };

    place (x1,y1,x2,y2) {
        this.wall = new wall(x1,y1,x2,y2);
        this.objects.push(this.wall);
    };

    update(dt) {
        this.RenderData = [];
        collision.update(this.objects)
        for (const object of this.objects) {
            
            if (object.type == "ball") {
                interact.grabBall(object)
                const obj = object.update(dt);
                this.RenderData.push(obj);
            };

            if (object.type == "wall") {
                const obj = object.getData();
                this.RenderData.push(obj)
            };
        };
    };

    getRenderData () {
        return this.RenderData;
    };
};