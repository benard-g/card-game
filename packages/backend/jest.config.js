// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Test options
  testEnvironment: 'node',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', 'build'],
  clearMocks: true,
  // Coverage
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
};
