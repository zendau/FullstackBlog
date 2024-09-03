export default {
  transform: {
    "^.+\\.m?js$": "babel-jest",
  },
  clearMocks: true,
  testPathIgnorePatterns: ["<rootDir>/__test__/e2e"],
}
