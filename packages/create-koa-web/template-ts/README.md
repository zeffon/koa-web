# Koa-Web + TypeScript

This template should help get you started developing with koa2 and TypeScript in koa-web.

## Usage

> If you are not using the `pnpm` tool, using `npm` and `yarn` are the same to achieve the same performance.

1. install dependencies

   ```
   $ pnpm install
   ```

2. start app

   ```
   $ pnpm start
   open http://127.0.0.1:3000/koa-web/v1/doc.html
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
├── __tests__                // jest test.ts
├── build                   // build output
├── coverage                // unit tests output
├── logs                    // log output
├── src
│   ├── app.ts              // koa start
│   ├── app                 // app modules
│   ├── config              // env config
│   ├── typings             // global types
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
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .prettierrc
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
```
