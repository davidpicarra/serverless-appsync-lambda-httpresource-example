module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '\\.(js)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(apollo-link.*?\\.js$))',
  ],
}
