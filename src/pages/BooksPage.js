const { expect, Page } = require("@playwright/test");
const { HeaderElement } = require("./elements/HeaderElement");

exports.BooksPage = class BooksPage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderElement(page);
  }
  locators = {
    categories: "app-book-filter a",
    title: "div.card-title",
    price: "div.card-title +p",
    addToCartButton: "//button[@color='primary']",
    bookCard: "mat-card",
    snackBar: "//simple-snack-bar/span[1]",
    badgeCount: "#mat-badge-content-0",
  };

  async verifyAllCategories(categories) {
    const bookCategories = this.page.locator(this.locators.categories);
    await expect(bookCategories).toHaveText(categories);
  }

  async verifyBookFound(name) {
    await expect(this.page.locator(this.locators.title)).toContainText(name);
  }

  async addBookToCart(book) {
    await this.header.enterBookName(book);
    await expect(this.page.locator(this.locators.title)).toHaveText(book, {
      ignoreCase: true,
    });
    this.page.click(this.locators.addToCartButton);
    const toast = this.page.locator(this.locators.snackBar);
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText("One Item added to cart");
  }

  async cartBageUpdated() {
    const count = await this.page
      .locator(this.locators.badgeCount)
      .textContent();
    await expect(Number(count)).toBeGreaterThan(0);
  }
};
