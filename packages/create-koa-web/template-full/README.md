# Koa-Web + TypeScript

This template-full should help get you started developing with koa2 and TypeScript in koa-web.

## Usage

> If you are not using the `pnpm` tool, using `npm` and `yarn` are the same to achieve the same performance.

1. install dependencies

   ```
   $ pnpm install
   ```

2. start app

   ```dev
   $ pnpm start
   open http://127.0.0.1:3100/koa-web/v1/doc.html
   ```

3. code format

   ```
   $ pnpm format
   ```

4. build project

   ```
   $ pnpm build
   ```

5. run unit tests
   ```
   $ pnpm test
   ```

## Project Layout

template-full

```
├── __tests__               // jest test.ts
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
│       ├── swagger         // api docs and validator
│       ├── database        // database modules
│       ├── log             // log modules
│       ├── auth            // auth modules
│       ├── redis           // redis modules
│       └── cache           // node cache modules
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .prettierrc
├── jest.config.js
├── nodemon.json
├── package.json
├── README.md
└── tsconfig.json
```