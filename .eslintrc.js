module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    mocha: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },

  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],

  rules: {
    // ======================================== Javascript ========================================
    // Possible Problem
    'no-unused-vars': [ 1, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],

    // Suggestions
    'camelcase': [ 2, { properties: 'never' }],
    'capitalized-comments': 2,
    'default-case-last': 2,
    'eqeqeq': 2,
    'func-style': 2,
    'grouped-accessor-pairs': [ 2, 'getBeforeSet' ],
    'new-cap': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-empty': [ 2, { allowEmptyCatch: true }],
    'no-eval': 2,
    'no-extend-native': 2,
    'no-floating-decimal': 2,
    'no-implicit-coercion': 2,
    'no-implied-eval': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-lonely-if': 2,
    'no-multi-str': 2,
    'no-nested-ternary': 2,
    'no-new-func': 2,
    'no-new-object': 2,
    'no-new-wrappers': 2,
    'no-proto': 2,
    'no-script-url': 2,
    'no-sequences': 2,
    'no-undef-init': 2,
    'no-unneeded-ternary': 2,
    'no-useless-call': 2,
    'no-var': 2,
    'no-void': 2,
    'one-var': [ 2, 'never' ],
    'prefer-const': 2,
    'quote-props': [ 2, 'consistent-as-needed' ],
    'spaced-comment': 2,

    // Layout & Formatting
    'array-bracket-newline': [ 2, 'consistent' ],
    'array-bracket-spacing': [ 2, 'always', { singleValue: false, objectsInArrays: false, arraysInArrays: false }],
    'arrow-parens': 2,
    'arrow-spacing': 2,
    'brace-style': [ 2, 'stroustrup', { allowSingleLine: true }],
    'comma-dangle': 2,
    'comma-spacing': 2,
    'comma-style': 2,
    'computed-property-spacing': 2,
    'dot-location': [ 2, 'property' ],
    'eol-last': [ 2, 'never' ],
    'func-call-spacing': 2,
    'generator-star-spacing': [ 2, { anonymous: 'neither' }],
    'indent': [ 2, 2, { SwitchCase: 1, VariableDeclarator: 'first' }],
    'key-spacing': 2,
    'keyword-spacing': 2,
    'lines-between-class-members': [ 2, 'always', { exceptAfterSingleLine: true }],
    'new-parens': 2,
    'no-extra-parens': [ 2, 'all', { nestedBinaryExpressions: false }],
    'no-multi-spaces': 2,
    'no-multiple-empty-lines': 2,
    'no-tabs': 2,
    'no-trailing-spaces': 2,
    'object-curly-spacing': [ 2, 'always' ],
    'operator-linebreak': [ 2, 'none' ],
    'quotes': [ 2, 'single' ],
    'semi': [ 2, 'never' ],
    'semi-spacing': 2,
    'space-before-blocks': 2,
    'space-before-function-paren': [ 2, 'never' ],
    'space-in-parens': 2,
    'space-infix-ops': 2,
    'space-unary-ops': 2,
    'template-curly-spacing': 2,
    'wrap-iife': [ 2, 'inside', { functionPrototypeMethods: true }],
    'wrap-regex': 2,


    // ======================================== Typescript ========================================
    // Supported Rules
    '@typescript-eslint/array-type': 2,
    '@typescript-eslint/member-delimiter-style': 2,
    '@typescript-eslint/method-signature-style': 2,
    '@typescript-eslint/no-confusing-non-null-assertion': 2,
    '@typescript-eslint/no-dynamic-delete': 2,
    '@typescript-eslint/prefer-function-type': 2,
    '@typescript-eslint/sort-type-union-intersection-members': 2,
    '@typescript-eslint/type-annotation-spacing': 2,

    // Extension Rules
    '@typescript-eslint/brace-style': [ 2, 'stroustrup', { allowSingleLine: true }],
    '@typescript-eslint/comma-dangle': 2,
    '@typescript-eslint/comma-spacing': 2,
    '@typescript-eslint/func-call-spacing': 2,
    '@typescript-eslint/indent': [ 2, 2 ],
    '@typescript-eslint/keyword-spacing': 2,
    '@typescript-eslint/lines-between-class-members': 2,
    '@typescript-eslint/no-extra-parens': [ 2, 'all', { nestedBinaryExpressions: false }],
    '@typescript-eslint/no-unused-vars': [ 1, { varsIgnorePattern: '^_' }],
    '@typescript-eslint/object-curly-spacing': [ 2, 'always' ],
    '@typescript-eslint/quotes': [ 2, 'single' ],
    '@typescript-eslint/semi': [ 2, 'never' ],
    '@typescript-eslint/space-before-function-paren': [ 2, 'never' ],
    '@typescript-eslint/space-infix-ops': 2
  }
}