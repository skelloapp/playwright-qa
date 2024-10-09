import test, { expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage";
import { HomePage } from "../pageObjects/homePage";
import { setLoggedInContext } from "../support/utilities/setLogin.util";

test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homepage = new HomePage(page);
    await loginPage.login("victor.bolta+pan@skello.io", "Skello2022")
    expect(await homepage.isDisplayed()).toBe(true)
})


test.only('log token', async ({ }) => {
  await setLoggedInContext({user: {email: "victor.bolta+pan@skello.io", password: "Skello2022"}})
})
