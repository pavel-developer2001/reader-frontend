module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // eslint-disable-next-line no-dupe-keys
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "react/no-unescaped-entities": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "import/extensions": "off",
    "react/jsx-filename-extension": [
      2,
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "jsx-a11y/anchor-has-content": "off",
    "react/button-has-type": "off",
    "no-shadow": "off",
    "no-undef": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  },
}
