module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-safe-area-context|react-native-screens)/)",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/__tests__/",
    "<rootDir>/test-utils/",
    "<rootDir>/jest.setup.js",
  ],
};
