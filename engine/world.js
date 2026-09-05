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
        this.coll = [];
        this.collisions = []
        
        // for (let i = 0; i < this.amount; i++) { // world object born -> new balls spawn
        //     // this.spawn(200,500,100,0);
        //     // this.spawn(2000,500,-1000,0);
        //     this.spawn(random.randint(0,this.size.width),random.randint(0,this.size.height),random.randint(-1000,1000),random.randint(-1000,1000))
        // };

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
        let ID = this.objects.length;
        this.ball = new ball(x,y,vx,vy,20,1,0.5,this.size,this.dt,ID);
        this.objects.push(this.ball);
        return this.ball
    };

    place (x1,y1,x2,y2) {
        this.wall = new wall(x1,y1,x2,y2);
        this.objects.push(this.wall);
    };

    update(dt) {
        this.RenderData = [];
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
        this.coll = collision.update(this.objects);
        if (this.coll.length > 0) {console.log(this.coll);}
        return this.coll
    };

    getRenderData () {
        return this.RenderData;
    };
};



/*
THINGS TO GET DONE HERE:

>>API things
- place(): |Function to place walls-platforms| >> needs 4 args: the walls 2 points koordinates(4),
- spawn(): |Function to summon balls and different kind of objects| >> needs 3 args: the balls position(2), the type of object you want to spawn
- getObject(): |Function that returns an object by it's ID / name| >> needs 1 arg: the object ID or name >> returns: object
- getCollision(): |Function that returns all the collision in the game| >> needs no arg >> returns: a data object thats all the collision data is inside like which object collided with the other.
*/