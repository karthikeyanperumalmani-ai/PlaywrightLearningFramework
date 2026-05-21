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

test.beforeEach("Launching the browser on each test ",async({page})=>{

    await page.goto(process.env.DEMO_URL!+'checkboxes');
    
});

test("Test the checkbox handle @checkbox",async({page})=>{
    await expect(page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 2')]/preceding-sibling::input[1]")).toBeChecked();
await page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 1')]/preceding-sibling::input[1]").click();
    await expect(page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 1')]/preceding-sibling::input[1]")).toBeChecked();
await page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 2')]/preceding-sibling::input[1]").click();
await expect(page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 2')]/preceding-sibling::input[1]")).not.toBeChecked();
});
import path from 'path';

test("Test the checkbox handle @fileupload",async({page})=>{
   await page.goto(process.env.DEMO_URL!+'upload');
  const filePath = path.resolve('testData/login.json');
  await page.locator('#file-upload').setInputFiles(filePath);
  await page.locator('#file-submit').click();
  await expect(page.locator('h3')).toContainText("File Uploaded!")

});

test("Test the checkbox handle @check",async({page})=>{
    await expect(page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 2')]/preceding-sibling::input[1]")).toBeChecked();
await page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 2')]/preceding-sibling::input[1]").uncheck();
    await expect(page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 1')]/preceding-sibling::input[1]")).not.toBeChecked();
await page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 1')]/preceding-sibling::input[1]").check();
await expect(page.locator("//form[@id='checkboxes']/text()[contains(.,'checkbox 2')]/preceding-sibling::input[1]")).not.toBeChecked();
});