const path = require('path');

module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
        es2017: true
    },
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ['tsconfig.app.json', 'tsconfig.spec.json'],
                sourceType: 'module'
            },
            plugins: ['@typescript-eslint'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:prettier/recommended'
            ],
            rules: {
                eqeqeq: ['error', 'always'],
                'no-param-reassign': 'error',
                'no-var': 'error',
                semi: ['warn', 'always'],
                'spaced-comment': 'warn',
                'no-empty-function': 'off',
                'no-unused-vars': 'off',
                'no-multi-spaces': ['error', { ignoreEOLComments: true }],
                'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
                'keyword-spacing': 'error',
                'key-spacing': 'error',
                'space-before-blocks': 'error',
                indent: 'off',
                'array-element-newline': ['error', 'consistent'],
                'prettier/prettier': [
                    'warn',
                    {
                        printWidth: 120,
                        endOfLine: 'auto',
                        tabWidth: 4
                    }
                ],
                '@typescript-eslint/no-empty-function': 0,
                '@typescript-eslint/no-var-requires': 0,
                '@typescript-eslint/no-explicit-any': 0,
                '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
                '@typescript-eslint/no-unsafe-assignment': 0,
                '@typescript-eslint/no-unsafe-member-access': 0,
                '@typescript-eslint/no-unsafe-call': 0,
                '@typescript-eslint/no-unsafe-argument': 0,
                '@typescript-eslint/prefer-regexp-exec': 0,
                '@typescript-eslint/restrict-template-expressions': 0,
                '@typescript-eslint/explicit-function-return-type': 0,
                '@typescript-eslint/member-delimiter-style': 0,
                '@typescript-eslint/array-type': ['error', { default: 'array' }],
                '@typescript-eslint/unbound-method': 0,
                '@typescript-eslint/explicit-member-accessibility': [
                    'warn',
                    { overrides: { constructors: 'no-public' } }
                ],
                '@typescript-eslint/member-ordering': [
                    'warn',
                    {
                        classes: [
                            'static-field',
                            'private-field',
                            'protected-field',
                            'public-field',
                            'constructor',
                            'static-method',
                            'public-method',
                            'private-method'
                        ]
                    }
                ],
                '@typescript-eslint/no-unsafe-enum-comparison': 0
            }
        },
        {
            files: ['*.html'],
            parser: '@html-eslint/parser',
            plugins: ['@html-eslint'],
            rules: {
                '@html-eslint/no-duplicate-attrs': 'error',
                '@html-eslint/no-duplicate-id': 'error',
                '@html-eslint/no-inline-styles': 'warn',
                '@html-eslint/no-multiple-empty-lines': 'warn',
                '@html-eslint/no-obsolete-tags': 'error',
                '@html-eslint/no-positive-tabindex': 'error',
                '@html-eslint/no-target-blank': 'error',
                '@html-eslint/quotes': 'error',
                '@html-eslint/require-li-container': 'error'
            }
        }
    ]
};
