import { expect, Page } from "@playwright/test";
import { config } from "../utils/config";

export class LoginPage {
  constructor(private page: Page) {}

  async gotoLoginPage() {
    await this.page.goto(config.baseURL);
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
}
