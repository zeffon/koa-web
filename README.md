Language : English | [简体中文](./README-zh-CN.md)

<h1 align="center">Koa Web</h1>

<div align="center">

The best scaffolding of building `Koa2` restful API with `TypeScript`.

<a href="https://github.com/zeffon/koa-web/blob/main/LICENSE">
<img src="https://img.shields.io/github/license/zeffon/koa-web?style=flat-square" alt="license">
</a>
<a href="https://github.com/zeffon/koa-web/actions/workflows/ci.yml">
<img alt="node ci" src="https://github.com/zeffon/koa-web/actions/workflows/ci.yml/badge.svg?style=flat-square">
</a>
<a href="https://github.com/zeffon/koa-web/actions/workflows/tests.yml">
<img alt="unit tests" src="https://github.com/zeffon/koa-web/actions/workflows/tests.yml/badge.svg?style=flat-square">
</a>
<a href="https://codecov.io/gh/zeffon/koa-web">
  <img src="https://codecov.io/gh/zeffon/koa-web/graph/badge.svg" alt="Code coverage status badge">
</a>
</div>

<div align="center">
<a href="https://codebeat.co/projects/github-com-zeffon-koa-web-main">
<img alt="codebeat badge" src="https://codebeat.co/badges/c0f9ed98-2950-46f0-b4ab-69999af65e7c" />
</a>
<a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fzeffon%2Fkoa-web?ref=badge_shield" alt="FOSSA Status">
  <img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fzeffon%2Fkoa-web.svg?type=shield"/>
</a>
<a href="https://github.com/zeffon/koa-web/releases/latest">
  <img alt="GitHub Release" src="https://img.shields.io/github/v/release/zeffon/koa-web.svg">
</a>
<a href="https://gitter.im/zeffon/koa-web">
  <img alt="Gitter" src="https://badges.gitter.im/zeffon/koa-web.svg">
</a>
</div>

- Preview: https://zeffon.cn/koa-web/v1/doc.html

- Getting Started: [![Edit koa-web](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zeffon-koa-web-vjojoe)

## Features

- :bulb: **TypeScript**: support TypeScript
- :anchor: **Commitlint**：git commitlint
- :art: **Prettier**：prettier lint code
- :rocket: **Exception**：Global exception handling
- :airplane: **Validator**：Practical and efficient data validation usage
- :zap: **MySQL**：Support for MySQL database connections
- :fire: **Redis**：Support for Redis database connections
- :1234: **Log**：Log SQL and error logs
- :white_check_mark: **Unit Test**：Support unit test
- :memo: **API Doc**：API Doc UI

## Usage

> If you are not using the `pnpm` tool, using `npm` and `yarn` are the same to achieve the same performance.

1. install dependencies

   ```
   $ pnpm install
   ```

2. start app

   ```
   $ pnpm start
   or
   $ pnpm prod
   ```

3. code format

   ```
   $ pnpm format
   ```

4. run unit tests
   ```
   $ pnpm test
   ```

## Project Layout

```
├── __tests__               // jest test.ts
├── build                   // build output
├── coverage                // unit tests output
├── logs                    // log output
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
├── .editorconfig           // lint config
├── .gitignore
├── .prettierignore
├── .prettierrc             // prettier style config
├── jest.config.js          // jest test config
├── package.json
├── README.md
└── tsconfig.json
```

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fzeffon%2Fkoa-web.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fzeffon%2Fkoa-web?ref=badge_large)

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Zeffon Wu
