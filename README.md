
Language : English | [简体中文](./README-zh-CN.md)

<h1 align="center">Koa Plus</h1>

<div align="center">

The best scaffolding of building `Koa2` restful API with `TypeScript`.

[![Build Status](https://dev.azure.com/ant-design/ant-design-pro/_apis/build/status/ant-design.ant-design-pro?branchName=master)](https://dev.azure.com/ant-design/ant-design-pro/_build/latest?definitionId=1?branchName=master) ![Github Action](https://github.com/ant-design/ant-design-pro/workflows/Node%20CI/badge.svg) ![Deploy](https://github.com/ant-design/ant-design-pro/workflows/Deploy%20CI/badge.svg) ![license](https://img.shields.io/npm/l/express.svg)

</div>

- Preview: http://preview.pro.ant.design

## Usage

1. install dependencies

   ```
   $ pnpm install
   ```

2. start app

   ```
   $ pnpm start
   ```

3. lint code

   ```
   $ pnpm lint
   ```

4. run test
   ```
   $ pnpm test
   ```

## DEMO DOC

Implement API documentation using `koa-swagger-decorator`. This tool is very intrusive, resulting in the use of decorators in previously annotated documents. We can use `koa-swagger-decorator` to verify the parameters of the verification route, which also simplifies the use to a certain extent.

API DOC：http://localhost:3000/doc.html

## Project Layout

```
├── .husky                  // hooks - here start pre-commit and commitlint
├── coverage                // test output
├── dist                    // build output
├── logs                    // log output
│   ├── error               // error log
│   └── info                // info log
├── src
│   ├── app.ts              // koa start
│   ├── app                 // app modules
│   ├── config              // env config
│   ├── typings             // ts type
│   └── core                // core mudules
│       ├── init.ts         // core start
│       ├── global.ts       // global var
│       ├── tool.ts         // tool
│       ├── exception       // global exception
│       ├── log             // log modules
│       ├── mysql           // mysql modules
│       ├── redis           // redis modules
│       ├── swagger         // api docs
│       └── validator       // data validator
├── test                    // jest test.ts
├── .cz-config.js           // commitlint tip
├── .editorconfig           // lint config
├── .gitignore
├── .prettierignore
├── .prettierrc             // prettier style config
├── commitlint.config.ts    // commit-lint config
├── jest.config.js          // jest test config
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

## Features

- :bulb: **TypeScript**: support TypeScript
- :anchor: **Commitlint**：git commitlint
- :art: **Prettier**：prettier lint code
- :rocket: **Exception**：Global exception handling
- :airplane: **Validator**：Practical and efficient data validation usage
- :zap: **MySQL**：Support for MySQL database connections
- :fire: **Redis**：Support for Redis database connections
- :1234: **Log**：Log SQL and error logs
- :white_check_mark: **Mock Test**：Support unit testing
- :memo: **API Doc**：API Doc UI

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Zeffon Wu
