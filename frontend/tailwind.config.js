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
            backgroundImage: {
                'wave-pattern': "url('../assets/images/nawbar_waves.svg')",
            },
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
            minWidth: {
                '360px': '360px',
                '540px': '540px',
            },
        },
    },
    variants: {},
    plugins: [],
}
