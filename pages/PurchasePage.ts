import { expect, Locator, Page } from "@playwright/test";

export class PurchasePage {
  constructor(private page: Page) {}

  async gotoPurchaseForm() {
    await this.page.goto(
      "https://app.staging.systima.no/systimaas7/bookkeeping/purchase"
    );
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickMenuItem(name: string) {
    await this.page.getByRole("button", { name, exact: true }).click();
  }

  async clickBokforingMenuItem(name: string) {
    const item = this.page.getByRole("link", { name });
    await expect(item).toBeVisible();
    await item.click();
  }

  async selectContact(name: string) {
    const selectContactInput = this.page.getByTestId("contact-select");
    await expect(selectContactInput).toBeVisible({ timeout: 8000 });
    await selectContactInput.click();

    const optionName = this.page.getByRole("option", { name });
    await optionName.scrollIntoViewIfNeeded();
    await expect(optionName).toBeVisible();
    await optionName.click();
  }

  async fillTotalt(amount: string) {
    const totaltInput = this.page.getByRole("textbox", {
      name: "Totalt beløp inkl. mva. *",
    });
    await expect(totaltInput).toBeVisible();
    await totaltInput.fill(amount);
  }

  async clickInvoiceDate() {
    const invoiceDateInput = this.page.getByRole("button", {
      name: "Fakturadato *",
    });
    await expect(invoiceDateInput).toBeVisible();
    await invoiceDateInput.click();
  }

  async clickDueDate() {
    const dueDateInput = this.page.getByRole("button", {
      name: "Forfallsdato",
    });
    await expect(dueDateInput).toBeVisible();
    await dueDateInput.click();
  }

  async selectAccountOption(name: string) {
    const kontoInput = this.page.getByRole("button", {
      name: "Konto * 1000 Utvikling,",
    });
    await expect(kontoInput).toBeVisible();
    await kontoInput.click();

    const optionName = this.page.getByRole("option", { name });
    await expect(optionName).toBeVisible();
    await optionName.click();
  }

  async fillInvoiceNumber(amount: string) {
    const invoiceNumberInput = this.page.getByRole("textbox", {
      name: "Fakturanr.",
    });
    await expect(invoiceNumberInput).toBeVisible();
    await invoiceNumberInput.fill(amount);
  }

  async checkInvoiceNumberValidationError() {
    const redText = this.page.locator("text=Fakturanr. er allerede bokført");
    await expect(redText).toBeVisible();
  }

  async fillDates(
    selectedYear: string,
    yearOption: string,
    monthName: string,
    day: string
  ) {
    let yearText: Locator;
    const initialHeaderButton = this.page.getByRole("button", {
      name: new RegExp(`.*${selectedYear}.*`, "i"),
    });
    await initialHeaderButton.click();

    const selectedYearButton = this.page.getByRole("button", {
      name: selectedYear,
      exact: true,
    });
    await selectedYearButton.click();

    try {
      yearText = this.page.getByText(yearOption, { exact: true });
      await yearText.click();
    } catch (e) {
      // Fallback to a more precise match in case of strict mode error
      yearText = this.page
        .getByRole("listitem")
        .filter({ hasText: yearOption });
      await yearText.click();
    }

    const monthText = this.page.getByRole("button", { name: monthName });
    await monthText.click();

    const daySelector = this.page.getByRole("button", { name: day }).first();
    await daySelector.click();
  }

  async submitForm() {
    const button = this.page.getByRole("button", {
      name: "Bokfør",
      exact: true,
    });
    await expect(button).toBeEnabled();
    await button.click();
  }

  async assertSuccessMessage() {
    await expect(
      this.page.getByText(/Bilag opprettet med bilagsnr/)
    ).toBeVisible({ timeout: 10000 });
  }
}
