import {test, expect} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { ShowTransactionsPage } from '../../page-objects/ShowTransactionsPage'

test.describe('Show transactions', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let showTransactionsPage: ShowTransactionsPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        showTransactionsPage = new ShowTransactionsPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/index.html')
        await homePage.clickOnAccountActivity()
    })

    test('Loan has 2 transactions', async({page}) => {
        await showTransactionsPage.chooseAccount('4')
        await showTransactionsPage.assertNumberOfRows(2)
    })

    test('Brokerage has no transactions', async({page}) => {
        await showTransactionsPage.chooseAccount('6')
        await showTransactionsPage.messageIsPresent()
        await showTransactionsPage.assertNumberOfRows(0)
    })
})
