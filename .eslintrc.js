module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',

    allowImportExportEverywhere: true,  //for dynamic imports
  },
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
  },
};