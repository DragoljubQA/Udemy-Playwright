import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { PurchaseForeignCurrencyPage } from '../../page-objects/PurchaseForeignCurrencyPage'

test.describe('Exchange currency', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let navbar: Navbar
    let paymentPage: PaymentPage
    let purchaseForeignCurrencyPage: PurchaseForeignCurrencyPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navbar = new Navbar(page)
        paymentPage = new PaymentPage(page)
        purchaseForeignCurrencyPage = new PurchaseForeignCurrencyPage(page)
        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
        await page.goto('http://zero.webappsecurity.com/index.html')
        await homePage.clickOnAccountActivity()
        await navbar.clickOnTab('Pay Bills')
    })

    test('Exchange 1000 dollars to euros', async ({page}) => {
        await paymentPage.clickOnPurchaseForeignCurrencyTab()
        await purchaseForeignCurrencyPage.fillForm('EUR','1000')
        await purchaseForeignCurrencyPage.assertThereIsConversionRate()
        await purchaseForeignCurrencyPage.clickOnCalculateCosts()
        await purchaseForeignCurrencyPage.assertThereIsConversionAmount()
        await purchaseForeignCurrencyPage.clickOnPurchase()
        await purchaseForeignCurrencyPage.assertThereIsSuccessMessage()
    })
})
