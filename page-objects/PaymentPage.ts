import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectbox: Locator
    readonly payeeDetailButton: Locator
    readonly payeeDetail: Locator
    readonly accountSelectbox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator
    readonly purchaseForeignCurrencyButton: Locator

    constructor(page:Page) {
        this.page = page
        this.payeeSelectbox = page.locator('#sp_payee')
        this.payeeDetailButton = page.locator('#sp_get_payee_details')
        this.payeeDetail = page.locator('#sp_payee_details')
        this.accountSelectbox = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentButton = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
        this.purchaseForeignCurrencyButton = page.locator('text=Purchase Foreign Currency')
    }

    async createPayment() {
        await this.payeeSelectbox.selectOption('apple')
        await this.payeeDetailButton.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectbox.selectOption('6')
        await this.amountInput.type('5000')
        await this.dateInput.type('2023-11-21')
        await this.descriptionInput.type('SomeMessage')
        await this.submitPaymentButton.click()
    }

    async successMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('The payment was successfully submitted')
    }

    async clickOnPurchaseForeignCurrencyTab() {
        await this.purchaseForeignCurrencyButton.click()
    }

}