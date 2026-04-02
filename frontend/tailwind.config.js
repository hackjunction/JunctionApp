module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    prefix: 'tw-',
    purge: {
        enabled: true,
        content: ['./src/**/*.js', './public/index.html'],
    },
    theme: {
        extend: {
            colors: {
                'tch-dark': '#001d24',
                'tch-darker': '#061126',
                'tch-card': '#0c2c34',
                'tch-primary': '#4dffd1',
                'tch-primary-dark': '#25c49a',
                'tch-green': '#529777',
                'tch-separator': '#0c2c34',
            },
            backgroundImage: {
                'wave-pattern': "url('../assets/images/nawbar_waves.svg')",
            },
            spacing: {
                '270px': '270px',
                '400px': '400px',
                '464px': '464px',
                '480px': '480px',
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
