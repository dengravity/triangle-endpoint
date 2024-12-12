import { test } from '@playwright/test'
import { TrianglesAPI } from '../Controllers/TrianglesAPI'
import { Triangles } from '../Data/Triangles';
import { TriangleAssert } from '../Asserts/TriangleAssert';

const assert = new TriangleAssert();
const API = new TrianglesAPI();
const TrianglesData = new Triangles();

test.describe('Positive Tests for Triangle endpoint', () => {
  test('equilateral - multiple req', async ({ request }) => {
    for (let i = 0; i < 5; i++) {
      const side = TrianglesData.randomSide();
      const response = await API.sendCorrectTriangleRequest(request, side, side, side);
      await assert.expectEquilateral(response);
    }
  })

  test('isosceles - multiple req', async ({ request }) => {
    for (const triangle of TrianglesData.isosceleTriangles) {
      for (let i = 0; i < 5; i++) {
        const [a, b, c] = triangle();
        const response = await API.sendCorrectTriangleRequest(request, a, b, c);
        await assert.expectIsosceles(response);
      }
    }
  })

  test(' versatile - multiple req', async ({ request }) => {
    const versatileTriangle = TrianglesData.versatileTriangles[0];
    for (let i = 0; i < 5; i++) {
      const [a, b, c] = versatileTriangle();
      const response = await API.sendCorrectTriangleRequest(request, a, b, c);
      await assert.expectVersatile(response);
    }
  });
});