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


    // SPAWN & BUILDING
    spawn (x,y,vx,vy) {
        this.x = this.size.width;
        this.y = this.size.height;
        let ID = this.objects.length;
        this.ball = new ball(x,y,vx,vy,20,1,0.5,this.size,this.dt,ID);
        this.objects.push(this.ball);
        return this.ball.data.ID
    };

    place (x1,y1,x2,y2) {
        this.wall = new wall(x1,y1,x2,y2);
        this.objects.push(this.wall);
    };

    destroy(ID) {
        let index = this.objects.findIndex(
            object => object.type === "ball" &&
                    object.data.ID === ID
        );

        if (index === -1) {
            return false;
        }

        this.objects.splice(index, 1);

        return true;
    }

    // PHYSICS MAIN FUNCTION
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

    getObjectByID (ID) {
        for (let object of this.objects) {
            if (object.type == "ball") {if (object.data.ID == ID) {return object}}
        } 
    }


    // PROPERTY API PIPE SYSTEM

    addVelocity (ID,x,y) {
        let ob = this.getObjectByID(ID);

        ob.data.velocity.x += x;
        ob.data.velocity.y += y;
    }

    getVelocity (ID) {
        let ob = this.getObjectByID(ID);

        return {x:ob.data.velocity.x,y:ob.data.velocity.y}
    }

    setMass (ID,mass) {
        let ob = this.getObjectByID(ID);
        ob.data.m = mass;
    }

    getMass (ID) {
        let ob = this.getObjectByID(ID);
        return ob.data.m;
    }

    setPosition (ID,x,y) {
        let ob = this.getObjectByID(ID);

        ob.data.x = x;
        ob.data.y = y;
    }

    getPosition (ID) {
        let ob = this.getObjectByID(ID);
        return {x:ob.data.x,y:ob.data.y};
    }

    setRadius (ID,r) {
        let ob = this.getObjectByID(ID);
        ob.data.r = r;
    }

    getRadius (ID) {
        let ob = this.getObjectByID(ID);
        return ob.data.r
    }

    setBounce (ID,b) {
        let ob = this.getObjectByID(ID);
        ob.data.b = b;
    }

    getBounce () {
        let ob = this.getObjectByID(ID);
        return ob.data.b;
    }

};



/*
THINGS TO GET DONE HERE:

>>API things
- 
*/