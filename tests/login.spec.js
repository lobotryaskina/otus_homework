const { test, expect, Page } = require("@playwright/test");
const { HeaderElement } = require("../src/pages/elements/HeaderElement");
const { BooksPage } = require("../src/pages/BooksPage");
const { LoginPage } = require("../src/pages/LoginPage");

test("Succesfull login", async ({ page }) => {
  let loginPage = new LoginPage(page);
  let headerElement = new HeaderElement(page);
  await loginPage.navigateToLoginPage();
  await loginPage.clickLoginButton();
  await loginPage.enterUserName("goodLittleUser");
  await loginPage.enterPassword("Password1!");
  await loginPage.clickLoginButton();
  await headerElement.verifyLoginSuccess();
});

test("Unsuccesfull login", async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.clickLoginButton();
  await loginPage.enterUserName("failedUser");
  await loginPage.enterPassword("failedUser");
  await loginPage.clickLoginButton();
  await loginPage.failedLogin();
});
