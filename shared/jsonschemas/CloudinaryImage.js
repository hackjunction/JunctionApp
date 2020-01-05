module.exports = {
    $id: '/CloudinaryImage',
    title: 'Cloudinary Image',
    description: 'An image uploaded to Cloudinary',
    type: 'object',
    properties: {
        url: {
            title: 'URL',
            description: 'The publicly accessible URL of the full image',
            type: 'string',
            format: 'uri',
        },
        publicId: {
            title: 'Public ID',
            description: 'The Cloudinary publicId of the image',
            type: 'string',
        },
    },
    required: ['url', 'publicId'],
}
