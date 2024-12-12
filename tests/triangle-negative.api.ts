import { test } from '@playwright/test'
import { TrianglesAPI } from '../Controllers/TrianglesAPI'
import { TrianglesData } from '../Data/Triangles';
import { TriangleAssert } from '../Asserts/TriangleAssert';


const assert = new TriangleAssert();
const trianglesAPI = new TrianglesAPI();
const trianglesData = new TrianglesData();

test.describe('Negative Tests for Triangle endpoint', () => {
  test('negative values', async ({ request }) => {
    const { a, b, c } = trianglesData.generateNonPositiveSides();
    const actualResponse = await trianglesAPI.calculateTriangle(request, a, b, c);
    await assert.expectErrorGreaterThan0(actualResponse);
  })

  test('zero value', async ({ request }) => {
    const side = trianglesData.randomSide();
    const actualResponse = await trianglesAPI.calculateTriangle(request, 0, side, side);
    await assert.expectErrorGreaterThan0(actualResponse);
  })


  test.describe('non-numeric side values', () => {
    trianglesData.invalidNonNumericValues.forEach((invalidValue) => {
      test(`error when side is '${invalidValue}'`, async ({ request }) => {
        const sides = trianglesData.generateNonNumericSides(invalidValue);
        const actualResponse = await trianglesAPI.calculateTriangleRaw(request, sides.a, sides.b, sides.c);
        await assert.expectErrorNumericSides(actualResponse);
      });
    });
  });

  test('sum of 2 sides is less than 3rd', async ({ request }) => {
    const { a, b, c } = trianglesData.generateInvalidTriangleInequality();
    const actualResponse = await trianglesAPI.calculateTriangle(request, a, b, c);
    await assert.expectErrorSumOf2SidesIsGreater(actualResponse);

  });

  test('more than 3 sides', async ({ request }) => {
    const versatileTriangle = trianglesData.versatileTriangles[0];
    const [a, b, c] = versatileTriangle();
    const actualResponse = await trianglesAPI.calculateTriangleRaw(request, a, b, c, a);
    await assert.expectShouldHave3Sides(actualResponse);

  });

  test('less than 3 sides', async ({ request }) => {
    const side = trianglesData.randomSide();
    const actualResponse = await trianglesAPI.calculateTriangleRaw(request, side);
    await assert.expectShouldHave3Sides(actualResponse);

  });

  test('empty body', async ({ request }) => {
    const actualResponse = await trianglesAPI.calculateTriangleRaw(request);
    await assert.expectShouldHave3Sides(actualResponse);

  });

});