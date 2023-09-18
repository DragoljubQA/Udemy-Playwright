import { expect, Locator, Page } from '@playwright/test'

export class TransferFundsPage {
    readonly page: Page
    readonly fromAccount: Locator
    readonly toAccount: Locator
    readonly amount: Locator
    readonly description: Locator
    readonly continueButton: Locator
    readonly title: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.fromAccount = page.locator('#tf_fromAccountId')
        this.toAccount = page.locator('#tf_toAccountId')
        this.amount = page.locator('#tf_amount')
        this.description = page.locator('#tf_description')
        this.continueButton = page.locator('#btn_submit')
        this.title = page.locator('h2.board-header')
        this.message = page.locator('.alert-success')
    }

    async fillForm(from: string, to: string, amount: string, description: string) {
        await this.fromAccount.selectOption(from)
        await this.toAccount.selectOption(to)
        await this.amount.type(amount)
        await this.description.type(description)
    }

    async clickOnContinue() {
        await this.continueButton.click()
    }

    async assertTitleIsVerified() {
        await expect(this.title).toBeVisible()
        await expect(this.title).toContainText('Verify')
    }

    async assertThereIsSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('You successfully submitted your transaction')
    }
}