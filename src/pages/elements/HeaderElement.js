const { expect, Page } = require("@playwright/test");

exports.HeaderElement = class HeaderElement {
  constructor(page) {
    this.page = page;
  }

  /*

https://github.com/ortoniKC/Playwright_Cucumber_TS/blob/main/src/pages/booksPage.ts

*/

  locators = {
    searchInput: "Search books or authors",
    cartButton: "button.mat-focus-indicator.mat-icon-button",
    cartValue: "#mat-badge-content-0",
    loginLink: "//span[text()='Login']/..",
    userMenu:
      "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]",
    myOrder: "//button[text()='My Orders' and @role='menuitem']",
    logoutLink: "//button[text()='Logout' and @role='menuitem']",
    cartItemsHeader: "//h2[normalize-space()='Cart Items']"
  };

  async enterBookName(bookname) {
    await this.page.getByPlaceholder(this.locators.searchInput).type(bookname);
    await this.page.locator("mat-option[role='option']").click();
  }

  async clickOnCart() {
    await this.page.click(this.locators.cartButton);
  }

  async getCartValue() {
    await this.page.waitForTimeout(1000);
    return await this.page.textContent(this.locators.cartValue);
  }

  async clickLoginLink() {
    await this.base.navigateTo(this.locators.loginLink);
  }

  async clickOnUserMenu() {
    await this.base.waitAndClick(this.locators.userMenu);
  }

  async clickOnMyOrder() {
    await this.clickOnUserMenu();
    await this.base.waitAndClick(this.locators.myOrder);
  }

  async logoutUser() {
    await this.clickOnUserMenu();
    await this.base.navigateTo(this.locators.logoutLink);
  }

  async verifyLoginSuccess() {
    await expect(this.page.locator(this.locators.userMenu)).toBeVisible();
  }

  async cartHeaderVisible() {
    await expect(this.page.locator(this.locators.cartItemsHeader)).toBeVisible();
  }
};
