import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Exchange currency', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#account_activity_link')
        await page.click('#pay_bills_tab')
    })

    test('Exchange 1000 dollars to euros', async ({page}) => {
        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'EUR')
        
        const message = await page.locator('#sp_sell_rate')
        await expect(message).toContainText('EUR')

        await page.type('#pc_amount', '1000')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')

        const conversionMessage = await page.locator('#pc_conversion_amount')
        await expect(conversionMessage).toContainText('(EUR) = 1000.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')

        const successMessage = await page.locator('#alert_content')
        await expect(successMessage).toBeVisible()
        await expect(successMessage).toContainText('Foreign currency cash was successfully purchased')
    })
})
