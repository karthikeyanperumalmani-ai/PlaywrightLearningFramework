import{test,expect} from "@playwright/test"
import multipleData from "../../testData/loginMultiple.json";

multipleData.forEach((data) => {
  test(`multiple login validation -  @multilogin ${data.username}`, async ({ page }) => {
    
    await page.goto("https://the-internet.herokuapp.com/login");

    await page.locator("//label[contains(text(),'Username')]//following::input[1]")
      .fill(data.username);

    await page.locator("//label[contains(text(),'Password')]//following::input[1]")
      .fill(data.password);

    page.on('dialog', async (dialog) => {
      console.log(dialog.message());
      await dialog.accept();
    });

    await page.getByRole("button", { name: 'Login' }).click();

    await expect(page.locator('h4')).toHaveText(data.message);

  });
});
