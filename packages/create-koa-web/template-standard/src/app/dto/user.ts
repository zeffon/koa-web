import type { SchemaProps } from './base'

export const userSchema: SchemaProps = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
}

export const passwordSchema: SchemaProps = {
  id: { type: 'number', required: true },
  password: { type: 'string', required: true },
}
