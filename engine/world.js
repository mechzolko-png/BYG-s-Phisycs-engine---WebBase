// This file contains the worlds rules like gravity...

import { MathOP } from "./help.js";

let mo = new MathOP();

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
        for (let i = 0; i < this.objects.length; i++) {
            let a = this.objects[i];
            let closeObjects = [];
            let isColliding = false;

            for (let j = 0; j < this.objects.length; j++) {
                let b = this.objects[j];

                if (a === b) {continue};
            
                let dx = b.x - a.x;
                let dy = b.y - a.y;

                let maxDist = 100;
                if (Math.abs(dx) > maxDist || Math.abs(dy) > maxDist) {continue};
                closeObjects.push(b);
            };

            for (let b of closeObjects) {
                let dist = mo.distance(a, b);

                if (dist <= a.width + b.width) {

                    let tempX = a.speedX;
                    let tempY = a.speedY;

                    a.speedX = b.speedX;
                    a.speedY = b.speedY;

                    b.speedX = tempX;
                    b.speedY = tempY;

                    isColliding = true;
                };

                console.log(dist);
            };

            a.update(this,dt,isColliding);
        };
    };

    draw (ctx) {
        for (const object of this.objects) {
            object.draw(ctx);
        };
    };
};