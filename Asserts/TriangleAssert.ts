import { Response } from '@playwright/test';
import { CommonAssert } from './CommonAssert';


export class TriangleAssert extends CommonAssert {

    async expectEquilateral(response: Response): Promise<void> {
        await this.assertResponse(response, 200, { result: "This is equilateral triangle" });
    }

    async expectIsosceles(response: Response): Promise<void> {
        await this.assertResponse(response, 200, { result: "This is isosceles triangle" });
    }
    
    async expectVersatile(response: Response): Promise<void> {
        await this.assertResponse(response, 200, { result: "This is versatile triangle" });
    }

    async expectErrorGreaterThan0(response: Response): Promise<void> {
        await this.assertResponse(response, 422, {
            "error": "All triangle sides should be greater than 0"
        });
    }

    async expectErrorNumericSides(response: Response): Promise<void> {
        await this.assertResponse(response, 422, {
            "error": "All triangle sides should be numeric"
        });
    }

    async expectErrorSumOf2SidesIsGreater(response: Response): Promise<void> {
        await this.assertResponse(response, 422, {
            "error": "Sum of any 2 sides should be greater than the 3rd"
        });
    }

    async expectShouldHave3Sides(response: Response): Promise<void> {
        await this.assertResponse(response, 422, {
            "error": "Triangle should have 3 side"
        });
    }
}