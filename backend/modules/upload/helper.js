const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: global.gConfig.CLOUDINARY_CLOUD_NAME,
    api_key: global.gConfig.CLOUDINARY_API_KEY,
    api_secret: global.gConfig.CLOUDINARY_API_SECRET
});

const cloudinaryRootPath = `${global.gConfig.CLOUDINARY_FOLDER}`;

const createStorageWithPath = (path, transformation, options) => {
    return cloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            tags: [options.tag],
            folder: `${cloudinaryRootPath}/${path}`,
            allowed_formats: ['jpg', 'png'],
            transformation
        }
    });
};

const createDocumentStorageWithPath = (path, transformation, options) => {
    return cloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            tags: [options.tag],
            folder: `${cloudinaryRootPath}/${path}`,
            allowed_formats: ['pdf'],
            transformation
        }
    });
};

const UploadHelper = {
    generateEventTag: slug => {
        return `${cloudinaryRootPath}-event-${slug}`;
    },

    generateReimbursementDetailsTag: (slug, userId) => {
        return `${cloudinaryRootPath}-event-${slug}-receipt-${userId}`;
    },

    deleteWithTag: tag => {
        return new Promise(function(resolve, reject) {
            cloudinary.v2.api.delete_resources_by_tag(tag, function(error, result) {
                if (error) {
                    console.error('Unable to delete images with tag', tag);
                }
                resolve(result);
            });
        });
    },

    uploadEventCoverImage: slug => {
        const storage = createStorageWithPath(
            `events/cover-images/`,
            {
                width: 1920,
                height: 1080,
                crop: 'fill',
                gravity: 'auto'
            },
            {
                tag: UploadHelper.generateEventTag(slug)
            }
        );
        return multer({ storage }).single('image');
    },

    uploadEventLogo: slug => {
        const storage = createStorageWithPath(
            `events/logos/`,
            {
                width: 640,
                height: 640,
                crop: 'fit'
            },
            {
                tag: UploadHelper.generateEventTag(slug)
            }
        );
        return multer({ storage }).single('image');
    },

    uploadReimbursementReceipt: (slug, userId) => {
        const storage = createDocumentStorageWithPath(
            `events/reimbursements-receipts/`,
            {},
            {
                tag: UploadHelper.generateReimbursementDetailsTag(slug, userId)
            }
        );
        return multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024} }).single('receipt');
    },

    removeEventImages: slug => {
        return UploadHelper.deleteWithTag(UploadHelper.generateEventTag(slug));
    }
};

module.exports = UploadHelper;
