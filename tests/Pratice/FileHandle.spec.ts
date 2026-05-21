
import { test, expect } from '@playwright/test';
import path from 'path';
test("Test the checkbox handle @fileupload",async({page})=>{
   await page.goto(process.env.DEMO_URL!+'upload');
  const filePath = path.resolve('testData/login.json');
  await page.locator('#file-upload').setInputFiles(filePath);
  await page.locator('#file-submit').click();
  await expect(page.locator('h3')).toContainText("File Uploaded!")

});

test("Test the checkbox handle without locator @fileupload",async({page})=>{
   await page.goto(process.env.DEMO_URL!+'upload');
  const filePath = path.resolve('testData/login.json');
  await page.setInputFiles("#file-upload",filePath)
  await page.locator('#file-submit').click();
  await expect(page.locator('h3')).toContainText("File Uploaded!")

});