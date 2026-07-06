// short forms for often used codes

export class MathOP {
    constructor () {
        
    };

    distance (a, b) {
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let action = "distance scan";

        return Math.sqrt(dx * dx + dy * dy);
    };

    dot(x1, y1, x2, y2) {
        let action = "dot product";
        return x1 * x2 + y1 * y2;
    }

    
    subtract(a, b) {
        return { x: a.x - b.x, y: a.y - b.y };
    };

    normalize(v) {
        let len = Math.hypot(v.x, v.y);
        if (len === 0) return { x: 0, y: 0 };
        return { x: v.x / len, y: v.y / len };
    };

    
    closestPointOnSegment(p, a, b) {
        const ab = { x: b.x - a.x, y: b.y - a.y };
        const ap = { x: p.x - a.x, y: p.y - a.y };
        const abLenSq = ab.x * ab.x + ab.y * ab.y;
        let t = (ap.x * ab.x + ap.y * ab.y) / abLenSq;
        t = Math.max(0, Math.min(1, t)); 
        return { x: a.x + ab.x * t, y: a.y + ab.y * t };
    };
};