import { expect, Locator, Page } from '@playwright/test'

export class PurchaseForeignCurrencyPage {
    readonly page: Page
    readonly currency: Locator
    readonly amount: Locator
    readonly conversionRate: Locator
    readonly conversionAmount: Locator
    readonly calculateCostsButton: Locator
    readonly purchaseButton: Locator
    readonly dollarRadioButton: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.currency = page.locator('#pc_currency')
        this.amount = page.locator('#pc_amount')
        this.conversionRate = page.locator('#sp_sell_rate')
        this.conversionAmount = page.locator('#pc_conversion_amount')
        this.calculateCostsButton = page.locator('#pc_calculate_costs')
        this.purchaseButton = page.locator('#purchase_cash')
        this.dollarRadioButton = page.locator('#pc_inDollars_true')
        this.successMessage = page.locator('#alert_content')
    }

    async fillForm(currency: string, amount: string) {
        await this.currency.selectOption(currency)
        await this.amount.type(amount)
        await this.dollarRadioButton.click()
    }

    async clickOnPurchase() {
        await this.purchaseButton.click()
    }

    async clickOnCalculateCosts() {
        await this.calculateCostsButton.click()
    }

    async assertThereIsConversionRate() {
        await expect(this.conversionRate).toBeVisible()
        await expect(this.conversionRate).toContainText('U.S. dollar (USD)')
    }

    async assertThereIsConversionAmount() {
        await expect(this.conversionAmount).toBeVisible()
        await expect(this.conversionAmount).toContainText('U.S. dollar (USD)')
    }

    async assertThereIsSuccessMessage() {
        await expect(this.successMessage).toBeVisible()
        await expect(this.successMessage).toContainText('Foreign currency cash was successfully purchased')
    }



}