export const userSchema = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
}

export const passwordSchema = {
  id: { type: 'number', required: true },
  password: { type: 'string', required: true },
}
