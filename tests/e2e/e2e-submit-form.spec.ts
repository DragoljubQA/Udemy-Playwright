import {test, expect} from '@playwright/test'

test.describe('Feedback form', () => {

    test.beforeEach(async({page}) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#feedback')
    })

    test('Reset feedback form', async ({page}) => {
        await page.type('#name','some name')
        await page.type('#email','some email')
        await page.type('#subject','some subject')
        await page.type('#comment','some comment')

        await page.click("input[name='clear']")

        const nameInput = await page.locator('#name')
        const emailInput = await page.locator('#email')
        const subjectInput = await page.locator('#subject')
        const commentInput = await page.locator('#comment')

        await expect(nameInput).toBeEmpty()
        await expect(emailInput).toBeEmpty()
        await expect(subjectInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()


    })

    test('Submit feedback form', async ({page}) => {
        await page.type('#name','Drago')
        await page.type('#email','drago@mail.com')
        await page.type('#subject','The Subject')
        await page.type('#comment','Nice comment!')
        await page.click("input[type='submit']")

        await page.waitForSelector('#feedback-title')
    })


})
