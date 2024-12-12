import { test } from '@playwright/test'
import { TrianglesAPI } from '../Controllers/TrianglesAPI'
import { TrianglesData } from '../Data/Triangles';
import { TriangleAssert } from '../Asserts/TriangleAssert';

const assert = new TriangleAssert();
const trianglesAPI = new TrianglesAPI();
const trianglesData = new TrianglesData();

//all test run 5 times just for better coverage with random data
//can be removed if not needed

test.describe('Positive Tests for Triangle endpoint', () => {
  test('equilateral - multiple req', async ({ request }) => {
    for (let i = 0; i < 5; i++) {
      const side = trianglesData.randomSide();
      const actualResponse = await trianglesAPI.calculateTriangle(request, side, side, side);
      await assert.expectEquilateral(actualResponse);
    }
  })

  test('isosceles - multiple req', async ({ request }) => {
    for (const triangle of trianglesData.isosceleTriangles) {
      for (let i = 0; i < 5; i++) {
        const [a, b, c] = triangle();
        const actualResponse = await trianglesAPI.calculateTriangle(request, a, b, c);
        await assert.expectIsosceles(actualResponse);
      }
    }
  })

  test(' versatile - multiple req', async ({ request }) => {
    const versatileTriangle = trianglesData.versatileTriangles[0];
    for (let i = 0; i < 5; i++) {
      const [a, b, c] = versatileTriangle();
      const actualResponse = await trianglesAPI.calculateTriangle(request, a, b, c);
      await assert.expectVersatile(actualResponse);
    }
  });
});