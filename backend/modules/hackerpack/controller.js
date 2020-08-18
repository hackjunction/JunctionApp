const Hackerpack = require('./model')
const { NotFoundError } = require('../../common/errors/errors')

const controller = {}

controller.getHackerpackById = id => {
    return Hackerpack.findOne({
        id,
    }).then(hackerpack => {
        if (!hackerpack) {
            throw new NotFoundError(`Hackerpack with id ${id} does not exist`)
        }
        return hackerpack
    })
}

controller.getHackerpackBySlug = slug => {
    return Hackerpack.findOne({ slug })
}

controller.getFullHackerpack = () => {
    return Hackerpack.find()
}

controller.createHackerpack = data => {
    const hackerpack = new Hackerpack({
        name: data.name,
    })
    return hackerpack.save()
}

controller.updateHackerpack = (slug, hackerpackData) => {
    return Hackerpack.findOneAndUpdate({ slug }, hackerpackData)
    // TODO look into updateAllowed, standardize or remove
    // return Hackerpack.updateAllowed(hackerpack, hackerpackData)
}

controller.deleteHackerpack = slug => {
    return Hackerpack.findOneAndDelete({ slug })
    // TODO look into updateAllowed, standardize or remove
    // return Hackerpack.updateAllowed(hackerpack, hackerpackData)
}

// TODO implement event specific packs
/*
controller.getHackerpackByEvent = eventId => {
    return controller.getHackerpacks()
}
*/

module.exports = controller
