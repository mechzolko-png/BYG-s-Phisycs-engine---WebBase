// ChatGPT made renderer

export class Render {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.colors = [
            "#ff4d6d",
            "#4dabf7",
            "#69db7c",
            "#ffd43b",
            "#cc5de8",
            "#ff922b"
        ];
    }

    setUpCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx.imageSmoothingEnabled = true;
    }

    render(data) {
        this.renderBackground();
        this.renderGrid(50);

        for (let i = 0; i < data.length; i++) {
            this.renderShadow(data[i]);
        }

        for (let i = 0; i < data.length; i++) {
            this.renderBall(data[i], i);
        }

        this.renderVignette();
    }

    renderBackground() {
        const ctx = this.ctx;
        const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            this.canvas.height
        );

        gradient.addColorStop(0, "#12151f");
        gradient.addColorStop(1, "#07090f");

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    renderGrid(step = 50) {
        const ctx = this.ctx;

        ctx.save();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
        ctx.lineWidth = 1;

        ctx.beginPath();

        for (let x = 0; x <= this.canvas.width; x += step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.canvas.height);
        }

        for (let y = 0; y <= this.canvas.height; y += step) {
            ctx.moveTo(0, y);
            ctx.lineTo(this.canvas.width, y);
        }

        ctx.stroke();

        ctx.restore();
    }

    renderShadow(object) {
        const ctx = this.ctx;

        const groundY = this.canvas.height - 20;

        const distanceFromGround = Math.max(
            0,
            groundY - object.y
        );

        const heightFactor = Math.max(
            0.1,
            1 - distanceFromGround / 700
        );

        const shadowWidth =
            object.r * (0.5 + heightFactor * 0.7);

        const shadowHeight =
            object.r * (0.1 + heightFactor * 0.15);

        ctx.save();

        ctx.globalAlpha = 0.3 * heightFactor;
        ctx.fillStyle = "#000000";

        ctx.beginPath();

        ctx.ellipse(
            object.x,
            groundY,
            shadowWidth,
            shadowHeight,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }

    renderBall(object, index) {
        const ctx = this.ctx;

        const color = this.colors[index % this.colors.length];

        const x = object.x;
        const y = object.y;
        const r = object.r;

        ctx.save();

        // ---------------- GLOW ----------------

        const glow = ctx.createRadialGradient(
            x,
            y,
            r * 0.2,
            x,
            y,
            r * 1.8
        );

        glow.addColorStop(
            0,
            this.hexToRgba(color, 0.2)
        );

        glow.addColorStop(
            1,
            this.hexToRgba(color, 0)
        );

        ctx.fillStyle = glow;

        ctx.beginPath();
        ctx.arc(
            x,
            y,
            r * 1.5,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // ---------------- BALL ----------------

        const sphere = ctx.createRadialGradient(
            x - r * 0.35,
            y - r * 0.35,
            r * 0.1,

            x,
            y,
            r
        );

        sphere.addColorStop(
            0,
            "#ffffff"
        );

        sphere.addColorStop(
            0.2,
            this.lightenColor(color, 45)
        );

        sphere.addColorStop(
            0.65,
            color
        );

        sphere.addColorStop(
            1,
            this.darkenColor(color, 50)
        );

        ctx.fillStyle = sphere;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            r,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // ---------------- EDGE ----------------

        ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
        ctx.lineWidth = Math.max(1, r * 0.04);

        ctx.stroke();

        // ---------------- LIGHT REFLECTION ----------------

        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

        ctx.beginPath();

        ctx.arc(
            x - r * 0.3,
            y - r * 0.35,
            r * 0.15,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }

    renderVignette() {
        const ctx = this.ctx;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        const vignette = ctx.createRadialGradient(
            centerX,
            centerY,
            Math.min(
                this.canvas.width,
                this.canvas.height
            ) * 0.2,

            centerX,
            centerY,
            Math.max(
                this.canvas.width,
                this.canvas.height
            ) * 0.75
        );

        vignette.addColorStop(
            0,
            "rgba(0, 0, 0, 0)"
        );

        vignette.addColorStop(
            1,
            "rgba(0, 0, 0, 0.35)"
        );

        ctx.save();

        ctx.fillStyle = vignette;

        ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        ctx.restore();
    }

    hexToRgba(color, alpha) {
        let hex = color.replace("#", "");

        if (hex.length === 3) {
            hex = hex
                .split("")
                .map(char => char + char)
                .join("");
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    lightenColor(color, amount) {
        return this.changeColor(color, amount);
    }

    darkenColor(color, amount) {
        return this.changeColor(color, -amount);
    }

    changeColor(color, amount) {
        let hex = color.replace("#", "");

        if (hex.length === 3) {
            hex = hex
                .split("")
                .map(char => char + char)
                .join("");
        }

        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        r = Math.max(0, Math.min(255, r + amount));
        g = Math.max(0, Math.min(255, g + amount));
        b = Math.max(0, Math.min(255, b + amount));

        return `rgb(${r}, ${g}, ${b})`;
    }
}