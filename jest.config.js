const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  // 使用 ts-jest 来执行 typescript 编写的测试用例
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
