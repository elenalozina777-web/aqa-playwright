export class RegistrationPage {
  constructor(page) {
    this.userNameInput = page.locator("#signupName");
    this.lastNameInput = page.locator("#signupLastName");
    this.emailInput = page.locator("#signupEmail");
    this.passwordInput = page.locator("#signupPassword");
    this.repitPasswordInput = page.locator("#signupRepeatPassword");
    this.registrButton = page.getByRole("button", {
      name: "Register",
    });
  }

  async typeUserName(username) {
    await this.userNameInput.fill(username.trim());
  }

  async typeLastName(lastname) {
    await this.lastNameInput.fill(lastname.trim());
  }

  async typeEmail(email) {
    await this.emailInput.fill(email.trim());
  }

  async typePassword(password) {
    await this.passwordInput.fill(password.trim());
  }

  async repeatPassword(repeatPassword) {
    await this.repitPasswordInput.fill(repeatPassword.trim());
  }

  async clickRegisterButton() {
    await this.registrButton.click();
  }

  async registerUser(username, lastname, email, password, repeatPassword) {
    await this.typeUserName(username);
    await this.typeLastName(lastname);
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.repeatPassword(repeatPassword);
    await this.clickRegisterButton();
  }
}
