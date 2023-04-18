import type { ModelProps } from './starter/start'
import { start } from './starter/start'

const models: ModelProps[] = [
  {
    name: 'user_alpha',
    comment: 'user comment',
    fields: [
      {
        fieldName: 'username',
        type: 'STRING(20)',
        allowNull: false,
        unique: 'username_idx',
      },
      {
        fieldName: 'password',
        type: 'STRING',
        allowNull: false,
        comment: 'password comment',
      },
      {
        fieldName: 'type',
        type: 'BOOLEAN',
        defaultValue: '0',
      },
    ],
  },
]

start(models, { generateTable: false, alterDatabase: false }).catch((err) => {
  console.error(err)
  process.exit(1)
})
