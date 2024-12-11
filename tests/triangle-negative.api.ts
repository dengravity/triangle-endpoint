import { test, expect } from '@playwright/test'
import * as API from '../helpers/APIrequests'
import * as Triangles from '../helpers/Triangles';

test.describe('Negative Tests for Triangle endpoint', () => {
  test('NonPostitve', async ({ request }) => {
    const { a, b, c } = Triangles.generateNonPositiveSides();
    const response = await API.sendTriangleRequest(request, a, b, c);
    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      "error": "All triangle sides should be greater than 0"
    });
  })

  test('Zero', async ({ request }) => {
    const side = Triangles.randomSide();
    const response = await API.sendTriangleRequest(request, 0, side, side);
    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      "error": "All triangle sides should be greater than 0"
    });
  })



  test('NonNumeric', async ({ request }) => {
    const { a, b, c } = Triangles.generateNonNumericSides();
    const response = await API.sendTriangleRequest(request, a, b, c);
    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      "error": "All triangle sides should be numeric"
    });
  })

  test('sum of 2 sides is less than 3rd', async ({ request }) => {
    const { a, b, c } = Triangles.generateInvalidTriangleInequality();
    const response = await API.sendTriangleRequest(request, a, b, c);
    expect(response.status()).toBe(418);
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      "error": "Sum of any 2 sides should be greater than the 3rd"
    });
  });

  test('Extra sides', async ({ request }) => {
    const versatileTriangle = Triangles.versatileTriangles[0];
    const [a, b, c] = versatileTriangle();
    const response = await API.sendTriangleRequest(request, a, b, c, a);
    expect(response.status()).toBe(200);

  });

});