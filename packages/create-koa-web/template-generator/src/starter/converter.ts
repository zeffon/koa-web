import type { DataTypes } from 'sequelize'
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

export const formatModelField = (field: FieldProps) => {
  const fieldStr = `  ${field.fieldName}: {
      type: DataTypes.${field.type},
      allowNull: ${field.allowNull},
    },
  `
  return fieldStr
}

export const formatFieldProps = (field: FieldProps, hasDeclare = false) => {
  const fieldStr = `${hasDeclare ? 'declare ' : ''}${
    field.fieldName
  }: ${convertType(field.type)}
  `
  return fieldStr
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
  | typeof DataTypes.STRING
  | typeof DataTypes.TEXT
  | typeof DataTypes.BOOLEAN
  | typeof DataTypes.INTEGER
  | typeof DataTypes.BIGINT
  | typeof DataTypes.FLOAT
  | typeof DataTypes.DOUBLE
  | typeof DataTypes.DECIMAL
  | typeof DataTypes.DATE
  | typeof DataTypes.DATEONLY

export const convertType = (type: SequelizeDataTypes): SchemaType => {
  const typeStr = type.toString()
  if (typeStr.includes('STRING') || typeStr.includes('TEXT')) {
    return 'string'
  } else if (typeStr.includes('DATE') || typeStr.includes('DATEONLY')) {
    return 'string'
  } else if (typeStr.includes('BOOLEAN')) {
    return 'boolean'
  }
  // INTEGER BIGINT FLOAT DOUBLE
  return 'number'
}
