import { formatModelName } from './converter'

export const initDB = async (modelName: string, alterDatabase: boolean) => {
  const models = require('../model/index')
  const modelsObj: { [index: string]: any } = models
  const allModel: any[] = []
  for (const key in modelsObj) {
    if (formatModelName(modelName) === key) {
      const model = modelsObj[key].sync({ alter: alterDatabase })
      allModel.push(model)
    }
  }
  Promise.all(allModel).then(() => {
    console.log('The database tables was updated successfully!')
  })
}
