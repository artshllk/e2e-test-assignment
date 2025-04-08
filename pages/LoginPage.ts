import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async gotoLoginPage() {
    await this.page.goto("https://app.staging.systima.no/systimaas7/dashboard");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async enterUsername(username: string) {
    const usernameInput = this.page.getByRole("textbox", {
      name: "E-post",
    });
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    const passwordInput = this.page.getByRole("textbox", { name: "Passord" });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(password);
  }

  async clickLoginButton() {
    const loginBtn = this.page.getByRole("button", { name: "Logg inn" });
    await expect(loginBtn).toBeEnabled();
    await loginBtn.click();
  }

  async assertDashboard() {
    await expect(
      this.page.getByRole("link", { name: "Logg ut" })
    ).toBeVisible();
    await expect(this.page.getByRole("navigation")).toBeVisible();
    await expect(
      this.page.getByRole("button", { name: "Nytt selskap" })
    ).toBeVisible();
  }
}
