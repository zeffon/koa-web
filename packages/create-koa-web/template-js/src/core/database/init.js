import CONFIG from '../../config'
import SequelizeClient from './index'
import * as models from '../../app/model'

const isDev = CONFIG.ENV !== 'prod'

const modelsObj = models
const allModel = []
const enable = SequelizeClient.enable()
if (enable) {
  for (let key in modelsObj) {
    const model = modelsObj[key].sync({ alter: isDev })
    allModel.push(model)
  }
}

export const initDB = enable
  ? () => Promise.all(allModel)
  : () => {
      console.log('Unable to connect to the database')
    }
