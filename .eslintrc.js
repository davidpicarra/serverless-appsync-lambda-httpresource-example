module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['eslint:recommended', 'standard'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    curly: [2, 'all'],
    'comma-dangle': ['error', 'always-multiline'],
  },
}
