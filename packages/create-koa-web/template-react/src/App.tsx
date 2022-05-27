import { Button, Form, Input } from 'antd'

function App() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="font-bold text-3xl -mt-32 mb-8 tracking-wider">
        欢迎登录
      </h1>
      <Form className="w-96 bg-white px-8 py-10">
        <Form.Item>
          <Input placeholder="请输入用户名" className=" h-10" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="请输入密码" className=" h-10" />
        </Form.Item>
        <Button type="primary" className="w-full h-10">
          登录
        </Button>
      </Form>
    </div>
  )
}

export default App
