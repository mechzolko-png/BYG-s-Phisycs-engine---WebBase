export class Random {
    randint(a,b) {
        return Math.floor(Math.random() * (a - b + 1)) + b;
    };
};

export class formula {
    distance (x,y) {
        return (x*x + y*y)
    };
}