import {test, expect} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { Navbar } from '../../page-objects/components/Navbar'
import { TransferFundsPage } from '../../page-objects/TransferFundsPage'

test.describe('Transfer funds and make payments', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let navbar: Navbar
    let transferFundsPage: TransferFundsPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navbar = new Navbar(page)
        transferFundsPage = new TransferFundsPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test('Transfer funds', async ({page}) => {
        await navbar.clickOnTab('Transfer Funds')
        await transferFundsPage.fillForm('2', '3', '500', 'Test message')
        await transferFundsPage.clickOnContinue()
        await transferFundsPage.assertTitleIsVerified()
        await transferFundsPage.clickOnContinue()
        await transferFundsPage.assertThereIsSuccessMessage()
    })
})
