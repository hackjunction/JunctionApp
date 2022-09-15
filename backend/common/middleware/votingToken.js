const VotingTokenController = require('../../modules/voting-token/controller')
const { UnauthorizedError } = require('../errors/errors')

module.exports = {
    hasValidVotingToken: async (req, res, next) => {
        if (!req.query.votingToken) {
            next(new UnauthorizedError('Voting token is required'))
        } else {
            const votingToken = await VotingTokenController.getToken(
                req.query.votingToken,
            )

            if (!votingToken || votingToken.isRevoked) {
                next(
                    new UnauthorizedError(
                        'Voting token does not exist or it has been revoked',
                    ),
                )
            }

            req.votingToken = votingToken
            next()
        }
    },
}
