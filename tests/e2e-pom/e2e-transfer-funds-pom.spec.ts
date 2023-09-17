import {test, expect} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Transfer funds and make payments', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test('Transfer funds', async ({page}) => {

        await page.click('#transfer_funds_tab')
        await page.selectOption('#tf_fromAccountId', '2')
        await page.selectOption('#tf_toAccountId', '3')
        await page.type('#tf_amount', '500')
        await page.type('#tf_description','Test message')
        await page.click('#btn_submit')

        const boardHeader = await page.locator('h2.board-header')
        await expect(boardHeader).toContainText('Verify')
        await page.click('#btn_submit')

        const successMessage = await page.locator('.alert-success')
        await expect(successMessage).toContainText('You successfully submitted your transaction')
    })
})
