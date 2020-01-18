const Event = require('./model')

const controller = {}

controller.getById = eventId => {
    return Event.findById(eventId)
}

module.exports = controller
