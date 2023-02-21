import nextJest from "next/jest"

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  // moduleDirectories: ["node_modules", "<rootDir>/"],
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // moduleNameMapper: {
  //   "^@/components/(.*)$": "<rootDir>/components/$1",
  // },
  // testPathIgnorePatterns: ["cypress"],
  // testEnvironment: "jsdom",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
}

module.exports = createJestConfig(customJestConfig)
