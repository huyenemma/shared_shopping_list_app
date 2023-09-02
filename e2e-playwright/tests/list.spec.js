const { test, expect } = require("@playwright/test");

test("Main page has title and shows no statistic (no lists yet)", async ({page}) => {
  await page.goto("/"); 
  await expect(page).toHaveTitle("Shared shopping list!"); 
  await expect(page.locator("p")).toHaveText("No shopping lists yet.");
}); 


test("Lists page can add a new shopping list and list all the lists", async ({page}) => {
  const listName = "party";
  await page.goto("/lists"); 
  await page.locator("input[name=name]").type(`${listName}`);
  await page.locator("input[type=submit]").click(); 
  await expect(page.locator(`a >> text='${listName}'`)).toBeVisible(); 
}); 

test("Can view a single shopping list", async({ page }) => {
  const listName = "party";

  await page.goto("/lists");
  await page.click(`a >> text='${listName}'`); 
  await expect(page.locator("h1")).toHaveText(listName);
}) 

test("Can add items to a shopping list and see them listed.", async ({ page }) => {
  const listName = "party";
  const itemName = "banana";

  await page.goto("/lists");
  await page.click(`a >> text='${listName}'`); 

  await page.locator("input[name=name]").type(itemName);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`li >> text='${itemName}'`)).toBeVisible();
});

test("Can mark an item in the shopping list as collected.", async ({ page }) => {
  const listName = "party";
  const itemName = "banana";

  await page.goto("/lists");
  await page.click(`a >> text='${listName}'`);  

  await page.click(`form[action*='items'][action*='collect'] input[type=submit]`);
  await expect(page.locator(`li del >> text='${itemName}'`)).toBeVisible();
});

test("Can deactivate a shopping list.", async ({ page }) => {
  const listName = "party";

  await page.goto("/lists");
  await page.click(`form[action*='deactivate'] input[type=submit]`);  
  await expect(page.locator(`a >> text='${listName}'`)).not.toBeVisible();
});