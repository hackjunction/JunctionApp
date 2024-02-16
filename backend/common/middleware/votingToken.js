const VotingTokenController = require('../../modules/voting-token/controller')
const { UnauthorizedError } = require('../errors/errors')

module.exports = {
    hasValidVotingToken: async (req, res, next) => {
        const token = req.query.votingToken || req.params.votingToken

        if (!token) {
            next(new UnauthorizedError('Voting token is required'))
        } else {
            try {
                const votingToken = await VotingTokenController.getToken(token)

                if (!votingToken || votingToken.isRevoked) {
                    next(
                        new UnauthorizedError(
                            'Voting token does not exist or it has been revoked',
                        ),
                    )
                }

                req.votingToken = votingToken
                next()
            } catch {
                next(
                    new UnauthorizedError(
                        'Voting token does not exist or it has been revoked',
                    ),
                )
            }
        }
    },
}