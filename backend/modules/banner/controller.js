const Banner = require('./model')
const { NotFoundError } = require('../../common/errors/errors')

const controller = {}

controller.getBannerById = id => {
    return Banner.findOne({
        id,
    }).then(banner => {
        if (!banner) {
            throw new NotFoundError(`Banner with id ${id} does not exist`)
        }
        return banner
    })
}

controller.getBannerBySlug = slug => {
    return Banner.findOne({ slug })
}

controller.getAllBanners = () => {
    return Banner.find()
}

controller.createBanner = data => {
    const banner = new Banner({
        name: data.name,
    })

    return banner.save()
}

controller.updateBanner = (slug, BannerData) => {
    return Banner.findOneAndUpdate({ slug }, BannerData)
    // TODO look into updateAllowed, standardize or remove
    // return Banner.updateAllowed(Banner, BannerData)
}

controller.deleteBanner = slug => {
    return Banner.findOneAndDelete({ slug })
    // TODO look into updateAllowed, standardize or remove
    // return Banner.updateAllowed(Banner, BannerData)
}

// TODO implement event specific packs
/*
controller.getBannerByEvent = eventId => {
    return controller.getBanners()
}
*/

module.exports = controller
