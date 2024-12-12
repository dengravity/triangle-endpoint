import { test } from '@playwright/test'
import { TrianglesAPI } from '../Controllers/TrianglesAPI'
import { Triangles } from '../Data/Triangles';
import { TriangleAssert } from '../Asserts/TriangleAssert';


const assert = new TriangleAssert();
const API = new TrianglesAPI();
const TrianglesData = new Triangles();

test.describe('Negative Tests for Triangle endpoint', () => {
  test('negative values', async ({ request }) => {
    const { a, b, c } = TrianglesData.generateNonPositiveSides();
    const response = await API.sendCorrectTriangleRequest(request, a, b, c);
    await assert.expectErrorGreaterThan0(response);
  })

  test('zero value', async ({ request }) => {
    const side = TrianglesData.randomSide();
    const response = await API.sendCorrectTriangleRequest(request, 0, side, side);
    await assert.expectErrorGreaterThan0(response);
  })


  test.describe('non-numeric side values', () => {
    TrianglesData.invalidNonNumericValues.forEach((invalidValue) => {
      test(`error when side is '${invalidValue}'`, async ({ request }) => {
        const sides = TrianglesData.generateNonNumericSides(invalidValue);
        const response = await API.sendWrongTriangleRequest(request, sides.a, sides.b, sides.c);
        await assert.expectErrorNumericSides(response);
      });
    });
  });

  test('sum of 2 sides is less than 3rd', async ({ request }) => {
    const { a, b, c } = TrianglesData.generateInvalidTriangleInequality();
    const response = await API.sendCorrectTriangleRequest(request, a, b, c);
    await assert.expectErrorSumOf2SidesIsGreater(response);

  });

  test('more than 3 sides', async ({ request }) => {
    const versatileTriangle = TrianglesData.versatileTriangles[0];
    const [a, b, c] = versatileTriangle();
    const response = await API.sendWrongTriangleRequest(request, a, b, c, a);
    await assert.expectShouldHave3Sides(response);

  });

  test('less than 3 sides', async ({ request }) => {
    const side = TrianglesData.randomSide();
    const response = await API.sendWrongTriangleRequest(request, side);
    await assert.expectShouldHave3Sides(response);

  });

  test('empty body', async ({ request }) => {
    const side = TrianglesData.randomSide();
    const response = await API.sendWrongTriangleRequest(request);
    await assert.expectShouldHave3Sides(response);

  });

});