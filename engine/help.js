// short forms for often used codes

export class MathOP {
    constructor () {
        
    };

    distance (a, b) {
        let dx = b.x - a.x;
        let dy = b.y - a.y;

        return Math.sqrt(dx * dx + dy * dy);
    };
};