const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')

const api = supertest(app)

test('test connection works', async done => {
    await api
        .get('/api')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    done()
})

afterAll(() => {
    mongoose.connection.close()
})
