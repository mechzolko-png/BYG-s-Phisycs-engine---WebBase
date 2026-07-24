export class UI {
    constructor () {
        this.fps = document.getElementById("fps");
    };

    prodFPS (FPS) {
        this.fps.innerText = "FPS: " + FPS;
    };
};