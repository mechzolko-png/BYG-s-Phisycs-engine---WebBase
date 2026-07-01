// This file contains the worlds rules like gravity...

export class World {
    constructor (c) {
        this.gravity = 980;
        this.width = c.width;
        this.height = c.height;
        this.objects = []; 
    };

    add (object) {
        this.objects.push(object);
    };

    update (dt) {
        for (const object of this.objects) {
            object.update(this,dt);
        };
    };

    draw (ctx) {
        for (const object of this.objects) {
            object.draw(ctx);
        };
    };
};