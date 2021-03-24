const { hasToken } = require('../token.js')
// const { UnauthorizedError } = require('../../errors/errors')

describe('hasToken', () => {
    it('Should throw 401 Authentication required when JWT doesnt excist', async () => {
        const mockReq = {}
        const mockRes = {}
        const mockNext = jest.fn()
        await expect(() => {
            hasToken(mockReq, mockRes, mockNext).rejects.toThrow()
        })
    })
})
