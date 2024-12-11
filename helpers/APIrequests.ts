import { expect, APIRequestContext } from '@playwright/test';

export async function sendTriangleRequest(request, a: any, b: any, c: any, d?: any) {
    return request.post('/', { data: { a, b, c, d } });
}

export async function expectEquilateralResponse(response) {
    const status = response.status();
    if (status === 200) {
        const responseBody = await response.json();
        expect(responseBody).toEqual({ result: "This is equilateral triangle" });
    } else {
        throw new Error(`Unexpected status code: ${status} for equilateral triangle`);
    }

}

export async function expectIsoscelesResponse(response) {
    const status = response.status();
    if (status === 201) {
        const responseBody = await response.json();
        expect(responseBody).toEqual({ result: "This is isosceles triangle" });
    } else {
        throw new Error(`Unexpected status code: ${status} for isosceles triangle`);
    }

}

export async function expectVersatileResponse(response) {
    const status = response.status();
    if (status === 200) {
        const responseBody = await response.json();
        expect(responseBody).toEqual({ result: "This is versatile triangle" });
    } else {
        throw new Error(`Unexpected status code: ${status} for versatile triangle`);
    }

}
