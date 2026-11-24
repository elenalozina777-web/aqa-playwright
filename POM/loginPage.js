import { BasePage } from "../POM/basePage.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.signInButton = page.getByRole("button", {
      name: "Sign In",
    });
    this.emailInput = page.locator("#signinEmail");
    this.passwordInput = page.locator("#signinPassword");
    this.loginButton = page.getByRole("button", {
      name: "Login",
    });
  }
  async openLoginModal() {
    await this.signInButton.waitFor({
      state: "visible",
    });

    console.log("Sign In is visible");

    await this.signInButton.click({
      timeout: 10000,
    });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
