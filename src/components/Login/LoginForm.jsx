'use client'
import React from 'react';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import './LoginForm.css'

const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const LoginForm = () => (
  <Form
    name="basic"
    style={{ Width: '600px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
     }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      id='EmailInput'
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
      labelCol={{ span: 6 }} 
      wrapperCol={{ span: 17 }}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Senha"
      name="password"
      rules={[{ required: true, message: 'Por favor, insira seu senha!' }]}
      labelCol={{ span: 6 }} 
      wrapperCol={{ span: 15 }}
    >
      <Input.Password/>
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked"  style={{width: '100%'}}>
      <Checkbox>Me lembre</Checkbox>
    </Form.Item>

    <Form.Item type="primary" style={{width: '100%'}}>
      <Button id='BtnLogar'>
        Logar
      </Button>
    </Form.Item>
  </Form>
);
export default LoginForm;