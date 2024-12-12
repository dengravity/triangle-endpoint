import { Response, expect } from '@playwright/test';


export class TriangleAssert {

    async expectEquilateral(response: Response) {
        const status = response.status();
        const responseBody = await response.json();
        try {
            expect(status).toEqual(200);
            expect(responseBody).toEqual({ result: "This is equilateral triangle" });
        }
        catch {
            throw new Error(
                `Expectations are not met. Status: ${status}. Response body: ${JSON.stringify(responseBody)}`
            );
        }
    }

    async expectIsosceles(response: Response) {
        const status = response.status();
        const responseBody = await response.json();
        try {
            expect(status).toEqual(200);
            expect(responseBody).toEqual({ result: "This is isosceles triangle" });
        }
        catch {
            throw new Error(
                `Expectations are not met. Status: ${status}. Response body: ${JSON.stringify(responseBody)}`
            );
        }
    }
    async expectVersatile(response: Response) {
        const status = response.status();
        const responseBody = await response.json();
        try {
            expect(status).toEqual(200);
            expect(responseBody).toEqual({ result: "This is versatile triangle" });
        }
        catch {
            throw new Error(
                `Expectations are not met. Status: ${status}. Response body: ${JSON.stringify(responseBody)}`
            );
        }
    }

    async expectErrorGreaterThan0(response: Response) {
        const status = response.status();
        const responseBody = await response.json();
        try {
            expect(status).toEqual(422);
            expect(responseBody).toEqual({
                "error": "All triangle sides should be greater than 0"
            });
        }
        catch {
            throw new Error(
                `Expectations are not met. Status: ${status}. Response body: ${JSON.stringify(responseBody)}`
            );
        }
    }

    async expectErrorNumericSides(response: Response) {
        const status = response.status();
        const responseBody = await response.json();
        try {
            expect(status).toEqual(422);
            expect(responseBody).toEqual({
                "error": "All triangle sides should be numeric"
            });
        }
        catch {
            throw new Error(
                `Expectations are not met. Status: ${status}. Response body: ${JSON.stringify(responseBody)}`
            );
        }
    }

    async expectErrorSumOf2SidesIsGreater(response: Response) {
        const status = response.status();
        const responseBody = await response.json();
        try {
            expect(status).toEqual(422);
            expect(responseBody).toEqual({
                "error": "Sum of any 2 sides should be greater than the 3rd"
            });
        }
        catch {
            throw new Error(
                `Expectations are not met. Status: ${status}. Response body: ${JSON.stringify(responseBody)}`
            );
        }
    }

    async expectShouldHave3Sides(response: Response) {
        const status = response.status();
        const responseBody = await response.json();
        try {
            expect(status).toEqual(422);
            expect(responseBody).toEqual({
                "error": "Triangle should have 3 side"
            });
        }
        catch {
            throw new Error(
                `Expectations are not met. Status: ${status}. Response body: ${JSON.stringify(responseBody)}`
            );
        }
    }

}