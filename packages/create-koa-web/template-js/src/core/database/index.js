import CONFIG from '../../config'
import { Sequelize } from 'sequelize'
const DATABASE = CONFIG.DATABASE

class SequelizeClient {
  static _instance
  sequelizeClient = null
  enableStatus = false

  constructor() {
    const sequelizeClient = new Sequelize(
      DATABASE.DB_NAME,
      DATABASE.USER,
      DATABASE.PASSWORD,
      {
        dialect: DATABASE.DIALECT,
        host: DATABASE.HOST,
        port: DATABASE.PORT,
        logging: false
      }
    )
    sequelizeClient
      .authenticate()
      .then(() => {
        this.enableStatus = true
        console.log('SequelizeClient has been login successfully.')
      })
      .catch((err) => {
        this.enableStatus = false
        sequelizeClient.close()
        console.error('Unable to connect to the database:', err)
      })

    this.sequelizeClient = sequelizeClient
  }

  static getInstance() {
    if (!this._instance) {
      SequelizeClient._instance = new SequelizeClient()
    }
    return SequelizeClient._instance
  }

  config() {
    return this.sequelizeClient
  }

  enable() {
    return this.enableStatus
  }
}

export default SequelizeClient.getInstance()
