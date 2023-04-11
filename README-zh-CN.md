Language : [English](./README.md) | 简体中文

<h1 align="center">Koa Web</h1>

<div align="center">

使用 `Koa2 + TypeScript` 构建 Node 服务的脚手架。

<a href="https://www.npmjs.com/package/create-koa-web">
  <img alt="npm release" src="https://img.shields.io/npm/v/create-koa-web.svg">
</a>
<a href="https://github.com/zeffon/koa-web/blob/main/LICENSE">
<img alt="license" src="https://img.shields.io/github/license/zeffon/koa-web?style=flat-square">
</a>
<a href="https://github.com/zeffon/koa-web/actions/workflows/ci.yml">
<img alt="node ci" src="https://github.com/zeffon/koa-web/actions/workflows/ci.yml/badge.svg?style=flat-square">
</a>
</div>

## 特性

预设的模板如下:

|                            模板                            |                 功能                  |
| :--------------------------------------------------------: | :-----------------------------------: |
|      [Mini](https://stackblitz.com/edit/koa-web-mini)      |     全局异常, 数据校验, API 文档      |
|      [Lite](https://stackblitz.com/edit/koa-web-lite)      |           **Mini** + 数据库           |
|  [Standard](https://stackblitz.com/edit/koa-web-standard)  |         **Lite** + 认证, 日志         |
|      [Full](https://stackblitz.com/edit/koa-web-full)      | **Standard** + Redis, Cache, 单元测试 |
| [Generator](https://stackblitz.com/edit/koa-web-generator) |      生成 app 模块代码和数据库表      |

- :bulb: **TypeScript**: 支持 TypeScript
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
    "dev": "nodemon", // 启动dev环境的服务
    "build": "tsc", // 构建项目
    "serve": "node dist/app.js" // 启动prod环境的服
  }
}
```

```bash
$ cd koa-web-starter

$ npm install

$ npm run dev

# please open in: http://127.0.0.1:3100/api/doc.html
```

## 项目结构

`template-koa-standard` 模板结构

```
├── src
│   ├── app.ts              // koa 入口文件
│   ├── app                 // 应用目录
│       ├── api             // api控制层
│       ├── dto             // 数据传输对象
│       ├── model           // Sequelize模型层
│       ├── service         // 服务处理层
│       └── share           // 通用工具
│   ├── config              // 环境配置
│   ├── typings             // 变量声明目录
│   └── core                // 核心模块目录
│       ├── init.ts         // 核心模块入口
│       ├── global.ts       // 全局变量
│       ├── tool.ts         // 工具类
│       ├── exception       // 统一异常
│       ├── swagger         // API文档和参数校验
│       ├── database        // 数据库模块
│       ├── auth            // 授权模块
│       └── log             // 日志模块
├── .gitignore
├── nodemon.json            // nodemon监听文件来启动服务
├── package.json
├── README.md
└── tsconfig.json
```

## Generator

koa-web-generator 可以快速生成 app 模块代码和数据库表.

生成的内容： model, service, API, and DTO 这些模块文件.

> 自动生成数据库表默认是关闭的

1. 拉取项目 & 安装依赖

   ```bash
   pnpm create koa-web koa-web-starter --template generator

   cd ./koa-web-generator

   pnpm install
   ```

2. 在`./src/index.ts`添加你想生成的模型

   > 每个模型已经内置了 `id`, `created_at`, `updated_at`, `deleted_at`.

   ```ts
   const models: ModelProps[] = [
     {
       name: 'user',
       fields: [
         { fieldName: 'username', type: DataTypes.STRING, allowNull: false },
         { fieldName: 'password', type: DataTypes.STRING, allowNull: false },
       ],
     },
   ]
   ```

3. 开始生成

   ```bash
   pnpm start
   ```

生成完成后, 你可以在 `./src(model | service | api | dto)` 目录查看生成的文件.
你可以复制这些文件应用到你的 koa-web 项目中.

> 不要忘记, `./src/model/index/ts`这个文件也有生成内容.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Zeffon Wu
