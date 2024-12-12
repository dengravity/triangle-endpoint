import { Response } from 'playwright';
import { expect } from '@playwright/test';

export class CommonAssert {
    protected async assertResponse(
        actualResponse: Response,
        expectedStatus: number,
        expectedBody: object
    ): Promise<void> {
        const actualStatus = actualResponse.status();
        const actualBody = await actualResponse.json();
        try {
            expect(actualStatus).toEqual(expectedStatus);
            expect(actualBody).toEqual(expectedBody);
        } catch {
            throw new Error(
                `Expected status code is ${expectedStatus}
Actual status code is ${actualStatus}
Expected body: ${JSON.stringify(expectedBody)}
Actual body: ${JSON.stringify(actualBody)}`
            );
        }
    }ß

}