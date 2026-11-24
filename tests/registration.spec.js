import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../POM/loginPage.js";
import { RegistrationPage } from "../POM/registrationPage.js";

test.describe("Login tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.openLoginModal();
  });

  test("Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("rodrigasGomes@gmail.com", "Mypassword1234");
    await expect(page).toHaveURL("/panel/garage");
  });

  test("Registration positive test", async ({ page }) => {
    const username = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = `aqa-${faker.internet.email()}`;
    const password = "Mypassword1234";
    const registrationPage = new RegistrationPage(page);

    await page.getByRole("button", { name: "Registration" }).click();
    await registrationPage.registerUser(
      username,
      lastname,
      email,
      password,
      password,
    );
  });

  test('Field "Name" positive cases', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await expect(page.locator(".modal-content")).toBeVisible();
    await page.getByRole("button", { name: "Registration" }).click();
    await expect(page.locator("#signupName")).toBeVisible();
    await registrationPage.typeUserName("Oleksiya");
    await expect(registrationPage.userNameInput).toHaveValue("Oleksiya");

    await registrationPage.typeUserName("    Olena  ");
    await expect(registrationPage.userNameInput).toHaveValue("Olena");

    await registrationPage.typeUserName("Hi");
    await expect(registrationPage.userNameInput).toHaveValue("Hi");

    await registrationPage.typeUserName("qwertyuioplkjhgfdsaz");
    await expect(registrationPage.userNameInput).toHaveValue(
      "qwertyuioplkjhgfdsaz",
    );
  });

  test('Field "Name" negative cases', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await page.getByRole("button", { name: "Registration" }).click();
    // Empty field
    await registrationPage.userNameInput.focus();
    await registrationPage.userNameInput.blur();

    await expect(page.getByText("Name required")).toBeVisible();

    // Wrong data
    await registrationPage.typeUserName("Ghytr543!");

    await expect(page.getByText("Name is invalid")).toBeVisible();

    // Wrong length < 2
    await registrationPage.typeUserName("G");

    await expect(
      page.getByText("Name has to be from 2 to 20 characters long"),
    ).toBeVisible();

    // Wrong length > 20
    await registrationPage.typeUserName("Gwertyuioplkjhgfdsazxc");

    await expect(
      page.getByText("Name has to be from 2 to 20 characters long"),
    ).toBeVisible();

    // Border color red
    await registrationPage.typeUserName("G");

    await expect(registrationPage.userNameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });

  test('Field "Email" negative cases', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await page.getByRole("button", { name: "Registration" }).click();

    // Wrong data
    await registrationPage.emailInput.fill("nicknick");
    await registrationPage.emailInput.blur();

    await expect(page.getByText("Email is incorrect")).toBeVisible();

    // Empty field
    await registrationPage.emailInput.clear();
    await registrationPage.emailInput.focus();
    await registrationPage.emailInput.blur();

    await expect(page.getByText("Email required")).toBeVisible();

    // Border color red
    await registrationPage.typeEmail("G");

    await expect(registrationPage.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
});
