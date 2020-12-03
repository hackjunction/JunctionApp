const mongoose = require('mongoose')
const { Auth } = require('@hackjunction/shared')
const DataLoader = require('dataloader')
const Organization = require('./model')
const PermissionUtils = require('../../utils/permissions')

async function batchGetOrganizationsByIds(organizationIds) {
    const objectIds = organizationIds.map(id => new mongoose.Types.ObjectId(id))
    const results = await Organization.find({
        _id: {
            $in: objectIds,
        },
    }).lean()
    const resultsMap = results.reduce((map, current) => {
        map[current._id.toString()] = current
        return map
    }, {})
    return organizationIds.map(_id => resultsMap[_id] || null)
}

async function batchGetOrganizationsBySlugs(organizationSlugs) {
    const results = await Organization.find({
        slug: {
            $in: organizationSlugs,
        },
    }).lean()
    const resultsMap = results.reduce((map, current) => {
        map[current.slug] = current
        return map
    }, {})
    return organizationSlugs.map(slug => resultsMap[slug] || null)
}

class OrganizationController {
    constructor(requestingUser, overrideChecks) {
        this.requestingUser = requestingUser
        this.overrideChecks = overrideChecks
        this.isAdmin =
            overrideChecks ||
            PermissionUtils.userHasPermission(
                requestingUser,
                Auth.Permissions.MANAGE_EVENT,
            )

        this.organizationIdLoader = new DataLoader(batchGetOrganizationsByIds)
        this.organizationSlugLoader = new DataLoader(
            batchGetOrganizationsBySlugs,
        )
    }

    getById(organizationId) {
        return this._clean(this.organizationIdLoader.load(organizationId))
    }

    getBySlug(organizationSlug) {
        return this._clean(this.organizationSlugLoader.load(organizationSlug))
    }

    async getAll() {
        return this._clean(Organization.find().lean())
    }

    async _clean(promise) {
        const result = await promise
        if (Array.isArray(result)) {
            const results = result.map(item => {
                return item || null
            })
            return results.filter(item => item !== null)
        }
        return result || null
    }
}

module.exports = OrganizationController
