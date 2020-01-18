const { UserProfile } = require('./model')

const controller = {}

controller.getById = userId => {
    return UserProfile.findOne({ userId })
}

module.exports = controller
