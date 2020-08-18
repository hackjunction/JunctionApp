const Organization = require('./model')
const { NotFoundError } = require('../../common/errors/errors')

const controller = {}

controller.getOrganizationById = id => {
    return Organization.findOne({
        id,
    }).then(organization => {
        if (!organization) {
            throw new NotFoundError(`Organization with id ${id} does not exist`)
        }
        return organization
    })
}

controller.getOrganizationBySlug = slug => {
    return Organization.findOne({ slug })
}

controller.getOrganizations = () => {
    return Organization.find()
}

controller.createOrganization = data => {
    const organization = new Organization({
        name: data.name,
    })
    return organization.save()
}

controller.updateOrganization = (slug, organizationData) => {
    return Organization.findOneAndUpdate({ slug }, organizationData)
    // TODO look into updateAllowed, standardize or remove
    // return Organization.updateAllowed(organization, organizationData)
}

controller.deleteOrganization = slug => {
    return Organization.findOneAndDelete({ slug })
    // TODO look into updateAllowed, standardize or remove
    // return Organization.updateAllowed(organization, organizationData)
}

// TODO implement event specific packs
/*
controller.getOrganizationByEvent = eventId => {
    return controller.getOrganizations()
}
*/

module.exports = controller
