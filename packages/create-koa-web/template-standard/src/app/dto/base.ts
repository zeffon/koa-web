import type { ModelStatic } from 'sequelize'

type SchemaType = 'string' | 'number' | 'boolean' | 'object' | 'array'

export interface SchemaProps {
  [x: string]: {
    type: SchemaType
    required: boolean
    [x: string]: any
  }
}

export const pagingSchema: SchemaProps = {
  start: { type: 'number', required: false, default: 1 },
  limit: { type: 'number', required: false, default: 20 },
}

export class Paging<T> {
  page = 1
  total = 0
  pageTotal = 0
  items: T[] = []
  constructor(items: T[], total: number, start: number, limit: number) {
    this.total = total
    this.page = start
    this.items = items
    this.pageTotal = Math.ceil(total / limit)
  }
}

export const modelToSchema = async <T extends ModelStatic<any>>(Model: T) => {
  const fields = (await Model.describe()) as any
  const models = Object.keys(fields).map((key) => ({
    field: key,
    type: fields[key].type,
  }))

  const schema: SchemaProps = {}

  for (const { field, type } of models) {
    schema[field] = {
      type: convertType(type),
      required: !fields[field]['allowNull'],
    }
  }
  return schema
}

const convertType = (type: string): SchemaType => {
  if (
    type.includes('VARCHAR') ||
    type.includes('TEXT') ||
    type.includes('TINYTEXT')
  ) {
    return 'string'
  }
  if (type.includes('DATETIME')) {
    return 'string'
  }
  // TINYINT INTEGER BIGINT FLOAT DOUBLE
  return 'number'
}
