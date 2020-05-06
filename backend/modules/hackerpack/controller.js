const _ = require('lodash')
const { Hackerpack } = require('./model')
const { NotFoundError } = require('../../common/errors/errors')

const controller = {}

controller.getHackerpack = id => {
    return Hackerpack.findOne({
        id,
    }).then(hackerpack => {
        if (!hackerpack) {
            throw new NotFoundError(`Hackerpack with id ${id} does not exist`)
        }
        return hackerpack
    })
}

controller.getHackerpacks = () => {
    return Hackerpack.find()
}

controller.createHackerpack = (data, id) => {
    const hackerpack = new Hackerpack({
        id,
        name: data.name,
        description: data.description,
        icon: data.icon,
        link: data.link,
    })
    return hackerpack.save()
}

controller.updateHackerpack = async (data, id) => {
    // TODO validate
    return controller.getHackerpack(id).then(hackerpack => {
        return Hackerpack.updateAllowed(hackerpack, data)
    })
}

controller.getHackerpackByEvent = eventId => {
    // TODO implement event specific packs
    return controller.getHackerpacks()
}

module.exports = controller
