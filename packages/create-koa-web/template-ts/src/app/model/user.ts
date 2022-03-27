import { DataTypes, Sequelize, Model, Optional, Dialect } from 'sequelize'
import CONFIG from '../../config'
import { db } from '../../core/mysql'

const DATABASE = CONFIG.DATABASE
const sequelize = new Sequelize(
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

interface UserModel {
  id: number
  username: string
  password: string
}

export interface IUserModel extends Optional<UserModel, 'id'> {}

class User extends Model<IUserModel, IUserModel> implements IUserModel {
  public id!: number
  public username!: string
  public password!: string
}

console.log('---------------- init sequelizeClient ----------------')
console.log(db.sequelizeClient)

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'user',
    sequelize: db.sequelizeClient,
    paranoid: true
  }
)

export default User
