module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>packages/create-koa-web/template-koa/src$1'
  },
  roots: [
    './packages/create-koa-web/template-koa' // jest 扫描的目录
  ]
}
