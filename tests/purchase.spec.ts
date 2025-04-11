import { test } from "@playwright/test";
import { PurchasePage } from "../pages/PurchasePage";
import { loginAs } from "../utils/auth";
import { LoginPage } from "../pages/LoginPage";
import {
  assertDashboard,
  clickButtonMenuItem,
  clickLinkMenuItem,
  MenuButtons,
  MenuLinks,
  selectCompany,
} from "../utils/helpers";

test.describe("Create Purchase", () => {
  test("Form Filling", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const purchasePage = new PurchasePage(page);

    await loginAs(page, "joachim+453459@systima.no", "123456789");
    await assertDashboard(page);

    await selectCompany(page, "Systima AS");
    await clickButtonMenuItem(page, MenuButtons.Bokforing);
    await clickLinkMenuItem(page, MenuLinks.Bokfør_Andr_Filer);

    await purchasePage.selectContact("Systima AS");
    await purchasePage.fillTotalt("100");

    await purchasePage.clickInvoiceDate();
    await purchasePage.fillDates("2025", "2024", "jan", "1.");

    await purchasePage.clickDueDate();
    await purchasePage.fillDates("2025", "2024", "jan", "15.");

    await purchasePage.selectAccountOption("Utvikling, ervervet");
    await purchasePage.submitForm();

    await purchasePage.assertSuccessMessage();
  });
});

test.describe("Duplicate Invoice Number Handling", () => {
  test("Form Filling", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const purchasePage = new PurchasePage(page);

    await loginAs(page, "joachim+453459@systima.no", "123456789");
    await assertDashboard(page);

    await selectCompany(page, "Systima AS");
    await clickButtonMenuItem(page, MenuButtons.Bokforing);
    await clickLinkMenuItem(page, MenuLinks.Bokfør_Andr_Filer);

    await purchasePage.selectContact("Systima AS");
    await purchasePage.fillTotalt("100");

    await purchasePage.clickInvoiceDate();
    await purchasePage.fillDates("2025", "2024", "jan", "1.");

    await purchasePage.clickDueDate();
    await purchasePage.fillDates("2025", "2024", "jan", "15.");

    await purchasePage.fillInvoiceNumber("1");

    await purchasePage.selectAccountOption("Utvikling, ervervet");

    await purchasePage.submitForm();

    await purchasePage.checkInvoiceNumberValidationError();
  });
});
