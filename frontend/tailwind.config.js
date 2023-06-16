module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    prefix: 'tw-',
    purge: {
        content: [
            './src/*.js',
            './src/**/*.js',
            './src/**/**/*.js',
            './src/**/**/**/*.js',
            './src/**/**/**/**/*.js',
            './src/**/**/**/**/**/*.js',
        ],
    },
    theme: {
        extend: {
            spacing: {
                '600px': '600px',
            },
        },
    },
    variants: {},
    plugins: [],
}
