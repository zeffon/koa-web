import type { FieldProps } from './start'

type SchemaType = 'string' | 'number' | 'boolean' | 'object' | 'array'

export interface SchemaProps {
  [x: string]: {
    type: SchemaType
    required: boolean
    [x: string]: any
  }
}

export const customModelToModelField = (fields: FieldProps[]) => {
  const fieldsStr = fields.map((item) => formatModelField(item)).join('')
  const propsStr = fields.map((item) => formatFieldProps(item)).join('')
  const propsStrWithDeclare = fields
    .map((item) => formatFieldProps(item, true))
    .join('')
  return {
    fieldsStr: fieldsStr.trim(),
    propsStr: propsStr.trim(),
    propsStrWithDeclare: propsStrWithDeclare.trim(),
  }
}

const formatModelField = (field: FieldProps) => {
  const { fieldName, type, allowNull, defaultValue, comment, unique } = field

  let fieldStr = `type: DataTypes.${field.type},
      allowNull: ${allowNull},`
  if (defaultValue) {
    fieldStr = `${fieldStr}
      defaultValue: ${
        isStringInField(type) ? `"${defaultValue}"` : defaultValue
      },`
  }
  if (comment) {
    fieldStr = `${fieldStr}
      comment: "${comment}",`
  }
  if (unique) {
    fieldStr = `${fieldStr}
      unique: "${unique}",`
  }
  return `  ${fieldName}: {
      ${fieldStr}
    },
  `
}

const formatFieldProps = (field: FieldProps, hasDeclare = false) => {
  const fieldStr = `${hasDeclare ? 'declare ' : ''}${
    field.fieldName
  }: ${convertType(field.type)}
  `
  return fieldStr
}

export const customModelToModelTable = (
  modelName: string,
  comment?: string,
) => {
  let fieldStr = `tableName: '${modelName}',`

  if (comment) {
    fieldStr = `${fieldStr}
    comment: '${comment}',`
  }
  return `{
    ${fieldStr}
    ...baseOptions,
  },`
}

export const customModelToDTOParams = (fields: FieldProps[]) => {
  const fieldsStr = fields.map((item) => formatDTOParams(item)).join('')
  return {
    paramsStr: fieldsStr.trim(),
  }
}

export const formatDTOParams = (field: FieldProps) => {
  const fieldStr = `${field.fieldName}: { type: '${convertType(
    field.type,
  )}', required: ${!field.allowNull} },
  `
  return fieldStr
}

export const formatModelName = (name: string): string => {
  if (!name) {
    return ''
  }
  if (name.includes('_')) {
    const modelName = name
      .split('_')
      .filter((item) => item)
      .map((item) => formatModelName(item))
      .join('')
    return modelName
  } else {
    return name.slice(0, 1).toLocaleUpperCase() + name.slice(1)
  }
}

export type SequelizeDataTypes =
  | `STRING`
  | `STRING(${number})`
  | `TEXT`
  | `TEXT('tiny')`
  | `BOOLEAN`
  | `INTEGER`
  | `BIGINT`
  | `BIGINT(${number})`
  | `FLOAT`
  | `FLOAT(${number})`
  | `FLOAT(${number}, ${number})`
  | `DOUBLE`
  | `DOUBLE(${number})`
  | `DOUBLE(${number}, ${number})`
  | `DECIMAL`
  | `DECIMAL(${number}, ${number})`
  | `DATE`
  | `DATE(${number})`
  | `DATEONLY`
  | `JSON`

export const isStringInField = (type: SequelizeDataTypes) => {
  if (type.includes('STRING') || type.includes('TEXT')) {
    return true
  }
  return false
}

export const convertType = (type: SequelizeDataTypes): SchemaType => {
  if (isStringInField(type)) {
    return 'string'
  } else if (type.includes('DATE') || type.includes('DATEONLY')) {
    return 'string'
  } else if (type.includes('BOOLEAN')) {
    return 'boolean'
  }
  // INTEGER BIGINT FLOAT DOUBLE DECIMAL
  return 'number'
}
