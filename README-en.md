## English | [简体中文](./README.md)

The best scaffolding of building `Koa2` restful API with `TypeScript`.

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

Implement API documentation using `koa-swagger-decorator`. This tool is very intrusive, resulting in the use of decorators in previously annotated documents. This also simplifies usage to some extent.

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

## TODO

- [x] TypeScript
- [x] git commitlint
- [x] prettier lint code
- [x] global exception
- [x] data validator
- [x] mysql connect
- [x] redis connect
- [x] log output
- [x] unit test
- [x] api doc
