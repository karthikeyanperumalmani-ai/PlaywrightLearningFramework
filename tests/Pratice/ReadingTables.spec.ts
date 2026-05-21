import { test, expect } from '@playwright/test';

test("Reading the webtable @webtable", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/tables");
 const rowCount = await page.locator("//table[@id='table1']/tbody/tr").count();
  console.log("My count on web table: " + rowCount);
  const rows = page.locator("//table[@id='table1']/tbody/tr");
for (let i = 0; i < rowCount; i++) {
    const cells = rows.nth(i).locator('td');
    const cellCount = await cells.count();
  for (let j = 0; j < cellCount; j++) 
  {
      const cellText = await cells.nth(j).textContent();
      console.log(`Row ${i}, Col ${j}: ${cellText}`);
  }
}
});


 
