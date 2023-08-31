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
                '672px': '672px',
                '576px': '576px',
            },
            minHeight: {
                '600px': '600px',
                '672px': '672px',
                '576px': '576px',
            },
        },
    },
    variants: {},
    plugins: [],
}
