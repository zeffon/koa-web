import SequelizeClient from './index'
import CONFIG from '~/config'
import * as models from '~/app/model'

const isDev = CONFIG.ENV !== 'production'

const modelsObj: { [index: string]: any } = models
const allModel: any[] = []
const enable = SequelizeClient.enable()
if (enable) {
  for (const key in modelsObj) {
    const model = modelsObj[key].sync({ alter: isDev })
    allModel.push(model)
  }
}

export const initDB = enable
  ? () => Promise.all(allModel)
  : () => {
      console.log('Unable to connect to the database')
    }
