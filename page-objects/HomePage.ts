import { Locator, Page, expect } from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly signInButton: Locator
    readonly searchBox: Locator
    readonly linkFeedback: Locator
    readonly accountActivityButton: Locator
    readonly searchResults: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
        this.searchBox = page.locator('#searchTerm')
        this.linkFeedback = page.locator('#feedback')
        this.accountActivityButton = page.locator('#account_activity_link')
        this.searchResults = page.locator('li > a')
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/')
    }

    async clickOnSignIn() {
        await this.signInButton.click()
    }

    async searchFor(phrase: string) {
        await this.searchBox.type(phrase)
        await this.page.keyboard.press('Enter')
    }

    async clickOnFeedbackLink() {
        await this.linkFeedback.click()
    }

    async clickOnAccountActivity() {
        await this.accountActivityButton.click()
    }

    async assertNumberOfResults(amount: number) {
        await expect(this.searchResults).toHaveCount(amount)
    }


}