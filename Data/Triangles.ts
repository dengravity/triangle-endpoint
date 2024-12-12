export class TrianglesData {
    randomSide() {
        return Math.random() * 1000 + Number.EPSILON;
    }


    isosceleTriangles = [
        // a = b != c
        () => {
            let a: number, b: number, c: number;
            do {
                a = this.randomSide();
                b = a;
                c = this.randomSide();
            } while (
                a === c ||
                a + b <= c ||
                a + c <= b ||
                b + c <= a
            );
            return [a, b, c];
        },

        // a = c != b
        () => {
            let a: number, b: number, c: number;
            do {
                a = this.randomSide();
                c = a;
                b = this.randomSide();
            } while (
                a === b ||
                a + b <= c ||
                a + c <= b ||
                b + c <= a
            );
            return [a, b, c];
        },

        // b = c != a
        () => {
            let a: number, b: number, c: number;
            do {
                b = this.randomSide();
                c = b;
                a = this.randomSide();
            } while (
                b === a ||
                a + b <= c ||
                a + c <= b ||
                b + c <= a
            );
            return [a, b, c];
        }
    ];

    versatileTriangles = [
        () => {
            let a: number, b: number, c: number;
            do {
                a = this.randomSide();
                b = this.randomSide();
                c = this.randomSide();
            } while (a === b || b === c || a === c ||
            a + b <= c || a + c <= b || b + c <= a);
            return [a, b, c];
        }
    ];


    generateNonPositiveSides() {
        const side = this.randomSide();
        const sideToInvalidate = Math.floor(Math.random() * 3);
        const invalidSideValue = -Math.random() * 1000;

        switch (sideToInvalidate) {
            case 0:
                return { a: invalidSideValue, b: side, c: side };
            case 1:
                return { a: side, b: invalidSideValue, c: side };
            case 2:
                return { a: side, b: side, c: invalidSideValue };
            default:
                return { a: side, b: side, c: side };
        }
    }

    invalidNonNumericValues: any[] = ["two", {}, "2", true, false, [], null, undefined];

    generateNonNumericSides(invalidValue: any) {
        const side = this.randomSide();
        const sides = { a: side, b: invalidValue, c: side };
        return sides;
    }


    generateInvalidTriangleInequality() {
        const a = this.randomSide();
        const b = this.randomSide();
        const c = a + b + 1;
        return { a, b, c };
    }
}