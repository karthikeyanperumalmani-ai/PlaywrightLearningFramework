import { test, expect } from "@playwright/test"
import data from "../../testData/registeration.json"

import * as dotenv from 'dotenv';

test("Validating with Different Locator @diffLocator", async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
    await page.getByPlaceholder("First Name").fill(data["First Name"]);
    await page.getByPlaceholder("Last Name").fill(data["Last Name"]);
    await page.getByPlaceholder("name@example.com").fill(data.Email);
    await page.getByPlaceholder("Mobile Number").fill(data.Mobile);
    await page.locator('#dateOfBirthInput').click();
    await page.waitForSelector('.react-datepicker__month-select');
    await page.selectOption('.react-datepicker__month-select', '0');
    await page.selectOption('.react-datepicker__year-select', '1988');
    await page.locator('.react-datepicker__day--020').click();
    await page.getByLabel("Subjects").fill("Maths")
    await page.keyboard.press("Tab")
    await page.locator('input[name="gender"][value="Female"]').check();
    await page.getByLabel("Sports").check()
    await page.setInputFiles("#uploadPicture", "testData\\registeration.json");
    await page.locator("#currentAddress").fill("Test");    // Click the dropdown
    await page.locator('#react-select-3-input').click();
    // Type value
    await page.locator('#react-select-3-input').fill('NCR');
    // Select option
    await page.locator("//div[text()='NCR']").click();
    await page.locator("#react-select-4-input").click();
       await page.locator("//div[text()='Delhi']").click();
    
    await page.getByRole("button", { "name": "Submit" }).click();
    await expect(page.getByText("Thanks for submitting the form")).toBeVisible();
    await page.getByRole("button",{name:'test'}).click();

})