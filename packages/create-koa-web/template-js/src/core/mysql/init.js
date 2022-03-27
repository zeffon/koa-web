import CONFIG from '../../config'
import * as models from '../../app/model'

const isDev = CONFIG.ENV !== 'prod'

const allModel = []
for (let key in models) {
  const model = models[key].sync({ alter: isDev })
  allModel.push(model)
}

export const initDB = () => Promise.all(allModel)
