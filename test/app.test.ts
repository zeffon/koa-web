import request from 'supertest';
import app from '../src/app';
import CONFIG from '../src/config';

const prefix = CONFIG.PREFIX;

describe('测试koa2服务器', () => {
  it('GET /api/test', async () => {
    const result = await request(app.callback()).get(`${prefix}/v1/test`);
    console.log(result.text);
    expect(result.text).toEqual('Hello World!');
    expect(result.status).toEqual(200);
  });

  it('POST /api/test/register', async () => {
    const res = await request(app.callback())
      .post(`${prefix}/v1/test/register2`)
      .send({
        email: 'string@qq.com',
        nickname: 'string',
        password1: 'string123',
        password2: 'string123'
      });
    console.log(res.body);
    expect(res.body.code).toEqual(0);
    expect(res.status).toEqual(201);
  });
});
