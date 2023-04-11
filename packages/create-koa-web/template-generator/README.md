# koa-web-generator

It can quickly generate koa-web's app module code. For example, api, service, model and dto.
You can copy these files into your koa-web project.

> It can also help you create model-related database tables.

## usage

Quickly generate model, service, API, and DTO files.
Automatically generate database tables is turned off by default.

1. install deps

   ```bash
   pnpm install
   ```

2. Add the models you want to generate in `./src/index.ts`

   > Every model is already contains id, created_at, updated_at, deleted_at.

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

3. start generate

   ```
   $ pnpm start

   ```

After generation is complete, you can get such as files in `./src(model | service | api | dto)`.
You can copy these files into your koa-web project.

> Don't forget, this file `./src/model/index/ts` also has generated content.

## more

1. If you want to generate database tables, you can do it in `./src/index.ts`:

   ```ts
   start(models, { generateTable: true }).catch((err) => {
     console.error(err)
     process.exit(1)
   })
   ```

2. If you want to generate database tables, you must keep this file `./src/model/base.ts`.

3. when alterDatabase is true: This checks what is the current state of the table in the database, and then performs the necessary changes in the table to make it match the model.

   ```ts
   start(models, { generateTable: true, alterDatabase: true }).catch((err) => {
     console.error(err)
     process.exit(1)
   })
   ```

## Sequelize Data Types

> Refer more [go](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)

Currently, only the following types are supported:

### string:

DataTypes.STRING // VARCHAR(255)
DataTypes.TEXT // TEXT

### boolean

DataTypes.BOOLEAN // TINYINT(1)

### number

DataTypes.INTEGER // INTEGER
DataTypes.BIGINT // BIGINT
DataTypes.FLOAT // FLOAT
DataTypes.DOUBLE // DOUBLE
DataTypes.DECIMAL // DECIMAL

### date

DataTypes.DATE // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
DataTypes.DATEONLY // DATE without time
