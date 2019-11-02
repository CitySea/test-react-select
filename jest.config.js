module.exports = {
  setupFiles: ["./__test__/index.js"],
  moduleFileExtensions: ["js", "jsx"],
  testPathIgnorePatterns: ["/node_modules/"],
  testRegex: ".*\\.test\\.js$",
  collectCoverage: true,
  coverageDirectory: './coverage',
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__test__/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/__test__/__mocks__/styleMock.js"
  },
  transform: {
    "^.+\\.js$": "babel-jest"
  }
};
