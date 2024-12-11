import { test, expect } from '@playwright/test'
import * as API from '../helpers/APIrequests'
import * as Triangles from '../helpers/Triangles';

test.describe('Positive Tests for Triangle endpoint', () => {
  test('positive equilateral - multiple req', async ({ request }) => {
    for (let i = 0; i < 5; i++) {
      const side = Triangles.randomSide();
      const response = await API.sendTriangleRequest(request, side, side, side);
      API.expectEquilateralResponse(response);
    }
  })

  test('positive isosceles - multiple req', async ({ request }) => {
    for (const triangle of Triangles.isosceleTriangles) {
      for (let i = 0; i < 5; i++) {
        const [a, b, c] = triangle();
        const response = await API.sendTriangleRequest(request, a, b, c);
        await API.expectIsoscelesResponse(response);
      }
    }
  })

  test('positive versatile - multiple req', async ({ request }) => {
    const versatileTriangle = Triangles.versatileTriangles[0];
    for (let i = 0; i < 5; i++) {
      const [a, b, c] = versatileTriangle();
      if (a === b || b === c || a === c) {
        throw new Error(`Sides are not distinct: a=${a}, b=${b}, c=${c}`);
      }
      const response = await API.sendTriangleRequest(request, a, b, c);
      await API.expectVersatileResponse(response);
    }
  });

  test('positive string number - multiple req', async ({ request }) => {
    const versatileTriangle = Triangles.versatileTriangles[0];
    for (let i = 0; i < 5; i++) {
      const [a, b, c] = versatileTriangle().map(side => side.toString());
      if (a === b || b === c || a === c) {
        throw new Error(`Sides are not distinct: a=${a}, b=${b}, c=${c}`);
      }
      const response = await API.sendTriangleRequest(request, a, b, c);
      await API.expectVersatileResponse(response);
    }
  });
});