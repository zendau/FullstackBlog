module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020, // или более новая версия
  },
  extends: ["eslint:recommended", "plugin:node/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "node/no-extraneous-require": "off",
  },
}
