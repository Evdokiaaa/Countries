module.exports = {
  extends: ["semistandard"],
  env: {
    browser: true,
    es6: true
  },
  rules: {
    quotes: ["error", "double"],
    "space-before-function-paren": ["error", "never"]
  },
  globals: {
    Darkmode: "readonly"
  }
};
