export class GameObject {
    constructor (positionX,positionY,width,height,shape,world) {
        this.x = positionX;
        this.y = positionY;
        this.speedX = 1000;
        this.speedY = 1000;
        this.landingLoss = 0.8;
        this.friction = 20;

        this.isOnGround = false;

        this.width = width;
        this.height = height;
        this.shape = shape;

        if (this.x == "random") {
            this.x = Math.random() * world.width
        }
    };

    update (world,dt) {
        // gravity
        this.speedY += world.gravity * dt;

        // moveing
        this.x += this.speedX * dt;
        this.y += this.speedY * dt;

        // Collision with the ground
        if (this.y >= world.height - this.height) {
            this.y = world.height - this.height;
            this.speedY = this.speedY * this.landingLoss;
            this.speedY = this.speedY * -1;
            this.isOnGround = true;
        } else if (this.y <= 0 + this.height) {
            this.speedY = this.speedY * this.landingLoss;
            this.y = 0 + this.height;
            this.speedY = this.speedY * -1;
            this.isOnGround = true;
        } else {
            this.speedX = this.speedX;
            this.speedY = this.speedY;
            this.isOnGround = false;
        };

        // friction 
        if (this.isOnGround) {
            const friction = this.friction * dt;

            if (Math.abs(this.speedX) <= friction) {
                this.speedX = 0;
            } else {
                this.speedX -= friction * Math.sign(this.speedX);
            }
        };



        // Collision with the walls
        if (this.x >= world.width - this.width) {
            this.speedX = this.speedX * this.landingLoss;
            this.x = world.width - this.width;
            this.speedX = this.speedX * -1;
        } else if (this.x <= 0 + this.width) {
            this.speedX = this.speedX * this.landingLoss;
            this.x = 0 + this.width;
            this.speedX = this.speedX * -1;
        }

    };


    draw (ctx) { // Shapes: polygon,rect,circle
        if (this.shape == "rect") {
            ctx.fillRect(this.x,this.y,this.width,this.height,"black");
        } else if (this.shape == "circle") {
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.width,0,Math.PI * 2);
            ctx.fill();
        }
    };

};