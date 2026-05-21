
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

test("Login using UI Elements, @innerhtml", async ({ page }) => {

  await page.goto(process.env.DEMO_URL!+'login');
await page.getByLabel("Username").fill(data.username);
await page.getByLabel("Password").fill(data.password);
    const value = await page.getByLabel("Username").inputValue();
    await expect("tester").toEqual(data.username);
});