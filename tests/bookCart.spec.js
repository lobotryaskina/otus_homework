const { test, expect, Page } = require("@playwright/test");
const { HeaderElement } = require("../src/pages/elements/HeaderElement");
const { BooksPage } = require("../src/pages/BooksPage");
const { LoginPage } = require("../src/pages/LoginPage");

test("Search for a book", async ({ page }) => {
  let loginPage = new LoginPage(page);
  let headerElement = new HeaderElement(page);
  let booksPage = new BooksPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.clickLoginButton();
  await loginPage.enterUserName("goodLittleUser");
  await loginPage.enterPassword("Password1!");
  await loginPage.clickLoginButton();
  await headerElement.enterBookName("HP2");
  await booksPage.verifyBookFound("HP2");
});

test("Go to cart", async ({ page }) => {
  let loginPage = new LoginPage(page);
  let booksPage = new BooksPage(page);
  let headerElement = new HeaderElement(page);
  await loginPage.navigateToLoginPage();
  await loginPage.clickLoginButton();
  await loginPage.enterUserName("goodLittleUser");
  await loginPage.enterPassword("Password1!");
  await loginPage.clickLoginButton();
  await headerElement.clickOnCart();
  await headerElement.cartHeaderVisible();
});

test("Add to cart", async ({ page }) => {
  let loginPage = new LoginPage(page);
  let booksPage = new BooksPage(page);
  let headerElement = new HeaderElement(page);
  await loginPage.navigateToLoginPage();
  await loginPage.clickLoginButton();
  await loginPage.enterUserName("goodLittleUser");
  await loginPage.enterPassword("Password1!");
  await loginPage.clickLoginButton();
  await booksPage.addBookToCart("HP2");
  await booksPage.cartBageUpdated();
});

