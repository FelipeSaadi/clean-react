module.exports = {
  roots: ['<rootDir>/src'],
  collectionCoverageFrom: [
    '<rootDir>/src/**/*.{ts, tsx}'
  ],
  coverageDirectory: 'coverage',
  testEvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}