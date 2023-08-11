const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: global.gConfig.CLOUDINARY_CLOUD_NAME,
    api_key: global.gConfig.CLOUDINARY_API_KEY,
    api_secret: global.gConfig.CLOUDINARY_API_SECRET,
})

const cloudinaryRootPath = `${global.gConfig.CLOUDINARY_FOLDER}`

const createStorageWithPath = (path, transformation, options) => {
    return cloudinaryStorage({
        cloudinary,
        params: {
            tags: [options.tag],
            folder: `${cloudinaryRootPath}/${path}`,
            allowed_formats: ['jpg', 'png'],
            transformation,
        },
    })
}

const createDocumentStorageWithPath = (path, transformation, options) => {
    return cloudinaryStorage({
        cloudinary,
        params: {
            tags: [options.tag],
            folder: `${cloudinaryRootPath}/${path}`,
            allowed_formats: ['pdf'],
            transformation,
        },
    })
}

// TODO this isn't used properly, use it more
const UploadHelper = {
    generateEventTag: slug => {
        return `${cloudinaryRootPath}-event-${slug}`
    },
    generateChallengeTag: slug => {
        return `${cloudinaryRootPath}-challenge-${slug}`
    },
    generateUserTag: userId => {
        return `${cloudinaryRootPath}-user-${userId}`
    },
    generateProjectTag: (slug, teamCode) => {
        return `${cloudinaryRootPath}-event-${slug}-team-${teamCode}`
    },
    generateTeamTag: (slug, teamCode) => {
        return `${cloudinaryRootPath}-event-${slug}-team-${teamCode}-profile`
    },
    generateTravelGrantTag: (slug, userId) => {
        return `${cloudinaryRootPath}-event-${slug}-receipt-${userId}`
    },
    generateCertificateTag: slug => {
        return `${cloudinaryRootPath}-event-${slug}-certificate`
    },
    generateHackerpackTag: id => {
        return `${cloudinaryRootPath}-hackerpac-${id}`
    },
    generateAdTag: id => {
        return `${cloudinaryRootPath}-ad-${id}`
    },
    generateOrganizationTag: id => {
        return `${cloudinaryRootPath}-organization-${id}`
    },

    deleteWithTag: tag => {
        return new Promise(function (resolve, reject) {
            cloudinary.v2.api.delete_resources_by_tag(
                tag,
                function (error, result) {
                    if (error) {
                        console.error('Unable to delete images with tag', tag)
                    }
                    resolve(result)
                },
            )
        })
    },

    uploadUserAvatar: userId => {
        const storage = createStorageWithPath(
            `users/avatars/`,
            {
                width: 480,
                height: 480,
                crop: 'fill',
            },
            {
                tag: UploadHelper.generateUserTag(userId),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 2 * 1024 * 1024 },
        }).single('image')
    },

    uploadTeamBackgroundImage: (slug, teamCode) => {
        const storage = createStorageWithPath(
            `${slug}/team/${teamCode}`,
            {
                width: 480,
                height: 300,
                crop: 'fill',
            },
            {
                tag: UploadHelper.generateTeamTag(slug),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 2 * 1024 * 1024 },
        }).single('image')
    },

    uploadEventCoverImage: slug => {
        const storage = createStorageWithPath(
            `events/cover-images/`,
            {
                width: 1920,
                height: 1080,
                crop: 'fit',
            },
            {
                tag: UploadHelper.generateEventTag(slug),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 2 * 1024 * 1024 },
        }).single('image')
    },

    uploadEventLogo: slug => {
        const storage = createStorageWithPath(
            `events/logos/`,
            {
                width: 640,
                height: 640,
                crop: 'fit',
            },
            {
                tag: UploadHelper.generateEventTag(slug),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 2 * 1024 * 1024 },
        }).single('image')
    },

    uploadChallengeLogo: slug => {
        const storage = createStorageWithPath(
            `challenge/logos/`,
            {
                width: 640,
                height: 640,
                crop: 'fit',
            },
            {
                tag: UploadHelper.generateChallengeTag(slug),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 2 * 1024 * 1024 },
        }).single('image')
    },

    uploadTravelGrantReceipt: (slug, userId) => {
        const storage = createDocumentStorageWithPath(
            `events/travel-grant-receipts/`,
            {},
            {
                tag: UploadHelper.generateTravelGrantTag(slug, userId),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 10 * 1024 * 1024 },
        }).single('pdf')
    },
    uploadEventCertificate: (slug, userId) => {
        const storage = createDocumentStorageWithPath(
            `events/certificates/`,
            {},
            {
                tag: UploadHelper.generateCertificateTag(slug, userId),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 10 * 1024 * 1024 },
        }).single('pdf')
    },
    uploadProjectImage: (slug, teamCode) => {
        const storage = createStorageWithPath(
            `projects/${slug}/${teamCode}`,
            {
                width: 1920,
                height: 960,
                crop: 'fill',
            },
            {
                tag: UploadHelper.generateProjectTag(slug, teamCode),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 5 * 1024 * 1024 },
        }).single('image')
    },

    uploadHackerpackIcon: slug => {
        const storage = createStorageWithPath(
            `hackerpack`,
            {
                width: 1920,
                height: 960,
                crop: 'fill',
            },
            {
                tag: UploadHelper.generateHackerpackTag(slug),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 5 * 1024 * 1024 },
        }).single('image')
    },
    uploadAdIcon: slug => {
        const storage = createStorageWithPath(
            `ad`,
            {
                width: 1920,
                height: 960,
                crop: 'fill',
            },
            {
                tag: UploadHelper.generateAdTag(slug),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 5 * 1024 * 1024 },
        }).single('image')
    },

    uploadOrganizationIcon: slug => {
        const storage = createStorageWithPath(
            `organization`,
            {
                width: 1024,
                height: 1024,
                crop: 'fill',
            },
            {
                tag: UploadHelper.generateOrganizationTag(slug),
            },
        )
        return multer({
            storage,
            limits: { fileSize: 5 * 1024 * 1024 },
        }).single('image')
    },

    removeEventImages: slug => {
        return UploadHelper.deleteWithTag(UploadHelper.generateEventTag(slug))
    },
}

module.exports = UploadHelper
