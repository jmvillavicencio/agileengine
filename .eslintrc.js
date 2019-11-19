module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  // add your custom rules here
  rules: {
    'import/no-unresolved': [0],
    'import/no-extraneous-dependencies': [0],
    'no-param-reassign': ['error', { props: false }],
    'arrow-body-style': [0, 'as-needed'],
    'prefer-destructuring': [0],
    'global-require': [0],
    'no-use-before-define': [0],
    'max-len': [0],
    camelcase: [0],
    semi: [1, 'always'],
    'comma-dangle': 0,
    'space-before-function-paren': ['error', 'never'],
    'no-underscore-dangle': [0],
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-v-html': 'off',
    'vue/order-in-components': 'off',
    'vue/html-self-closing': 'off'
  }
};
