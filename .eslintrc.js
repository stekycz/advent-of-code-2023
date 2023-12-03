module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:array-func/all',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    'array-callback-return': [
      'error',
      {
        checkForEach: true,
      },
    ],
    'block-scoped-var': 'error',
    // See https://github.com/prettier/eslint-config-prettier#curly
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-confusing-arrow': [
      'error',
      {
        // See https://github.com/prettier/eslint-config-prettier#no-confusing-arrow
        allowParens: false,
      },
    ],
    'no-constant-binary-expression': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-labels': 'error',
    'no-promise-executor-return': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'MemberExpression[object.name="ReadPreference"][property.name="SECONDARY"]',
        message:
          'Using "ReadPreference.SECONDARY" is not allowed. Please, use ReadPreference.SECONDARY_PREFERRED instead.',
      },
      {
        selector:
          'MemberExpression[object.property.name="ReadPreference"][property.name="SECONDARY"]',
        message:
          'Using "ReadPreference.SECONDARY" is not allowed. Please, use ReadPreference.SECONDARY_PREFERRED instead.',
      },
      // See https://github.com/prettier/eslint-config-prettier#no-sequences
      {
        selector: 'SequenceExpression',
        message:
          'The comma operator is confusing and a common mistake. Don’t use it!',
      },
    ],
    'no-self-compare': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-private-class-members': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    radix: 'error',

    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/no-use': [
      'error',
      {
        allow: ['eslint-disable', 'eslint-enable', 'eslint-disable-next-line'],
      },
    ],
    'eslint-comments/require-description': 'error',

    'import/extensions': [
      'error',
      'never',
      {
        json: 'always',
      },
    ],
    'import/newline-after-import': [
      'error',
      {
        count: 1,
        considerComments: true,
      },
    ],
    'import/no-absolute-path': 'error',
    'import/no-deprecated': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/jest.config.js', '**/__tests__/**/*'],
        bundledDependencies: true,
        optionalDependencies: false,
        peerDependencies: true,
      },
    ],
    'import/no-mutable-exports': 'error',
    'import/no-relative-packages': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
        commonjs: true,
      },
    ],

    'promise/always-return': 'off',
    'promise/no-multiple-resolved': 'error',
    'promise/no-return-in-finally': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      settings: {
        'import/extensions': ['.ts', '.js', '.json', '.node'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
          node: {
            extensions: ['.ts', '.js', '.json', '.node'],
          },
        },
      },
      rules: {
        // Turn off rules that are already validated by TypeScript compiler itself. It follows the recommendation from the official docs.
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TROUBLESHOOTING.md#eslint-plugin-import
        'import/default': 'off',
        'import/named': 'off',
        'import/namespace': 'off',
        'import/no-named-as-default-member': 'off',

        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            fixStyle: 'inline-type-imports',
          },
        ],
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-confusing-void-expression': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-mixed-enums': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': [
          'error',
          {
            ignoreConditionalTests: false,
            ignoreTernaryTests: false,
            ignoreMixedLogicalExpressions: false,
          },
        ],
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/require-array-sort-compare': [
          'error',
          {
            ignoreStringArrays: true,
          },
        ],
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
          },
        ],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/unified-signatures': [
          'error',
          {
            ignoreDifferentlyNamedParameters: true,
          },
        ],
      },
    },
  ],
};
