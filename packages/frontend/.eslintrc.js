module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['plugin:react/recommended'],
  plugins: ['react-hooks'],
  ignorePatterns: ['src/services/graphql/generated.tsx'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
