module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  plugins: [
    'react'
  ],
  // add your custom rules here
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
  },
  settings: {
    'react': {
      'version': '16.9.0'
    }
  }
}
