module.exports =  {
  "extends": "eslint:recommended",
  "env":{
    "node": true,
  },
  "parserOptions": {
    "ecmaVersion": 2018,
  },
  "rules": {
    "semi": ["error", "never"],
    "quotes": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "no-unreachable": "off",
    "no-redeclare": "warn"
  }
}
