import { Terminal } from "../TERMINAL/terminal.js";
import { BallPhysics } from "../engine/physics.js";
const terminal = new Terminal
const bp = new BallPhysics

export class UI {

    constructor() {
        this.fps = document.getElementById("fps");
        this.sbtn = document.getElementById("settingsBTN");
        this.overlay = document.querySelector(".overlay");
        this.win = document.querySelector(".window");
        this.head = document.querySelector(".head");
        this.down = document.getElementById("down");
        this.min = document.getElementById("min");
        this.close = document.getElementById("close");
        this.output = document.getElementById("output");
        this.input = document.getElementById("input");
        this.termBTN = document.getElementById("termBTN");
        this.gravityI = document.getElementById("gravity")
        this.ballsI = document.getElementById("balls")
        this.applyBTN = document.getElementById("sub") 

        this.mouse = {
            x: 0,
            y: 0,

            leftDown: false,
            leftUp: false,

            vx: 0,
            vy: 0,

            lasts: {
                x: 0,
                y: 0
            }
        };

        this.term = {
            open: true,
        }

        this.state = {
            selected: 0
        };

        this.counter = false

        // mouse
        document.addEventListener("mousemove", (event) => {

            this.mouse.lasts.x = this.mouse.x;
            this.mouse.lasts.y = this.mouse.y;

            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;

            this.mouse.vx = this.mouse.x - this.mouse.lasts.x;
            this.mouse.vy = this.mouse.y - this.mouse.lasts.y;

        });
        // mouse
        document.addEventListener("mousedown", (event) => {

            if (event.button === 0) {
                this.mouse.leftDown = true;
            }

        });
        // mouse
        document.addEventListener("mouseup", (event) => {

            if (event.button === 0) {

                this.mouse.leftDown = false;
                this.mouse.leftUp = true;

            }

        });

        //-------------------------------------------------
        //                UI CODES
        //-------------------------------------------------

        // settings open
        this.sbtn.addEventListener("click", () => {
            this.overlay.style.display = "flex";
        })

        // settings close
        this.overlay.addEventListener("click", (event) => {
            if (event.target === this.overlay) {
                this.overlay.style.display = "none";
            }
        })

        // terminal open
        this.termBTN.addEventListener("click", () => {
            this.win.style.display = "block";
        });

        // terminal close
        this.close.addEventListener("click", ()=> {
            this.win.style.display = "none";
        });

        // terminal close
        this.down.addEventListener("click", ()=> {
            this.win.style.display = "none";
        });

        // terminal minimalize
        this.min.addEventListener("click", ()=> {
            if (this.counter) {
                this.win.style.top = "50px"
                this.win.style.left = "100px"
                this.win.style.width = "50vw"
                this.win.style.height = "80vh"
                this.counter = false
            } else if (!this.counter) {
                this.win.style.top = "0"
                this.win.style.left = "0"
                this.win.style.width = "99.7vw"
                this.win.style.height = "99.7vh"
                this.counter = true
            }
        });

        // window dragging
        let dragging = false;

        let offsetX = 0;
        let offsetY = 0;

        this.head.addEventListener("mousedown", (event) => {
            dragging = true;

            const rect = this.win.getBoundingClientRect();

            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;
        });

        document.addEventListener("mousemove", (event) => {
            if (!dragging) return;

            this.win.style.left = (event.clientX - offsetX) + "px";
            this.win.style.top = (event.clientY - offsetY) + "px";
        });

        document.addEventListener("mouseup", () => {
            dragging = false;
        });

        this.input.addEventListener("keydown", (event) => {

            if (event.key !== "Enter") return;

            const command = this.input.value.trim();

            if (command === "") return;

            const resp = terminal.process(command);

            this.output.innerHTML += `
                <div>> ${command}</div>
                <div>${resp.termi}</div>
            `;

            this.input.value = "";
        });


        // setting sub button
         this.applyBTN.addEventListener("click", () => {
        const gravity = Number(this.gravityInput.value);

        for (const ball of world.objects) {
            if (ball.type === "ball") {
                bp.setGravity(gravity);
            }
        }
    });

    }

    prodFPS(FPS) {
        this.fps.innerText = "FPS: " + FPS;
    }

    cursor() {
        return this.mouse;
    }

}