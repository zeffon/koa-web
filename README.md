
## [English](./README-en.md) | 简体中文

使用 `TypeScript` 构建 `Koa2` RESTful API 的最佳脚手架。

## 运行

> 如果你使用的不是 `pnpm` 工具的话，使用 `npm` 和 `yarn` 是一样可达到相同的执行效果。

1. 安装依赖
    ```
    $ pnpm install
    ```

2. 启动服务
    ```
    $ pnpm start
    ```

3. 代码格式化
    ```
    $ pnpm lint
    ```

4. 单元测试
    ```
    $ pnpm test
    ```

## 在线文档
使用 `koa-swagger-decorator` 实现API文档。该工具侵入性很强，导致原先注释性的文档可以使用装饰器的方式进行使用。这也一定程度上简化了使用。

API 文档：http://localhost:3000/doc.html

## 项目结构

```
├── .husky                  // hooks 相关文件 可在对应的脚本文件开启pre-commit和commitlint
├── coverage                // 单元测试生成的文件目录
├── dist                    // 编译输出的目录
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

## 计划

- [x] 支持TypeScript
- [x] git commit规范提交
- [x] prettier规范代码格式
- [x] 统一异常处理
- [x] 数据校验
- [x] MySQL数据库连接
- [x] Redis数据库连接
- [x] 日志记录
- [x] 支持单元测试
- [x] API文档测试
