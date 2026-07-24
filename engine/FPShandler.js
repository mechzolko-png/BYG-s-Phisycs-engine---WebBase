export class Fps {
    constructor() {
        this.lastTime = 0;

        this.frameCounter = 0;
        this.fpsTimer = 0;

        this.dt = 0;
        this.FpS = "LOADING...";
    }

    handleFPS(currentTime) {
        if (this.lastTime === 0) {
            this.lastTime = currentTime;
            return 0;
        }

        this.dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.frameCounter++;
        this.fpsTimer += this.dt;

        if (this.fpsTimer >= 1) {
            this.FpS = this.frameCounter;
            this.frameCounter = 0;
            this.fpsTimer -= 1;
        }

        return this.dt;
    }
}