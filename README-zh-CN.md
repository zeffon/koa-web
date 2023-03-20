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
<a href="https://github.com/zeffon/koa-web/releases/latest">
  <img alt="GitHub Release" src="https://img.shields.io/github/v/release/zeffon/koa-web.svg">
</a>
</div>

## 特性

预设的模板如下:

|                           模板                           |                 功能                  |
| :------------------------------------------------------: | :-----------------------------------: |
|     [Mini](https://stackblitz.com/edit/koa-web-mini)     |     全局异常, 数据校验, API 文档      |
|     [Lite](https://stackblitz.com/edit/koa-web-lite)     |           **Mini** + 数据库           |
| [Standard](https://stackblitz.com/edit/koa-web-standard) |         **Lite** + 认证, 日志         |
|     [Full](https://stackblitz.com/edit/koa-web-full)     | **Standard** + Redis, Cache, 单元测试 |

- :bulb: **TypeScript**: 支持 TypeScript
- :art: **prettier**：prettier 规范代码格式
- :rocket: **全局异常**：全局异常统一处理
- :airplane: **数据校验**：实用且高效的数据校验方式
- :memo: **API 文档**：API 文档测试
- :four_leaf_clover: **数据库**：支持 Sequelize 连接
- :writing_hand: **认证**：通用 JWT 授权
- :book: **日志**：记录 SQL 日志和错误日志
- :zap: **Cache**：支持 本地缓存
- :fire: **Redis**：支持 Redis 数据库连接
- :white_check_mark: **单元测试**：支持单元测试

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

下面是通过脚手架创建的 koa-web-starter 项目中默认的主要 npm scripts：

```json
{
  "scripts": {
    "format": "prettier --write --cache .", // 格式化代码
    "dev": "nodemon", // 启动dev环境的服务
    "build": "tsc", // 构建项目
    "serve": "node build/app.js" // 启动prod环境的服
  }
}
```

```bash
$ cd koa-web-starter

$ npm install

$ npm run dev

# please open in: http://127.0.0.1:3100/koa-web/v1/doc.html
```

## 项目结构

`template-koa-full` 模板结构

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
│       ├── exception       // 统一异常
│       ├── auth            // 授权模块
│       ├── swagger         // API文档和参数校验
│       ├── database        // 数据库模块
│       ├── auth            // 认证模块
│       ├── log             // 日志模块
│       ├── redis           // redis模块
│       └── cache           // Node缓存
├── .editorconfig           // lint 自定义格式化
├── .gitignore
├── .prettierignore
├── .prettierrc             // 配置代码格式化风格
├── jest.config.js          // jest单元测试配置
├── nodemon.json            // nodemon监听文件来启动服务
├── package.json
├── README.md
└── tsconfig.json
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Zeffon Wu
