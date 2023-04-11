/* eslint-disable import/no-nodejs-modules */
import * as fs from 'fs'
import * as nodePath from 'path'
import type { SequelizeDataTypes } from './converter'
import { initDB } from './sequelize-init'
import {
  getApiTemplate,
  getDTOTemplate,
  getModelIndexTemplate,
  getModelTemplate,
  getServiceTemplate,
} from './templates'

export interface ModelProps {
  name: string
  fields: FieldProps[]
}

export interface FieldProps {
  fieldName: string
  type: SequelizeDataTypes
  allowNull: boolean
}

export interface databaseOptionProps {
  generateTable: boolean
  alterDatabase?: boolean
}

export enum ModeOption {
  FORWARD = 'Forward',
  REVERSE = 'Reverse',
}

/**
 * start generate model and database
 * @param models model list. Item is already contains id, created_at, updated_at, deleted_at.
 * @param databaseOption.generateTable Whether to generate a corresponding table, the default value is false.
 * @param databaseOption.alterDatabase when it is true: This checks what is the current state of the table in the database,
 *                                     and then performs the necessary changes in the table to make it match the model.
 */
export const start = async (
  models: ModelProps[],
  databaseOption?: databaseOptionProps,
) => {
  let generateTable = false
  let alterDatabase = false
  if (databaseOption) {
    generateTable = databaseOption.generateTable
    alterDatabase = databaseOption?.alterDatabase ?? false
  }
  for (const item of models) {
    await generateTemplates(item)
    if (generateTable) {
      await initDB(item.name, alterDatabase)
    }
  }
}

const generateTemplates = async (model: ModelProps) => {
  const modelName = model.name
  const templates = ['model', 'modelIndex', 'service', 'api', 'dto']
  templates.forEach(async (template) => {
    if (template === 'model') {
      await generateFile(`./src/model/${modelName}.ts`, getModelTemplate(model))
    } else if (template === 'modelIndex') {
      generateModelIndex(modelName)
    } else if (template === 'service') {
      generateFile(
        `./src/service/${modelName}.ts`,
        getServiceTemplate(modelName),
      )
    } else if (template === 'api') {
      generateFile(`./src/api/${modelName}.ts`, getApiTemplate(modelName))
    } else if (template === 'dto') {
      generateFile(`./src/dto/${modelName}.ts`, getDTOTemplate(model))
    }
  })
}

const generateModelIndex = (modelName: string) => {
  try {
    const data = fs.readFileSync('./src/model/index.ts', 'utf8')
    const content = getModelIndexTemplate(modelName)
    if (data.search(content) === -1) {
      fs.appendFileSync(`./src/model/index.ts`, content)
      console.log(`The file ./src/model/index.ts has been updated!`)
    }
  } catch (error) {
    generateFile(`./src/model/index.ts`, getModelIndexTemplate(modelName))
  }
}

const generateFile = async (path: string, content: string) => {
  const dirname = nodePath.dirname(path)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true })
  }
  fs.writeFileSync(path, content)
  console.log(`The file ${path} has been saved!`)
}
