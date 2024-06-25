const plugins = [
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/material',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            libraryDirectory: 'esm',
            camel2DashComponentName: false,
        },
        'core',
    ],
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/icons-material',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            libraryDirectory: 'esm',
            camel2DashComponentName: false,
        },
        'icons',
    ],
]

module.exports = { plugins }
