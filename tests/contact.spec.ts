import { expect, test } from "@playwright/test";
import { loginAs } from "../utils/auth";
import { ContactPage } from "../pages/ContactPage";
import {
  assertDashboard,
  clickLinkMenuItem,
  MenuLinks,
  selectCompany,
} from "../utils/helpers";

test.describe("Contact Creation", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, "joachim+453459@systima.no", "123456789");
    await assertDashboard(page);

    await selectCompany(page, "Systima AS");
    await clickLinkMenuItem(page, MenuLinks.Kontakter);
    await expect(page).toHaveURL(/.*contacts/);
  });

  test("Validation", async ({ page }) => {
    const contactPage = new ContactPage(page);

    await contactPage.clickNyKontaktButton();
    await contactPage.clickOpprettKontaktButton(true);
    await contactPage.navnInputValidationVisibility();
  });

  test("Success", async ({ page }) => {
    const contactPage = new ContactPage(page);

    await contactPage.clickNyKontaktButton();
    await contactPage.fillNavnTextbox("Test");
    await contactPage.clickOpprettKontaktButton();
    await contactPage.checkCreatedContactStatusMessage();
  });
});
