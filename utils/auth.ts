import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export async function loginAs(page: Page, username: string, password: string) {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
  await loginPage.clickLoginButton();
}
