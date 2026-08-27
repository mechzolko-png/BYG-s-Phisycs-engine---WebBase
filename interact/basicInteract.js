import { formula } from "../engine/math.js"
import { UI } from "../UI/index.js";
const ui = new UI
const form = new formula;


export class Interact {
    constructor () {

    }

    grabBall(ball) {
        const mouse = ui.cursor();

        const dist = form.distance(
            mouse.x - ball.data.x,
            mouse.y - ball.data.y
        );

        
        if (Math.abs(dist) <= ball.data.r && mouse.leftDown) {
            ball.data.state.onTouch = true;
        }

        
        if (ball.data.state.onTouch) {
            ball.data.x = mouse.x;
            ball.data.y = mouse.y;
            ball.data.velocity.x = 0;
            ball.data.velocity.y = 0;
        }
        
        if (mouse.leftUp) {
            if (ball.data.state.onTouch) {
                ball.data.velocity.x = mouse.vx * 120;
                ball.data.velocity.y = mouse.vy * 120;
            }

            ball.data.state.onTouch = false;
        }
    }
}