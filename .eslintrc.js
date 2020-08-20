module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-async-in-computed-properties': 'warn',
    'vue/no-dupe-keys': 'warn',
    'vue/no-duplicate-attributes': 'warn',
    'vue/no-parsing-error': 'warn',
    'vue/no-reserved-keys': 'warn',
    'vue/no-shared-component-data': 'warn'
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
