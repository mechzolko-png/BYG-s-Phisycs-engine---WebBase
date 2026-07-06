export class GameObject {
    constructor (positionX,positionY,width,height,shape,world,color,wall) {
        this.x = positionX;
        this.y = positionY;
        this.speedX = 0;
        this.speedY = 1;
        this.landingLoss = 0.9;
        this.friction = 20;

        this.vektor = {
            x: this.speedX,
            y: this.speedY,
        };

        this.isOnGround = false;
        this.wall = wall;

        this.width = width;
        this.height = height;
        this.shape = shape;
        this.color = color;

        if (this.x == "random") {
            this.x = Math.random() * world.width;
        };
    
        if (this.y == "random") {
            this.y = Math.random() * world.height;
        } ;

    };

    update (world,dt,isColliding) {
        // gravity
        this.speedY += world.gravity * dt;

        // moveing
        this.x += this.speedX * dt;
        this.y += this.speedY * dt;

        

        this.vektor = {
            x: this.speedX,
            y: this.speedY,
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
       
        const groundNormal   = { x: 0, y: -1 };
        const ceilingNormal  = { x: 0, y: 1 };
        const leftWallNormal = { x: 1, y: 0 };
        const rightWallNormal= { x: -1, y: 0 };

     
        if (this.y >= world.height - this.height) {
            this.y = world.height - this.height; 
            const r = world.reflect(this.vektor, groundNormal, this.landingLoss);
            this.speedX = r.x;
            this.speedY = r.y;
            this.isOnGround = true;

       
        } else if (this.y <= 0 + this.height) {
            this.y = 0 + this.height;
            const r = world.reflect(this.vektor, ceilingNormal, this.landingLoss);
            this.speedX = r.x;
            this.speedY = r.y;
            this.isOnGround = true;

        } else {
            this.isOnGround = false;
        };

       
        if (this.x >= world.width - this.width) {
            this.x = world.width - this.width; 
            const r = world.reflect(this.vektor, rightWallNormal, this.landingLoss);
            this.speedX = r.x;
            this.speedY = r.y;

       
        } else if (this.x <= 0 + this.width) {
            this.x = 0 + this.width;
            const r = world.reflect(this.vektor, leftWallNormal, this.landingLoss);
            this.speedX = r.x;
            this.speedY = r.y;
        };

        if (isColliding) {
            this.color = this.color;
        } else {
            this.color = this.color;
        }

    };

    draw (ctx) { 
        if (this.shape == "rect") {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        } else if (this.shape == "circle") {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.width,0,Math.PI * 2);
            ctx.fill();
        }
    };

};


export class WallObject {
    constructor(x1, y1, x2, y2, color) {
        this.color = color;

    
        this.a = { x: x1, y: y1 };
        this.b = { x: x2, y: y2 };

  
        let wx = x2 - x1;
        let wy = y2 - y1;

        let nx = -wy;
        let ny = wx;


        let len = Math.sqrt(nx * nx + ny * ny);
        nx /= len;
        ny /= len;


        this.normal = { x: nx, y: ny };
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.stroke();
    };

    drawN(ctx) {
     
        let mx = (this.a.x + this.b.x) / 2;
        let my = (this.a.y + this.b.y) / 2;

        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(
            mx + this.normal.x * 30,
            my + this.normal.y * 30
        );
        ctx.strokeStyle = "green";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}