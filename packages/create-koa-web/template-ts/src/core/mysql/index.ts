import CONFIG from '../../config'
import { Dialect, Sequelize } from 'sequelize'
const DATABASE = CONFIG.DATABASE

const sequelizeClient = new Sequelize(
  DATABASE.DB_NAME,
  DATABASE.USER,
  DATABASE.PASSWORD,
  {
    dialect: DATABASE.DIALECT as Dialect,
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    logging: false
  }
)

export default sequelizeClient
