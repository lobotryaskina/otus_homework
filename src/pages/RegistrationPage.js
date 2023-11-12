const { expect, Page } = require("@playwright/test");
const { HeaderElement } = require("./elements/HeaderElement");

exports.RegisterPage = class RegisterPage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderElement(page);
  }

  locators = {
    firstName: "input[formcontrolname='firstname']",
    lastName: "input[formcontrolname='lastname']",
    userName: "input[formcontrolname='username']",
    password: "input[formcontrolname='password']",
    confirmPassword: "input[formcontrolname='confirmPassword']",
    maleInput: "input[value='Male']",
    femaleInput: "input[value='Female']",
    maleRadioButton: "//span[contains(text(),'Male')]",
    femaleRadioButton: "//span[contains(text(),'Female')]",
    regButton: "button[color='primary']",
  };
  async navigateToRegisterPage() {
    await this.base.goto("/register");
  }

  async registerUser(
    firstname,
    lastname,
    userName,
    password,
    confirmPassword,
    gender,
  ) {
    await this.page.type(this.Elements.firstName, firstname);
    await this.page.type(this.Elements.lastName, lastname);
    // this must be unique always
    await this.enterUsername(userName);
    await this.page.type(this.Elements.password, password);
    await this.page.type(this.Elements.confirmPassword, confirmPassword);
    if (gender == "m") {
      await this.page.click(this.Elements.maleRadioButton);
      await expect(this.page.locator(this.Elements.maleInput)).toBeChecked();
    } else {
      await this.page.click(this.Elements.femaleRadioButton);
      await expect(this.page.locator(this.Elements.femaleInput)).toBeChecked();
    }
    const regBtn = this.page.locator(this.Elements.regBtn);
    await regBtn.click();
  }

  async enterUsername(userName) {
    await this.page.type(this.Elements.userName, userName);
    const [response] = await Promise.all([
      this.page.waitForResponse((res) => {
        return (
          res.status() == 200 &&
          res.url() ==
            `https://bookcart.azurewebsites.net/api/user/validateUserName/${userName}`
        );
      }),
    ]);
    await response.finished();
  }

  async checkLocatorExists(name) {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.locator(name)).toBeVisible();
  }
};
