const mongoose = require('mongoose')
const mongooseSlugPlugin = require('mongoose-slug-plugin')

const _ = require('lodash')

const CloudinaryImageSchema = require('@hackjunction/shared/schemas/CloudinaryImage')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')

const BannerSchema = new mongoose.Schema({
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

BannerSchema.index(
    {
        slug: 1,
    },
    {
        unique: true,
    },
)

BannerSchema.plugin(mongooseSlugPlugin, {
    tmpl: '<%=name%>',
    alwaysUpdateSlug: false,
    slugOptions: {
        custom: {
            "'": '',
        },
    },
})

BannerSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'createdAt', 'updatedAt', 'slug'],
})

BannerSchema.set('timestamps', true)

const Banner = mongoose.model('Banner', BannerSchema)

module.exports = Banner
