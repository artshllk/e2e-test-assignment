import { expect, test } from "@playwright/test";
import { PurchasePage } from "../pages/PurchasePage";
import { loginAs } from "../utils/auth";

test.describe("Contact Creation", () => {
  test("Validation", async ({ page }) => {
    const purchasePage = new PurchasePage(page);

    await loginAs(page, "joachim+453459@systima.no", "123456789");

    await purchasePage.clickMenuItem("Kontakter");
  });
});
