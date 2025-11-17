module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': '<rootDir>/jest-transformer.js',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/*.test.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    'testUtils.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/setupTests.js',
  ],
};
