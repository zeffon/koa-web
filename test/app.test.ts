import request from 'supertest';
import app from '../src/app';

describe('测试koa2服务器', () => {
  it('GET /api/test', async () => {
    const result = await request(app.callback()).get('/api/test');
    console.log(result.text);
    expect(result.text).toEqual('Hello World!');
    expect(result.status).toEqual(200);
  });

  it('POST /api/test/register', async () => {
    const res = await request(app.callback()).post('/api/test/register').send({
      email: 'string@qq.com',
      nickname: 'string',
      password1: 'string123',
      password2: 'string123'
    });
    console.log(res.body.code);
    expect(res.body.code).toEqual(0);
    expect(res.status).toEqual(201);
  });
});
