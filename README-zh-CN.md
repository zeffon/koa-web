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
- :anchor: **commitlint**：git commit 规范提交
- :art: **prettier**：prettier 规范代码格式
- :rocket: **全局异常**：全局异常统一处理
- :airplane: **数据校验**：实用且高效的数据校验方式
- :zap: **MySQL**：支持 MySQL 数据库连接
- :fire: **Redis**：支持 Redis 数据库连接
- :book: **日志**：记录 SQL 日志和错误日志
- :white_check_mark: **单元测试**：支持单元测试
- :memo: **API 文档**：API 文档测试

## 运行

> 如果你使用的不是 `pnpm` 工具的话，使用 `npm` 和 `yarn` 是一样可达到相同的执行效果。

1. 安装依赖

   ```
   $ pnpm install
   ```

2. 启动服务

   ```
   $ pnpm start
   或者
   $ pnpm prod
   ```

3. 代码格式化

   ```
   $ pnpm format
   ```

4. 单元测试
   ```
   $ pnpm test
   ```

## 项目结构

```
├── .husky                  // hooks 相关文件 可在对应的脚本文件开启pre-commit和commitlint
├── coverage                // 单元测试生成的文件目录
├── build                    // 编译输出的目录
├── logs                    // 日志记录的目录
│   ├── error               // 错误日志
│   └── info                // 查询日志
├── src
│   ├── app.ts              // koa 入口文件
│   ├── app                 // 应用目录
│   ├── config              // 环境配置
│   ├── typings             // 变量声明目录
│   └── core                // 核心模块目录
│       ├── init.ts         // 核心模块入口
│       ├── global.ts       // 全局变量
│       ├── tool.ts         // 工具类
│       ├── exception       // 统一异常
│       ├── log             // 日志模块
│       ├── mysql           // mysql模块
│       ├── redis           // redis模块
│       ├── swagger         // API文档模块
│       └── validator       // 数据校验
├── test                    // 单元测试编写目录集合
├── .cz-config.js           // 配置 commit 信息引导提示
├── .editorconfig           // lint 自定义格式化
├── .gitignore
├── .prettierignore
├── .prettierrc             // 配置代码格式化风格
├── commitlint.config.ts    // commit-lint 配置文件
├── jest.config.js          // jest单元测试配置
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fzeffon%2Fkoa-web.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fzeffon%2Fkoa-web?ref=badge_large)

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Zeffon Wu
