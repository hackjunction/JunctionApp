const Ad = require('./model')
const { NotFoundError } = require('../../common/errors/errors')

const controller = {}

controller.getAdById = id => {
    return Ad.findOne({
        id,
    }).then(Ad => {
        if (!Ad) {
            throw new NotFoundError(`Ad with id ${id} does not exist`)
        }
        return Ad
    })
}

controller.getAdBySlug = slug => {
    return Ad.findOne({ slug })
}

controller.getFullAd = () => {
    return Ad.find()
}

controller.createAd = data => {
    const ad = new Ad({
        name: data.name,
    })

    return ad.save()
}

controller.updateAd = (slug, AdData) => {
    return Ad.findOneAndUpdate({ slug }, AdData)
    // TODO look into updateAllowed, standardize or remove
    // return Ad.updateAllowed(Ad, AdData)
}

controller.deleteAd = slug => {
    return Ad.findOneAndDelete({ slug })
    // TODO look into updateAllowed, standardize or remove
    // return Ad.updateAllowed(Ad, AdData)
}

// TODO implement event specific packs
/*
controller.getAdByEvent = eventId => {
    return controller.getAds()
}
*/

module.exports = controller
