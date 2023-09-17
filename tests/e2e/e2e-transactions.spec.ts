import {test, expect} from '@playwright/test'

test.describe('Show transactions', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
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
