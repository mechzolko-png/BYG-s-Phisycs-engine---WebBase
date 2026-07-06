// This file contains the worlds rules like gravity...

import { MathOP } from "./help.js";

let mo = new MathOP();

export class World {
    constructor (c) {
        this.gravity = 980;
        this.width = c.width;
        this.height = c.height;
        this.objects = [];
        this.map = []; 
    };

    add (object) {
        this.objects.push(object);
        let action = "Add object";
    };

    place (barrier) {
        this.map.push(barrier);
        let action = "place a barrier";
    };

    
    reflect(v, n, restitution = 1) {
        const dot = mo.dot(v.x, v.y, n.x, n.y);

        return {
            x: v.x - (1 + restitution) * dot * n.x,
            y: v.y - (1 + restitution) * dot * n.y,
        };
    }

    update (dt) {
        for (let i = 0; i <= 0; i++) { 
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
                const dist = mo.distance(a, b);
                const minDist = a.width + b.width;

                if (dist < minDist && dist > 0) {
                    
                    const normal = mo.normalize(mo.subtract(b, a));

                    
                    const penetration = minDist - dist;
                    const correction = penetration / 2; 
                    a.x -= normal.x * correction;
                    a.y -= normal.y * correction;
                    b.x += normal.x * correction;
                    b.y += normal.y * correction;

                    const relVel = {
                        x: b.speedX - a.speedX,
                        y: b.speedY - a.speedY,
                    };
                    const velAlongNormal = mo.dot(relVel.x, relVel.y, normal.x, normal.y);

                    
                    if (velAlongNormal > 0) continue;

                    const restitution = Math.min(a.landingLoss, b.landingLoss);
                    const j = -(1 + restitution) * velAlongNormal / 2; 

                    a.speedX -= j * normal.x;
                    a.speedY -= j * normal.y;
                    b.speedX += j * normal.x;
                    b.speedY += j * normal.y;

                    isColliding = true;
                };
            };

            a.update(this,dt,isColliding);
            let action = "world update";
        };

       
        for (const wall of this.map) {
            const closest = mo.closestPointOnSegment(a, wall.a, wall.b);
            const diff = mo.subtract(a, closest);
            const dist = Math.hypot(diff.x, diff.y);

            if (dist <= a.width) {
                
                const penetration = a.width - dist;
                a.x += wall.normal.x * penetration;
                a.y += wall.normal.y * penetration;

                const r = this.reflect(a.vektor, wall.normal, a.landingLoss);
                a.speedX = r.x;
                a.speedY = r.y;
            };
        };
        };

    };


    draw (ctx) {
        for (const object of this.objects) {
            object.draw(ctx);
        };

        for (const barrier of this.map) {
            barrier.draw(ctx);
            barrier.drawN(ctx);
        };
        let action = "drawing";
    };
};