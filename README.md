# koa2-plus

`koa2` 开发web项目**API**接口的模板仓库

## 运行

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

## 目录结构

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
│       ├── route           // 路由模块
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

## TODO

- [x] 支持TypeScript
- [x] git commit规范提交
- [x] prettier规范代码格式
- [x] 路由封装
- [x] 统一异常处理
- [x] 统一响应格式
- [x] 数据校验
- [x] MySQL数据库连接
- [x] Redis数据库连接
- [x] SQL日志记录
- [x] 支持单元测试
