Language : [English](./README.md) | 简体中文

<h1 align="center">Koa Web</h1>

<div align="center">

使用 `TypeScript` 构建 `Koa2` RESTful API 最佳的脚手架。

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

- 预览：https://zeffon.cn/koa-web/doc.html

- 快速上手：[![Edit koa-web](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zeffon-koa-web-vjojoe)

## 特性

- :bulb: **TypeScript**: 支持 TypeScript
- :art: **prettier**：prettier 规范代码格式
- :rocket: **全局异常**：全局异常统一处理
- :airplane: **数据校验**：实用且高效的数据校验方式
- :four_leaf_clover: **Database**：支持 Sequelize 连接
- :fire: **Redis**：支持 Redis 数据库连接
- :zap: **Cache**：支持 本地缓存
- :writing_hand: **Auth**：通用 JWT 授权
- :book: **日志**：记录 SQL 日志和错误日志
- :white_check_mark: **单元测试**：支持单元测试
- :memo: **API 文档**：API 文档测试

## 运行

`koa-web` 支持通过 `create` 指令快速搭建项目.

**搭建你的第一个 koa-web 项目**

使用 NPM:

```bash
$ npm create koa-web@latest
```

使用 Yarn:

```bash
$ yarn create koa-web
```

使用 PNPM:

```bash
$ pnpm create koa-web
```

启动项目

```bash
$ cd koa-web-project

$ npm install

$ npm run start

# please open in: http://127.0.0.1:3000/koa-web/v1/doc.html
```

## 项目结构

`template-ts` 模板结构

```
├── __tests__               // 单元测试编写目录集合
├── build                   // 编译输出的目录
├── coverage                // 单元测试生成的文件目录
├── logs                    // 日志记录的目录
├── src
│   ├── app.ts              // koa 入口文件
│   ├── app                 // 应用目录
│   ├── config              // 环境配置
│   ├── typings             // 变量声明目录
│   └── core                // 核心模块目录
│       ├── init.ts         // 核心模块入口
│       ├── global.ts       // 全局变量
│       ├── tool.ts         // 工具类
│       ├── auth            // 授权模块
│       ├── cache           // 本地缓存
│       ├── database        // 数据库模块
│       ├── exception       // 统一异常
│       ├── log             // 日志模块
│       ├── redis           // redis模块
│       ├── swagger         // API文档模块
│       └── validator       // 数据校验
├── .editorconfig           // lint 自定义格式化
├── .gitignore
├── .prettierignore
├── .prettierrc             // 配置代码格式化风格
├── jest.config.js          // jest单元测试配置
├── package.json
├── README.md
└── tsconfig.json
```

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fzeffon%2Fkoa-web.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fzeffon%2Fkoa-web?ref=badge_large)

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Zeffon Wu
