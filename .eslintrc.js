module.exports = {
  parser: "babel-eslint",
  extends: [ "airbnb" ],
  globals: {
    google: true,
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    "react",
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: "webpack.config.prod.js"
      }
    }
  },
  rules: {
    'react/no-array-index-key': 'off',
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to", "hrefLeft", "hrefRight" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
        "every": [ "id" ]
      },
      "allowChildren": false
    }]
  }
};
