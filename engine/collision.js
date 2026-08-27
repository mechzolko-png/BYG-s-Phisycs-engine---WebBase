import { formula } from "./math.js"
import { wall } from "./object.js";
const form = new formula

export class Collision {
    
    detection (distance,radius,object,other) { // get positions, radius
        if (distance <= 2*radius) {
            this.respons(object,other);
        }
    };

    wallBallDetection(wall, ball) {

        let ax = wall.ax;
        let ay = wall.ay;
        let bx = wall.bx;
        let by = wall.by;

        // A -> B
        let dir = {
            x: bx - ax,
            y: by - ay
        };

        
        let length = form.distance(dir.x, dir.y);

        dir.x /= length;
        dir.y /= length;

     
        let x = ball.data.x - ax;
        let y = ball.data.y - ay;

       
        let dist = form.dot(x, y, dir.x, dir.y);

        let point = {
            x: ax + dir.x * dist,
            y: ay + dir.y * dist
        };

      
        let AP = {
            x: point.x - ax,
            y: point.y - ay
        };

       
        let distanceAlongWall = form.dot(
            AP.x,
            AP.y,
            dir.x,
            dir.y
        );

        let wallLength = form.distance(
            bx - ax,
            by - ay
        );

      
        if (
            distanceAlongWall >= 0 &&
            distanceAlongWall <= wallLength
        ) {

            let dx = ball.data.x - point.x;
            let dy = ball.data.y - point.y;

            let distance = form.distance(dx, dy);

            
            if (distance <= ball.data.r) {

                console.log("WALL COLLISION!");

                this.wallBallResponse(
                    wall,
                    ball,
                    point
                );
            }
        }
    }

    respons(object, other) {
        let dx = object.data.x - other.data.x;
        let dy = object.data.y - other.data.y;

        let dist = form.distance(dx, dy);

        let nx = dx / dist;
        let ny = dy / dist;

        
        let rvx =
            object.data.velocity.x -
            other.data.velocity.x;

        let rvy =
            object.data.velocity.y -
            other.data.velocity.y;

        
        let dot = rvx * nx + rvy * ny;

        
        if (dot > 0) {
            return;
        }

       
        let normalX = nx * dot;
        let normalY = ny * dot;

        
        let newRvx = rvx - 2 * normalX;
        let newRvy = rvy - 2 * normalY;

        
        let deltaRvx = newRvx - rvx;
        let deltaRvy = newRvy - rvy;

       
        let changeX = deltaRvx / 2;
        let changeY = deltaRvy / 2;

      
        object.data.velocity.x += changeX * 0.9;
        object.data.velocity.y += changeY * 0.9;

       
        other.data.velocity.x -= changeX * 0.9;
        other.data.velocity.y -= changeY * 0.9;

        let overlap = object.data.r + other.data.r - dist;

        if (overlap > 0) {
            let correction = overlap * 0.5;

            object.data.x += nx * correction;
            object.data.y += ny * correction;

            other.data.x -= nx * correction;
            other.data.y -= ny * correction;

        }
    }

    wallBallResponse(wall, ball, point) {
        let nx = ball.data.x - point.x;
        let ny = ball.data.y - point.y;

        let length = form.distance(nx, ny);

        nx /= length;
        ny /= length;

        let dot =
            ball.data.velocity.x * nx +
            ball.data.velocity.y * ny;

        if (dot >= 0) {
            return;
        }

        // response
        ball.data.velocity.x -= 2 * dot * nx * 0.9;
        ball.data.velocity.y -= 2 * dot * ny * 0.99;

        // correction
        let overlap = ball.data.r - length;

        if (overlap > 0) {
            ball.data.x += nx * overlap;
            ball.data.y += ny * overlap;
        }
    }

      update(objects) {
        for (let i = 0; i <= 0; i++) { // collision check in one frame

            for (let i = 0; i < objects.length; i++) {
                for (let j = i + 1; j < objects.length; j++) {
                    let object = objects[i];
                    let other = objects[j];

                    // ball - ball
                    if (object.type == "ball" && other.type == "ball") {
                        let distance = form.distance(
                            other.data.x - object.data.x,
                            other.data.y - object.data.y
                        );

                        this.detection(
                            distance,
                            object.data.r,
                            object,
                            other
                        );
                    }

                    // wall - ball
                    if (object.type == "wall" && other.type == "ball") {
                        this.wallBallDetection(object, other);    
                    }

                    // ball - wall
                    if (object.type == "ball" && other.type == "wall") {
                        this.wallBallDetection(other, object);        
                    }
                }
            }

        }
    }
}
