import {test,expect} from "@playwright/test"




test("handle multiple window @multiwindow", async ({ page, context }) => {

  await page.goto("https://vinothqaacademy.com/multiple-windows/");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),          // ✅ correct
    page.getByRole("button", {name:"New Browser Tab"}).click() // ✅ no await here
  ]);

  await newPage.waitForLoadState();

await newPage.getByRole("button",{name:"Add Row"}).click();
  
page.on('dialog', async dialog => {
  console.log(dialog.message()); // get alert text
  await dialog.accept();         // click OK
});
  // Example action in new tab

const rowcount = await page.locator("//table[@id='myTable']/tbody/tr").count();

const row = await page.locator("//table[@id='myTable']/tbody/tr");

for(let i=0;i<rowcount;i++)
{
 
   await row.nth(i).locator("td").first().click();
 
}

});
