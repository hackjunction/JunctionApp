const mongoose = require('mongoose')
const mongooseSlugPlugin = require('mongoose-slug-plugin')

const _ = require('lodash')
const Shared = require('@hackjunction/shared')
const CloudinaryImageSchema = require('@hackjunction/shared/schemas/CloudinaryImage')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')
const AuthController = require('../auth/controller')

const { RegistrationFields } = Shared

const HackerpackSchema = new mongoose.Schema({
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
    description: {
        type: String,
        maxLength: 5000,
        trim: true,
    },
    link: {
        type: String,
    },
    logo: CloudinaryImageSchema.mongoose,
})

HackerpackSchema.index(
    {
        slug: 1,
    },
    {
        unique: true,
    }
)

HackerpackSchema.plugin(mongooseSlugPlugin, {
    tmpl: '<%=name%>',
    alwaysUpdateSlug: false,
    slugOptions: {
        custom: {
            "'": '',
        },
    },
})

HackerpackSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'createdAt', 'updatedAt', 'slug'],
})

HackerpackSchema.set('timestamps', true)

// TODO add remove icon

const Hackerpack = mongoose.model('Hackerpack', HackerpackSchema)

module.exports = Hackerpack
