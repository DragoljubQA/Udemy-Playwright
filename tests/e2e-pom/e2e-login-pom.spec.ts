import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.only('Login / Logout Flow', () => {
    let loginPage: LoginPage
    let homePage: HomePage
    //Before Hook
    //Negative scenario
    //Positive scenario + Logout

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await homePage.visit()
    })

    test('Negative Scenario for Login', async ({page}) => {
        await homePage.clickOnSignIn()
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage()
    })

    test('Positive Scenario for Login + Logout', async ({page}) => {
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')

    })


})