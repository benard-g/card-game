module.exports = {
  // Config
  testEnvironment: 'node',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['node_modules/', 'build/'],
  setupFiles: ['./jest.setup.ts'],
  // Test options
  clearMocks: true,
  // Coverage
  collectCoverageFrom: ['src/**/*.ts', '!src/model/migrations/*.ts'],
  coverageDirectory: 'coverage',
};
