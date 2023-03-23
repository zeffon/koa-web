# create-koa-web

The scaffolding of building Node Service with `Koa2 + TypeScript`.

The presets template are:

|                         Template                         |                Feature                 |
| :------------------------------------------------------: | :------------------------------------: |
|     [Mini](https://stackblitz.com/edit/koa-web-mini)     |     Exception, Validator, API Doc      |
|     [Lite](https://stackblitz.com/edit/koa-web-lite)     |          **Mini** + Database           |
| [Standard](https://stackblitz.com/edit/koa-web-standard) |          **Lite** + Auth, Log          |
|     [Full](https://stackblitz.com/edit/koa-web-full)     | **Standard** + Redis, Cache, Test-Unit |

## Scaffolding Your First koa-web Project

> **Compatibility Note:**
> koa-web requires [Node.js](https://nodejs.org/en/) version 14.18+, 16+.. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

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

Then follow the prompts!

You can also directly specify the project name. For example, to scaffold a koa-web project, run:

```bash
# npm 6.x
npm create koa-web@latest koa-web-starter --template standard

# npm 7+, extra double-dash is needed:
npm create koa-web@latest koa-web-starter -- --template standard

# yarn
yarn create koa-web koa-web-starter --template standard

# pnpm
pnpm create koa-web koa-web-starter --template standard
```

## Usage

Here are the default main npm scripts in a scaffolded koa-web-starter project:

```json
{
  "scripts": {
    "dev": "nodemon", // start dev serve
    "build": "tsc && tsc-alias", // build project
    "serve": "node dist/app.js" // start build serve
  }
}
```

```bash
$ cd koa-web-starter

$ npm install

$ npm run dev

# please open in: http://127.0.0.1:3100/api/doc.html
```

## Project Layout

This is `template-koa-standard` layout

```
├── src
│   ├── app.ts              // koa start
│   ├── app                 // app modules
│       ├── api             // controller layer
│       ├── dto             // Data Transfer Object
│       ├── model           // sequelize model
│       ├── service         // service processing layer
│       └── share           // util directory
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
│       └── log             // log modules
├── .gitignore
├── nodemon.json            // nodemon watch files to run serve
├── package.json
├── README.md
└── tsconfig.json
```
