import { test, expect } from '@playwright/test'

test.describe.parallel('API testing', () => {
    const baseURL = 'https://reqres.in/api'

    test('Simple API test - Assert response status', async ({request}) => {
        //const response = await request.get(baseURL+'/users/2')
        const response = await request.get(`${baseURL}/users/3`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
    })

    test('Simple API test - Assert Invalid Endpoint', async ({request}) => {
        const response = await request.get(`${baseURL}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })

    test('GET request - Get user detail', async ({request}) => {
        const response = await request.get(`${baseURL}/users/1`)
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toEqual('George')
        expect(responseBody.data.last_name).toEqual('Bluth')
        expect(responseBody.data.email).toBeTruthy()
        //toBeTruthy means it has some value
        //toBeFalsy means it has value 0 or null
        //console.log(responseBody)
    })

    test('POST request - Create new user', async ({request}) => {
        const response = await request.post(`${baseURL}/user`, {
            data: {
                id: 1007,
            }
        })

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(1007)
        expect(responseBody.createdAt).toBeTruthy()

        //console.log(responseBody)
    })

    test('POST request - Login', async ({request}) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        })

        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
        //console.log(responseBody)
    })

    test('POST request - Login failed', async ({request}) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: 'eve.holt@reqres.in'
            }
        })

        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toEqual('Missing password')
    })

    test('PUT request - Update user', async ({request}) => {
        const response = await request.put(`${baseURL}/users/10`, {
            data: {
                name: 'new name',
                job: 'new job'
            }
        })

        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('new name')
        expect(responseBody.job).toBe('new job')
    })

    test('DELETE request - Remove user', async ({request}) => {
        const response = await request.delete(`${baseURL}/users/10`)
        expect(response.status()).toBe(204)
    })
})