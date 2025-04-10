/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Use 'jsdom' if testing browser-like environments
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  // Setup files to run before test suite
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Uncomment if you have a setup file

  // Ignore patterns if needed, e.g., for build directories
  // testPathIgnorePatterns: [
  //   "<rootDir>/node_modules/",
  //   "<rootDir>/.next/",
  // ],
  // transformIgnorePatterns: [ // Might be needed if dependencies use ESM
  //   "/node_modules/(?!your-esm-dependency).+\\.js$"
  // ],

  // If using ESM and need experimental features
  // extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // transform: {
  //   '^.+\\.(ts|tsx)$': [
  //     'ts-jest', {
  //       useESM: true,
  //       // other ts-jest options...
  //     }
  //   ],
  // },
};
