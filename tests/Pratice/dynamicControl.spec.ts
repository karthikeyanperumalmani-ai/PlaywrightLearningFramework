import {expect,test} from "@playwright/test"

test("Dynamic control @dynamic",async({page})=>
{

await page.goto("https://the-internet.herokuapp.com/dynamic_controls");
await page.locator('#checkbox').click();
await page.getByRole("button",{name:'Remove'}).click();

await expect(
  page.locator('p').filter({ hasText: "It's gone!" })
).toBeVisible();

await expect(page.getByRole('button',{name:'Add'})).toBeVisible();

await page.getByRole('button',{name:'Enable'}).click();
await expect(
  page.locator('p').filter({ hasText: "It's enabled!" })
).toBeVisible();
await expect(page.getByRole('button',{name:'Disable'})).toBeVisible();

})

test("hover element @hover",async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/jqueryui/menu");
    await page.getByText("Enabled").hover();
    await page.getByText('Downloads').hover();
    await page.getByText('Back to JQuery UI').click();
    await expect(page.locator('h3')).toHaveText("JQuery UI");
    await page.locator("tet").scrollIntoViewIfNeeded
})