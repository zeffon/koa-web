import request from 'supertest';
import app from '../src/app';

describe('测试koa2服务器', () => {
  it('GET /v1/test', async () => {
    const result = await request(app.callback()).get('/api/test');
    console.log(result.text);
    expect(result.text).toEqual('Hello World!');
    expect(result.status).toEqual(200);
  });
});
