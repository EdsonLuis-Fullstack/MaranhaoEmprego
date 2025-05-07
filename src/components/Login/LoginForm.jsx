'use client'
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './LoginForm.css'
import realizarLogin from '@/components/services/auth/login';

const LoginForm = () => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    remember: true
  });

  // Manipulador para atualizar o estado quando os campos são alterados
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Manipulador específico para o checkbox
  const handleCheckboxChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      remember: e.target.checked
    }));
  };

  // // Função para quando o formulário é submetido com sucesso
  const onFinish = (values) => {
    console.log('Sucesso:', values);
  };

  // Função para quando o formulário falha na validação
  const onFinishFailed = (errorInfo) => {
    console.log('Validação falhou:', errorInfo);
    message.error('Por favor, verifique os campos obrigatórios.');
  };

  return (
    <Form
      name="basic"
      style={{
        maxWidth: '600px',
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
        id="EmailInput"
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor, insira seu email!' },
          { type: 'email', message: 'Por favor, insira um email válido!' }
        ]}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 17 }}
      >
        <Input 
          name="email"
          onChange={handleInputChange}
          value={formData.email}
        />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="senha"
        rules={[
          { required: true, message: 'Por favor, insira sua senha!' },
          { min: 6, message: 'A senha deve ter pelo menos 6 caracteres!' }
        ]}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
      >
        <Input.Password 
          name="senha"
          onChange={handleInputChange}
          value={formData.senha}
        />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" style={{ width: '100%' }}>
        <Checkbox 
          checked={formData.remember}
          onChange={handleCheckboxChange}
        >
          Me lembre
        </Checkbox>
      </Form.Item>

      <Form.Item style={{ width: '100%' }}>
        <Button onClick={() => {realizarLogin(formData)}} type="primary" htmlType="submit" id="BtnLogar">
          Logar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;