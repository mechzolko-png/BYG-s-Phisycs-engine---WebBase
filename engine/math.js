export class Random {
    randint(a,b) {
        return Math.floor(Math.random() * (a - b + 1)) + b;
    };
};

export class formula {
    // pithagoryan theory
    distance (x,y) {
        return (Math.sqrt(x*x + y*y))
    };

    normalize (x,y,distance) {
        return normal = {x: x/distance, y: y / distance};
    }

    dot (x1,y1,x2,y2) {
        return x1 * x2 + y1 * y2;
    };
}