export class Render {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.setUpCanvas();
    }

    setUpCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    render(data) {
        this.renderBackground();

        for (const object of data) {

            if (object.type === "ball") {
                this.renderBall(object);
            }

            if (object.type === "wall") {
                this.renderWall(object);
            }

        }
    }

    renderBackground() {
        this.ctx.fillStyle = "#101010";
        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    renderBall(ball) {

        if (
            !Number.isFinite(ball.x) ||
            !Number.isFinite(ball.y) ||
            !Number.isFinite(ball.r)
        ) {
            console.error("Invalid ball render data:", ball);
            return;
        }

        const ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(
            ball.x,
            ball.y,
            ball.r,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "red";
        ctx.fill();

        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    renderWall(wall) {

        if (
            !Number.isFinite(wall.x1) ||
            !Number.isFinite(wall.y1) ||
            !Number.isFinite(wall.x2) ||
            !Number.isFinite(wall.y2)
        ) {
            console.error("Invalid wall render data:", wall);
            return;
        }

        const ctx = this.ctx;

        ctx.beginPath();

        ctx.moveTo(wall.x1, wall.y1);
        ctx.lineTo(wall.x2, wall.y2);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.stroke();
    }
}