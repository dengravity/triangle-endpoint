import { test, expect } from '@playwright/test'

test('get version', async ({ request }) => {
  //As I have no control over environment and it randomly returns one of responses,
  // we will still consider 200 as only one expected result
  // No need to create new assertion class for only 1 test
  const response = await request.get('/version');
  const status = response.status();
  const bodyText = await response.text();

  try {
    expect(status).toEqual(200);
    expect(bodyText).toMatch(/^\d+\.\d+\.\d+$/);
  }
  catch {
    throw new Error(
      `Expectations are not met. Status is ${status} instead of 200. 
           Response body: ${bodyText}`
    );
  }
})