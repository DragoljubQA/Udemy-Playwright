import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe('Feedback form', () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage

    test.beforeEach(async({page}) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visit()
        await homePage.clickOnFeedbackLink()
    })

    test('Reset feedback form', async ({page}) => {
        await feedbackPage.fillForm('name', 'name@mail.com', 'subject', 'nice comment')
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
    })

    test('Submit feedback form', async ({page}) => {
        await feedbackPage.fillForm('name', 'name@mail.com', 'subject', 'nice comment')
        await feedbackPage.submitForm()
        await feedbackPage.assertFeedbackFormSent()
    })


})
