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
<a href="https://github.com/zeffon/koa-web/releases/latest">
  <img alt="GitHub Release" src="https://img.shields.io/github/v/release/zeffon/koa-web.svg">
</a>
</div>

## Features

The presets template are:

|                         Template                         |                Feature                 |
| :------------------------------------------------------: | :------------------------------------: |
|     [Mini](https://stackblitz.com/edit/koa-web-mini)     |     Exception, Validator, API Doc      |
|     [Lite](https://stackblitz.com/edit/koa-web-lite)     |          **Mini** + Database           |
| [Standard](https://stackblitz.com/edit/koa-web-standard) |          **Lite** + Auth, Log          |
|     [Full](https://stackblitz.com/edit/koa-web-full)     | **Standard** + Redis, Cache, Test-Unit |

- :bulb: **TypeScript**: support TypeScript
- :art: **Prettier**：prettier lint code
- :rocket: **Exception**：Global exception handling
- :airplane: **Validator**：Practical and efficient data validation usage
- :memo: **API Doc**：API Doc UI
- :four_leaf_clover: **Database**：Support for Sequelize connections
- :writing_hand: **Auth**：General JWT authorization
- :book: **Log**：Log SQL and error logs
- :fire: **Redis**：Support for Redis database connections
- :zap: **Cache**：Support for Local Cache
- :white_check_mark: **Test-Unit**：Support unit test

## Usage

The `koa-web` supports quick creation of project through the `create` command.

**Scaffolding Your First koa-web Project**

With NPM:

```bash
$ npm create koa-web@latest
```

With Yarn:

```bash
$ yarn create koa-web
```

With PNPM:

```bash
$ pnpm create koa-web
```

Here are the default main npm scripts in a scaffolded koa-web-starter project:

```json
{
  "scripts": {
    "format": "prettier --write --cache .", // format code with prettier
    "dev": "nodemon", // start dev server
    "build": "tsc && tsc-alias", // build project
    "serve": "node build/app.js" // start build server
  }
}
```

```bash
cd koa-web-starter

npm install

npm run dev

# please open in: http://127.0.0.1:3100/koa-web/v1/doc.html
```

## Project Layout

This is `template-koa-full` layout

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
│       ├── swagger         // api docs and validator
│       ├── database        // database modules
│       ├── auth            // auth modules
│       ├── log             // log modules
│       ├── redis           // redis modules
│       └── cache           // node cache
├── .editorconfig           // lint config
├── .gitignore
├── .prettierignore
├── .prettierrc             // prettier style config
├── jest.config.js          // jest test config
├── nodemon.json            // nodemon watch files to run server
├── package.json
├── README.md
└── tsconfig.json
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Zeffon Wu
