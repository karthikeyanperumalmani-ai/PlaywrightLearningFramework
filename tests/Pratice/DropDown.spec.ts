
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


test("Handling the dropdown @dropdown", async ({ page }) => {

    await page.goto(process.env.DEMO_URL! + 'dropdown');
    await page.locator("#dropdown").selectOption({ label: "Option 1" });
    ``
    await expect(page.locator('#dropdown option:checked')).toHaveText("Option 1");
    await page.locator("//select[@id='dropdown']").selectOption({ label: "Option 2" });
    await expect(page.locator('#dropdown option:checked')).toHaveText("Option 1");
});

test("Handling the dropdown @innerhtml", async ({ page }) => {

    await page.goto(process.env.DEMO_URL! + 'dropdown');
    await page.locator("#dropdown").selectOption({ label: "Option 1" });
    const value = await page.locator('#dropdown option:checked').textContent();
    await expect(value).toEqual("Option 1")
});