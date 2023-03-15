import type { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize'
import CONFIG from '~/config'
const DATABASE = CONFIG.DATABASE

class SequelizeClient {
  private static _instance: SequelizeClient
  private sequelizeClient: Sequelize | null = null
  public enableStatus: boolean = false

  private constructor() {
    const sequelizeClient = new Sequelize(
      DATABASE.DB_NAME,
      DATABASE.USER,
      DATABASE.PASSWORD,
      {
        dialect: DATABASE.DIALECT as Dialect,
        host: DATABASE.HOST,
        port: DATABASE.PORT,
        logging: false,
      },
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

  public static getInstance() {
    if (!this._instance) {
      SequelizeClient._instance = new SequelizeClient()
    }
    return SequelizeClient._instance
  }

  public config() {
    return this.sequelizeClient!
  }

  public enable() {
    return this.enableStatus
  }
}

export default SequelizeClient.getInstance()
