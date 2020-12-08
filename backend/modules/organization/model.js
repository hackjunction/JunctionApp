const mongoose = require('mongoose')
const mongooseSlugPlugin = require('mongoose-slug-plugin')

const CloudinaryImageSchema = require('@hackjunction/shared/schemas/CloudinaryImage')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true,
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        slugPaddingSize: 2,
    },
    about: {
        type: String,
        maxLength: 5000,
        trim: true,
    },
    link: {
        type: String,
    },
    icon: {
        type: String,
    },
    logo: CloudinaryImageSchema.mongoose,
})

OrganizationSchema.index(
    {
        slug: 1,
    },
    {
        unique: true,
    },
)

OrganizationSchema.plugin(mongooseSlugPlugin, {
    tmpl: '<%=name%>',
    alwaysUpdateSlug: false,
    slugOptions: {
        custom: {
            "'": '',
        },
    },
})

OrganizationSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'createdAt', 'updatedAt', 'slug'],
})

OrganizationSchema.set('timestamps', true)

// TODO add remove icon

const Organization = mongoose.model('Organization', OrganizationSchema)

module.exports = Organization
