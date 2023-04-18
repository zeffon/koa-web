import {
  customModelToDTOParams,
  customModelToModelField,
  formatModelName,
} from './converter'
import type { ModelProps } from './start'

export const getApiTemplate = (modelName: string) => {
  const modelNameWithUppercase = formatModelName(modelName)
  const template = `import type { Context } from 'koa'
import {
  body,
  description,
  path,
  prefix,
  query,
  request,
  summary,
  tags,
} from 'koa-swagger-decorator'
import { pagingSchema } from '~/app/dto/base'
import { oneSchema, updateOneSchema } from '~/app/dto/${modelName}'
import {
  createOne,
  deleteById,
  getById,
  getList,
  getPage,
  updateOne,
} from '~/app/service/${modelName}'

const tag = tags(['${modelName}'])

@prefix('/${modelName}')
export default class ${modelNameWithUppercase}Controller {
  @request('get', '/{id}/detail')
  @summary('Get ${modelName} detail')
  @description('example: /${modelName}/1/detail')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  async detail(ctx: Context) {
    const { id } = ctx.validatedParams
    const one = await getById(id)
    ctx.body = one
  }

  @request('get', '/list')
  @summary('Get ${modelName} list')
  @description('example: /${modelName}/list')
  @tag
  async list(ctx: Context) {
    const list = await getList()
    ctx.body = { list }
  }

  @request('get', '/page')
  @summary('Get ${modelName} page')
  @description('example: /${modelName}/page')
  @tag
  @query(pagingSchema)
  async page(ctx: Context) {
    const paging = await getPage(ctx)
    ctx.body = { ...paging }
  }

  @request('post', '')
  @summary('create ${modelName}')
  @description('example: /${modelName}')
  @tag
  @body(oneSchema)
  async create(ctx: Context) {
    const one = ctx.validatedBody
    await createOne(one)
    global.UnifyResponse.createSuccess({ code: global.SUCCESS_CODE })
  }

  @request('put', '')
  @summary('update ${modelName}')
  @description('example: /${modelName}')
  @tag
  @body(updateOneSchema)
  async update(ctx: Context) {
    const one = ctx.validatedBody
    await updateOne(one)
    global.UnifyResponse.updateSuccess({ code: global.SUCCESS_CODE })
  }

  @request('delete', '/{id}')
  @summary('delete ${modelName}')
  @description('example: /${modelName}/{id}')
  @tag
  @path({
    id: { type: 'number', required: true, default: null, description: 'id' },
  })
  async delete(ctx: Context) {
    const { id } = ctx.validatedParams
    await deleteById(id)
    global.UnifyResponse.deleteSuccess({ code: global.SUCCESS_CODE })
  }
}
`
  return template
}

export const getDTOTemplate = (model: ModelProps) => {
  const { paramsStr } = customModelToDTOParams(model.fields)
  const template = `import type { SchemaProps } from './base'

export const oneSchema: SchemaProps = {
  ${paramsStr}
}

export const updateOneSchema: SchemaProps = {
  id: { type: 'number', required: true },
  ...oneSchema,
}
`
  return template
}

export const getServiceTemplate = (modelName: string) => {
  const modelNameWithUppercase = formatModelName(modelName)
  const ModelImpl = `I${modelNameWithUppercase}Model`
  const template = `import type { Context } from 'koa'
import type { ${ModelImpl} } from '../model/${modelName}'
import { ${modelNameWithUppercase} } from '../model'
import { Paging } from '../dto/base'

export const getById = async (id: number): Promise<${modelNameWithUppercase}> => {
  const one = await ${modelNameWithUppercase}.findByPk(id)
  if (!one) {
    global.UnifyResponse.notFoundException(10404)
  }
  return one!
}

export const getList = async (): Promise<${modelNameWithUppercase}[]> => {
  return await ${modelNameWithUppercase}.findAll()
}

export const getPage = async (ctx: Context): Promise<Paging<${modelNameWithUppercase}>> => {
  const { start, limit } = ctx.validatedQuery
  const offset = (start - 1) * limit
  const pageRel = await ${modelNameWithUppercase}.findAll({ offset, limit })
  const totalRel = (await ${modelNameWithUppercase}.findAll()).length
  return new Paging(pageRel, totalRel, start, limit)
}

export const createOne = async (newOne: ${ModelImpl}): Promise<${modelNameWithUppercase}> => {
  return await ${modelNameWithUppercase}.create(newOne)
}

export const updateOne = async (newOne: ${ModelImpl}): Promise<${modelNameWithUppercase}> => {
  const one = await ${modelNameWithUppercase}.findByPk(newOne.id)
  if (!one) {
    global.UnifyResponse.notFoundException(10404)
  }
  return await one!.update(newOne)
}

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeleted = await ${modelNameWithUppercase}.destroy({ where: { id } })
  return !!numDeleted
}
`
  return template
}

export const getModelTemplate = (model: ModelProps) => {
  const { fieldsStr, propsStr, propsStrWithDeclare } = customModelToModelField(
    model.fields,
  )
  const modelName = model.name
  const modelNameWithUppercase = formatModelName(modelName)
  const ModelImpl = `I${modelNameWithUppercase}Model`
  const template = `import { DataTypes } from 'sequelize'
import type { IBaseModel } from './base'
import { BaseModel, baseFields, baseOptions } from './base'

export interface ${ModelImpl} extends IBaseModel {
  ${propsStr}
}

export default class ${modelNameWithUppercase} extends BaseModel<${ModelImpl}, ${ModelImpl}> {
  ${propsStrWithDeclare}
}

${modelNameWithUppercase}.init(
  {
    ...baseFields,
    ${fieldsStr}
  },
  {
    tableName: '${modelName}',
    ...baseOptions,
  },
)
`
  return template
}

export const getModelIndexTemplate = (modelName: string) => {
  const modelNameWithUppercase = formatModelName(modelName)
  const template = `import ${modelNameWithUppercase} from './${modelName}'
export { ${modelNameWithUppercase} }
`
  return template
}
