import { ball } from "./object.js";
import { Random } from "./math.js";
const random = new Random
export class World {
    constructor (canvas) {
        this.size = {
            height: canvas.height,
            width: canvas.width
        };
        this.objects = [];
        this.RenderData = [];
        
        for (let i = 0; i < 10; i++) {
            this.spawn();
        }
    };

    spawn () {
        this.x = this.size.width
        this.y = this.size.height;
        this.ball = new ball(random.randint(0,this.x),random.randint(0,this.y),20,1,0.9,this.size,this.dt);
        this.objects.push(this.ball);
    };

    update(dt) {
        this.RenderData = [];

        for (const object of this.objects) {
            const obj = object.update(dt);

            this.RenderData.push(obj);
        };
    };

    getRenderData () {
        return this.RenderData;
    };
};