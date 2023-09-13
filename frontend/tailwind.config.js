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
                '400px': '400px',
                '464px': '464px',
                '500px': '500px',
                '576px': '576px',
                '600px': '600px',
                '672px': '672px',
            },
            minHeight: {
                '576px': '576px',
                '600px': '600px',
                '672px': '672px',
            },
        },
    },
    variants: {},
    plugins: [],
}
