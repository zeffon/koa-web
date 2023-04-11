import { DataTypes } from 'sequelize'
import type { ModelProps } from './starter/start'
import { start } from './starter/start'

const models: ModelProps[] = [
  {
    name: 'user',
    fields: [
      { fieldName: 'username', type: DataTypes.STRING, allowNull: false },
      { fieldName: 'password', type: DataTypes.STRING, allowNull: false },
    ],
  },
]

start(models).catch((err) => {
  console.error(err)
  process.exit(1)
})
