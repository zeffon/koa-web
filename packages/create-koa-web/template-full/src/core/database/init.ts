import SequelizeClient from './index'
import * as models from '~/app/model'

const modelsObj: { [index: string]: any } = models
const allModel: any[] = []
const enable = SequelizeClient.enable()
if (enable) {
  for (const key in modelsObj) {
    const model = modelsObj[key].sync()
    allModel.push(model)
  }
}

export const initDB = enable
  ? () => Promise.all(allModel)
  : () => {
      console.log('Unable to connect to the database')
    }
