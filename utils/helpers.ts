import { expect, Page } from "@playwright/test";

export enum MenuLinks {
  Kontakter = "Kontakter",
  LoggUt = "Logg ut",
  Bokfør_Andr_Filer = "Bokfør andre filer",
  // TODO: Add all menu links here
}

export enum MenuButtons {
  Bokforing = "Bokføring",
  // TODO: Add all menu buttons on nav
}

export async function clickButtonMenuItem(page: Page, name: MenuButtons) {
  await page.getByRole("button", { name, exact: true }).click();
}

export async function clickLinkMenuItem(page: Page, name: MenuLinks) {
  await page.getByRole("link", { name }).click();
}

export async function assertDashboard(page: Page) {
  await page.locator(".header-backup").waitFor();
  await expect(page.getByRole("link", { name: "Logg ut" })).toBeVisible({
    timeout: 7000,
  });
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Nytt selskap" })
  ).toBeVisible();
}

export async function selectCompany(page: Page, name: string) {
  await page.getByRole("button", { name }).click();
  await page.getByRole("option", { name }).click();
}
