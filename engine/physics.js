export class BallPhysics {
    constructor(ball, world) {
        this.ball = ball;
        this.world = world;

        this.stopCounterY1 = 0;
        this.stopCounterX1 = 0;
        this.stopCounterY2 = 0;
        this.stopCounterX2 = 0;
        this.collisionY = false;
        this.collisionX = false;
        this.peacedY = false;
        this.peacedX = false;

        this.gravity = 9810;
    }

    applyGravity(dt) {
        this.ball.velocity.y += (this.gravity * dt);
    }

    move(dt) {
        this.ball.x += this.ball.velocity.x * dt;
        this.ball.y += this.ball.velocity.y * dt;
    }

    applyCollision() {
        this.collisionY = false;
        this.collisionX = false;

        const bottom = this.world.height - this.ball.r;
        const top = this.ball.r;
        const left = this.ball.r;
        const right = this.world.width - this.ball.r;

        // bottom wall
        if (this.ball.y > bottom) {
            this.ball.y = bottom;

            if (this.ball.velocity.y > 0) {
                this.ball.velocity.y *= -1;
                this.ball.velocity.y *= this.ball.b;
            }
            this.collisionY = true;
        }

        // top wall
        if (this.ball.y < top) {
            this.ball.y = top;

            if (this.ball.velocity.y < 0) {
                this.ball.velocity.y *= -1;
                this.ball.velocity.y *= this.ball.b;
            }
            this.collisionY = true;
        }

        // left wall
        if (this.ball.x < left) {
            this.ball.x = left;

            if (this.ball.velocity.x < 0) {
                this.ball.velocity.x *= -1;
                this.ball.velocity.x *= this.ball.b;
            }
            this.collisionX = false;
        }

        // right wall
        if (this.ball.x > right) {
            this.ball.x = right;

            if (this.ball.velocity.x > 0) {
                this.ball.velocity.x *= -1;
                this.ball.velocity.x *= this.ball.b;
            }
            this.collisionX = false;
        }
    }

    movePeace () {
        // Y peacer
        if (Math.abs(this.ball.velocity.y) <= 0.5 && this.collisionY) {  // first speed gate
            this.stopCounterY1++;
        };

        if (this.stopCounterY1 >= 5 && this.collisionY) {
            this.ball.velocity.y = 0;
            this.peacedY = true;
        };

        // X peacer
        if (Math.abs(this.ball.velocity.x) <= 0.5 && this.collisionX) { // first speed gate
            this.stopCounterX1++;
        };

        if (this.stopCounterX1 >= 5 && this.collisionX) {
            this.ball.velocity.x = 0;
            this.peacedX = true;
        };
    };

    update(dt) {
        this.applyGravity(dt);
        this.movePeace();
        this.move(dt);
        this.applyCollision();
    };
};