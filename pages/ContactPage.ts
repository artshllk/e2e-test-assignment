import { expect, Page } from "@playwright/test";

export class ContactPage {
  constructor(private page: Page) {}

  async clickNyKontaktButton() {
    const nykontakt = this.page.getByRole("button", { name: "Ny kontakt" });
    await expect(nykontakt).toBeVisible();
    await nykontakt.click();
  }

  async navnInputValidationVisibility() {
    await expect(this.page.getByText("Vennligst skriv inn navn")).toBeVisible();
  }

  async fillNavnTextbox(text: string) {
    const textbox = this.page.getByRole("textbox", { name: "Navn *" });
    await expect(textbox).toBeVisible();
    await textbox.fill(text);
  }

  async clickOpprettKontaktButton(inputValidation = false) {
    const opprettKontaktSelector = this.page.getByRole("button", {
      name: "Opprett kontakt",
    });

    await opprettKontaktSelector.scrollIntoViewIfNeeded();
    await expect(opprettKontaktSelector).toBeVisible();

    if (!inputValidation) {
      await expect(opprettKontaktSelector).toBeEnabled();
      await expect(opprettKontaktSelector).toHaveAccessibleName(
        "Opprett kontakt"
      );

      // TODO: Investigate 5s delay before the "Opprett kontakt" button becomes clickable in pw ui
      await this.page.waitForTimeout(5000);
    }

    await opprettKontaktSelector.click();
  }

  async checkCreatedContactStatusMessage() {
    await expect(this.page.getByText("Ny kontakt lagret.")).toBeVisible();
  }
}
