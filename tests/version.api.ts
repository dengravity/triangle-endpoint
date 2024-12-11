import {test, expect} from '@playwright/test'

test('get version', async ({request})=>{
//As I have no control over environment and it randomly returns one of responses,
// we will consider both 200 and 400 responses as expected
    const response = await request.get('/version');
    const status = response.status();
    if (status === 200) {
        const bodyText = await response.text();
        expect(bodyText).toMatch(/^\d+\.\d+\.\d+$/);
      } else if (status === 400) {
        const errorJson = await response.json();
        expect(errorJson).toEqual({ message: "Oops, something went wrong" });
      } else {
        throw new Error(`Unexpected status code: ${status}`);
      }
})