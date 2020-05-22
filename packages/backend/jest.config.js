// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // The test environment that will be used for testing
  testEnvironment: "node",
  testPathIgnorePatterns: ['/node_modules/', 'build'],
  clearMocks: true,
  // Coverage
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
};
