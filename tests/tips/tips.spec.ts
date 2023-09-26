import { test, expect } from '@playwright/test'

test.describe("Tips and tricks", () => {
    test('TestInfo Object', async ({page}, testInfo) => {
        await page.goto('https://www.example.com')
        //console.log(testInfo)
        //console.log(testInfo.title)
    })

    test('Test Skip Browser', async ({page, browserName}) => {
        test.skip(browserName === 'chromium', 'Feature not ready in Chrome browser')
        await page.goto('https://www.example.com')
    })

    test('Test Fixme Annotation', async ({page, browserName}) => {
        //test.fixme(browserName === 'chromium', 'Test is not stable, needs revision')
        await page.goto('https://www.example.com')
    })

    const people = ['Mike', 'Judy', 'Peter', 'Stephen', 'Anna']
    for(const name of people) {
        test(`Running test for ${name}`, async ({page}) => {
            await page.goto('http://zero.webappsecurity.com/')
            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test('Mouse Movement Simulation', async ({page}) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0,0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
    })

    test.only('Multiple Browser Tabs', async ({browser}) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()

        await page1.goto('https://www.example.com')
        await page2.goto('https://www.example.com')
        await page3.goto('https://www.example.com')
        await page1.waitForTimeout(5000)
    })


})