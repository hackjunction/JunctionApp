const Registration = require('./model')

const controller = {}

controller.getById = id => {
    return Registration.findById(id)
}

controller.getAll = () => {
    return Registration.find()
}

controller.getByEventId = eventId => {
    return Registration.find({ event: eventId })
}

controller.getByUserId = userId => {
    return Registration.find({ user: userId })
}

module.exports = controller
