module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true
    },
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        'no-console': 1,
        'import/no-unused-modules': [1, { unusedExports: true }]
    }
};
