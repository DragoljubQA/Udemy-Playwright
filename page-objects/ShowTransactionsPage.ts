import { expect, Locator, Page } from '@playwright/test'

export class ShowTransactionsPage {
    readonly page: Page
    readonly account: Locator
    readonly numberOfRows: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.account = page.locator('#aa_accountId')
        this.numberOfRows = page.locator('#all_transactions_for_account tbody tr')
        this.message = page.locator('.well')
    }

    async chooseAccount(option: string) {
        await this.account.selectOption(option)
    }

    async assertNumberOfRows(rows: number) {
        await expect(this.numberOfRows).toHaveCount(rows)
    }

    async messageIsPresent() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('No results.')
    }

}