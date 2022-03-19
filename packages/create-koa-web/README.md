# create-koa-web

## Scaffolding Your First koa-web Project

> **Compatibility Note:**
> koa-web requires [Node.js](https://nodejs.org/en/) version >=12.2.0. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

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

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a koa-web project, run:

```bash
# npm 6.x
npm create koa-web@latest my-koa-web --template template-ts

# npm 7+, extra double-dash is needed:
npm create koa-web@latest my-koa-web -- --template template-ts

# yarn
yarn create koa-web my-koa-web --template template-ts

# pnpm
pnpm create koa-web my-koa-web --config.template=template-ts
```

Currently supported template presets include:

- `template-ts`
- `template-js`

> I recommend using `template-ts`.

## Usage

```bash
$ cd my-koa-web

$ npm install

$ npm run start

# please open in: http://127.0.0.1:3000/koa-web/v1/doc.html
```
