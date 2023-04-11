import type { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize'

const DATABASE = {
  DIALECT: 'mysql',
  DB_NAME: 'dbname',
  HOST: '127.0.0.1',
  PORT: 3306,
  USER: 'root',
  PASSWORD: '123456',
}

class SequelizeClient {
  private static instance: SequelizeClient
  private sequelize: Sequelize | null = null
  public enableStatus: boolean = false

  private constructor() {}

  public async init() {
    const sequelize = new Sequelize(
      DATABASE.DB_NAME,
      DATABASE.USER,
      DATABASE.PASSWORD,
      {
        dialect: DATABASE.DIALECT as Dialect,
        host: DATABASE.HOST,
        port: DATABASE.PORT,
      },
    )
    sequelize
      .authenticate()
      .then(() => {
        this.enableStatus = true
        console.log('SequelizeClient has been login successfully.')
      })
      .catch((err: any) => {
        this.enableStatus = false
        sequelize.close()
        console.error('Unable to connect to the database:', err)
      })

    this.sequelize = sequelize
  }

  public static getInstance() {
    if (!this.instance) {
      SequelizeClient.instance = new SequelizeClient()
      SequelizeClient.instance.init()
    }
    return SequelizeClient.instance
  }

  public config() {
    return this.sequelize!
  }
}

export default SequelizeClient.getInstance()
