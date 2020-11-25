const mongoose = require('mongoose')
const mongooseSlugPlugin = require('mongoose-slug-plugin')

const _ = require('lodash')

const CloudinaryImageSchema = require('@hackjunction/shared/schemas/CloudinaryImage')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')

const AdSchema = new mongoose.Schema({
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
    buttons: [
        {
            text: {
                type: String,
                maxLength: 25,
                // required: true,
            },
            push: {
                type: String,
                // required: true,
            },
        },
    ],
    icon: {
        type: String,
    },
    logo: CloudinaryImageSchema.mongoose,
})

AdSchema.index(
    {
        slug: 1,
    },
    {
        unique: true,
    },
)

AdSchema.plugin(mongooseSlugPlugin, {
    tmpl: '<%=name%>',
    alwaysUpdateSlug: false,
    slugOptions: {
        custom: {
            "'": '',
        },
    },
})

AdSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'createdAt', 'updatedAt', 'slug'],
})

AdSchema.set('timestamps', true)

const Ad = mongoose.model('Ad', AdSchema)

module.exports = Ad
