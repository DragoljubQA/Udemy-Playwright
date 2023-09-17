import {test, expect} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Show transactions', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#account_activity_link')
    })

    test('Load has 2 transactions', async({page}) => {
        await page.selectOption('#aa_accountId', '4')
        const table = await page.locator('#all_transactions_for_account tbody tr')
        await expect(table).toHaveCount(2)
    })

    test('Brokerage has no transactions', async({page}) => {
        await page.selectOption('#aa_accountId', '6')
        const message = await page.locator('.well')
        await expect(message).toContainText('No results.')
        const table = await page.locator('#all_transactions_for_account tbody tr')
        await expect(table).toHaveCount(0)
    })
})
