export function randomSide() {
    return Math.random() * 1000 + Number.EPSILON;
}


export const isosceleTriangles = [
    // a = b != c
    () => {
        let a: number, b: number, c: number;
        do {
            a = randomSide();
            b = a;
            c = randomSide();
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
            a = randomSide();
            c = a;
            b = randomSide();
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
            b = randomSide();
            c = b;
            a = randomSide();
        } while (
            b === a ||
            a + b <= c ||
            a + c <= b ||
            b + c <= a
        );
        return [a, b, c];
    }
];

export const versatileTriangles = [
    () => {
        let a: number, b: number, c: number;
        do {
            a = randomSide();
            b = randomSide();
            c = randomSide();
        } while (a === b || b === c || a === c ||
        a + b <= c || a + c <= b || b + c <= a);
        return [a, b, c];
    }
];


export function generateNonPositiveSides() {
    const side = randomSide();
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


export function generateNonNumericSides() {
    const side = randomSide();
    const invalidValues = ["two", {}];
    const getRandomInvalid = () => invalidValues[Math.floor(Math.random() * invalidValues.length)];
    const sideToInvalidate = Math.floor(Math.random() * 3);

    switch (sideToInvalidate) {
        case 0:
            return { a: getRandomInvalid(), b: side, c: side };
        case 1:
            return { a: side, b: getRandomInvalid(), c: side };
        case 2:
            return { a: side, b: side, c: getRandomInvalid() };
        default:
            return { a: side, b: side, c: side };
    }
}


export function generateInvalidTriangleInequality() {
    const a = randomSide();
    const b = randomSide();
    const c = a + b + 1;
    return { a, b, c };
}