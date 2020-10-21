module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:you-dont-need-momentjs/recommended",
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  }
}
