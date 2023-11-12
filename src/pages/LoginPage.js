const { expect, Page } = require("@playwright/test");
const { HeaderElement } = require("./elements/HeaderElement");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderElement(page);
  }

  locators = {
    userInput: "Username",
    passwordInput: "Password",
    loginBtn: "button[color='primary']",
    errorMessage: "alert",
    user: "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]",
    failureMesssage: "mat-error[role='alert']",
  };
  async navigateToLoginPage() {
    await this.page.goto("/login");
    await expect(this.page).toHaveTitle("BookCart");
  }
  async enterUserName(user) {
    await this.page.getByLabel(this.locators.userInput).fill(user);
  }
  async enterPassword(Password) {
    await this.page.getByLabel(this.locators.passwordInput).fill(Password);
  }

  async clickLoginButton() {
    await this.page.locator(this.locators.loginBtn).click();
  }

  getErrorMessage() {
    return this.page.getByRole("alert");
  }

  async loginUser(user, password) {
    await this.enterUserName(user);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.page.waitForLoadState("networkidle");
  }

  async failedLogin() {
    await this.page.waitForLoadState("networkidle");
    await expect(
      this.page.locator(this.locators.failureMesssage),
    ).toBeVisible();
  }

  async checkUserText(text) {
    await expect(this.page.locator(this.locators.user)).toContainText(text);
  }
};
