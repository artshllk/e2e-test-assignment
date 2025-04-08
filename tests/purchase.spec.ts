import { expect, test } from "@playwright/test";
import { PurchasePage } from "../pages/PurchasePage";
import { loginAs } from "../utils/auth";
import { LoginPage } from "../pages/LoginPage";

test.describe("Create Purchase", () => {
  //   test("Navigation", async ({ page }) => {
  //     const purchasePage = new PurchasePage(page);

  //     await loginAs(page, "joachim+453459@systima.no", "123456789");

  //     await purchasePage.visitPurchaseFormManually();

  //     await expect(page).toHaveURL(/.*dashboard/);

  //     await purchasePage.clickMenuItem("Bokføring");
  //     await purchasePage.clickBokforingMenuItem("Bokfør andre filer");

  //     await expect(page).toHaveURL(/.*bookkeeping\/purchase.*/);
  //   });

  test("Form Filling", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const purchasePage = new PurchasePage(page);

    await loginAs(page, "joachim+453459@systima.no", "123456789");
    await loginPage.assertDashboard();

    await purchasePage.gotoPurchaseForm();
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
    await loginPage.assertDashboard();

    await purchasePage.gotoPurchaseForm();
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
