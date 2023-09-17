import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
//Here goes the test code
await page.goto('https://www.example.com')
const pageTitle = await page.locator('h1')
await expect(pageTitle).toContainText('Example Domain')
})

test('Clicking on Element @myTag', async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({page}) => {
//.skip annotations will skip this test

    //text
    await page.click('text=some text')

    //css selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    //only visible css selector
    await page.click('.submit-button:visible')

    //combinations
    await page.click('#username .first')

    //xpath
    await page.click('//buton')

})

test.describe('My first test suite', () => {
    test('Working with input', async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        
        await page.type('#user_login','some username')
        await page.type('#user_password','some password')
    
        await page.click('text=Sign in')
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test('Assertions @myTag', async ({page}) => {
        await page.goto('https://www.example.com/')
        await expect(page).toHaveURL('https://www.example.com/')
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText('Example Domain')
        await expect(element).toHaveCount(1)
    
        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()
        
        //dot after element to see what options are available
        //await expect(element).
    
    })
})

test.describe.parallel.only('Hooks', () => {
test.beforeEach(async ({page}) => {
    await page.goto('https://example.com/')

})

test.afterEach(async ({page}) => {

})

    test('Screenshots', async ({page}) => {
        //1. step is load website 
        //2. take screenshot of full page
        await page.screenshot({path: 'screenshot.png', fullPage: true})
    })
    
    test('Single element screenshot', async ({page}) => {
        const element = await page.$('h1')
        await element?.screenshot({path: 'single_element_screenshot.png'})
    })
})

test('Custom helpers', async ({page}) => {
    await loadHomepage(page)
    //await page.pause()
    //this command pauses test until we resume it
    await assertTitle(page)
})


//Annotations
//test.skip will skip that test
//test.only will execute those tests
//test.describe will present tests with text as test suite

//Tagging
//if you tag test name, example @myTag
//you can run just that test by typing in terminal:
//npx playwright test --grep @myTag

//to ignore those tests type in terminal:
//npx playwright test --grep-invert @myTag

//To generate a report in html type in terminal:
//npx playwright test --config=playwright.config.ts --project=Chromium --reporter=html
//and if you want to see the report in browser type
//npx playwright show-report   
