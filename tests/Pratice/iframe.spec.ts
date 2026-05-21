import { test, expect } from '@playwright/test';

import data from '../../testData/login.json'
import * as dotenv from 'dotenv';

  const username = process.env.QA_USERNAME?.trim() || '';
  const password = process.env.QA_PASSWORD?.trim() || '';

test.use({
    httpCredentials: {
        username: 'admin',
        password: 'admin'
    }
});

test('handle iframe @iframe', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/frames');
  await page.getByText("Nested Frames").click();
  const frame = page.frameLocator('mce_0_ifr'); // frame id
  await frame.locator('h1').waitFor();
  const text = await frame.locator('h1').textContent();
  console.log(text);
});
``