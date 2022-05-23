import request from 'supertest'
import app from '../src/app'
import CONFIG from '../src/config'

const prefix = CONFIG.PREFIX

describe('test user', () => {
  it('POST /api/test/login', async () => {
    const res = await request(app.callback())
      .post(`${prefix}/v1/user/login`)
      .send({ username: 'admin', password: 'password' })
    console.log(res.body.code)
    console.log(res.status)
    expect(res.body.code).toEqual(0)
    expect(res.status).toEqual(201)
  })
})
