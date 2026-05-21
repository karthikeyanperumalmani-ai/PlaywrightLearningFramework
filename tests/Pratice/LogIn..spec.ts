
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

test('Basic auth test @login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('h3')).toHaveText('Basic Auth');
    await expect(page.locator('p')).toHaveText("Congratulations! You must have the proper credentials.")
    await page.close();
});




test("Login using UI Elements, @uiLogin", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/login");
    await page.locator("//label[contains(text(),'Username')]//following::input[1]").type("tomsmith");
    await page.locator("//label[contains(text(),'Password')]//following::input[1]").type("SuperSecretPassword!");

    page.on('dialog', async (dialog) => {
        console.log(dialog.message());
        await dialog.accept();   // ✅ clicks OK
    });


    // Interact with the new popup normally.
    await page.getByRole("button", { name: ' Login' }).click();


    await expect(page.locator("h4")).toHaveText("Welcome to the Secure Area. When you are done click logout below.");

});

test("Reading the Login from JSON file",async ({page})=>{

     await page.goto("https://the-internet.herokuapp.com/login");
    await page.locator("//label[contains(text(),'Username')]//following::input[1]").type(data.username);
    await page.locator("//label[contains(text(),'Password')]//following::input[1]").type(data.password);
     page.on('dialog', async (dialog) => {
        console.log(dialog.message());
        await dialog.accept();   // ✅ clicks OK
    });    
    await page.getByRole("button", { name: ' Login' }).click();
    await expect(page.locator('h4')).toHaveText(data.message);
});



test('Login using env data @envtest', async ({ page }) => {


  await page.goto(process.env.BASE_URL!);

  await page.fill('#user-name', username);
  await page.fill('#password', password);

  await page.click('#login-button');

});


test("Interact with element based on getLabel @getLabel",async({page})=>{

await page.goto(process.env.DEMO_URL!);
await page.getByLabel("Username").fill(data.username);
await page.getByLabel("Password").fill(data.password);
 page.on('dialog', async (dialog) => {
        console.log(dialog.message());
        await dialog.accept();   // ✅ clicks OK
    });    
    await page.getByRole("button", { name: ' Login' }).click();
    await expect(page.locator('h4')).toHaveText(data.message);
});

test("Using Keyboard Key @keyboard",async({page})=>{

await page.goto(process.env.DEMO_URL!+'login');
await page.getByLabel("Username").click();
await page.keyboard.type(data.username);
await page.keyboard.press("Tab")
await page.keyboard.type(data.password);
//await page.getByLabel("Password").fill(data.password);
 page.on('dialog', async (dialog) => {
        console.log(dialog.message());
        await dialog.accept();   // ✅ clicks OK
    });    
    await page.getByRole("button", { name: ' Login' }).click();
    await expect(page.locator('h4')).toHaveText(data.message);
});
