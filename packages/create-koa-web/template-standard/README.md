# Koa-Web + TypeScript

This template-standard should help get you started developing with koa2 and TypeScript in koa-web.

## Usage

> If you are not using the `pnpm` tool, using `npm` and `yarn` are the same to achieve the same performance.

1. install dependencies

   ```
   $ pnpm install
   ```

2. start app

   ```dev
   $ pnpm dev
   # please open in: http://127.0.0.1:3100/api/doc.html
   ```

3. build project

   ```
   $ pnpm build
   ```

4. run build

   ```
   $ pnpm serve
   ```

## Project Layout

template-standard

```
├── dist                   // build output
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
│       ├── auth            // auth modules
│       └── log             // log modules
├── .gitignore
├── nodemon.json
├── package.json
├── README.md
└── tsconfig.json
```

## Generator

koa-web-generator can quickly generate koa-web's app module code and database table.

Generate content: model, service, API, and DTO files.

> Automatically generate database tables is turned off by default.

1. pull project & install deps

   ```bash
   pnpm create koa-web koa-web-generator --template generator

   cd ./koa-web-generator

   pnpm install
   ```

2. Add the models you want to generate in `./src/index.ts`

   > Every model is already contains `id`, `created_at`, `updated_at`, `deleted_at`.

   ```ts
   const models: ModelProps[] = [
     {
       name: 'user_alpha',
       comment: 'user comment',
       fields: [
         {
           fieldName: 'username',
           type: 'STRING(20)',
           allowNull: false,
           unique: 'username_idx',
         },
         {
           fieldName: 'password',
           type: 'STRING',
           allowNull: false,
           comment: 'password comment',
         },
         {
           fieldName: 'type',
           type: 'BOOLEAN',
           defaultValue: '0',
         },
       ],
     },
   ]
   ```

3. start generate

   ```bash
   pnpm start
   ```

After generation is complete, you can get such as files in `./src(model | service | api | dto)`
You can copy these files into your koa-web project.

> Don't forget, the file `./src/model/index/ts` also has generated content.
