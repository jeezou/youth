module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'prettier/prettier': 0,
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'no-underscore-dangle': 'off',
  },
};
