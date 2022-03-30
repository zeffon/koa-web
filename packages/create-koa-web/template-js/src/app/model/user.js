import { DataTypes, Model } from 'sequelize'
import sequelizeClient from '../../core/database'

export default class User extends Model {
  id
  username
  password
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'user',
    sequelize: sequelizeClient,
    paranoid: true
  }
)
