/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/prisma/test/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/prisma/test/singleton.ts'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx']
};