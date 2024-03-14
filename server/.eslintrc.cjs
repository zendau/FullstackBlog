module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020, // или более новая версия
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:import/recommended",
    " plugin:import/errors",
    "plugin:import/warnings",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "node/no-extraneous-require": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
      },
    ],
  },
}
