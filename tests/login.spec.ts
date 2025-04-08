import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Tests", () => {
  test("Successful Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.enterUsername("joachim+453459@systima.no");
    await loginPage.enterPassword("123456789");
    await loginPage.clickLoginButton();

    await loginPage.assertDashboard();
  });

  test("Failed Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.enterUsername("invalid@gmaia.com");
    await loginPage.enterPassword("129491929");
    await loginPage.clickLoginButton();

    await expect(page.getByRole("alert")).toContainText(
      "Feil brukernavn / passord"
    );
  });
});
