'use client';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import './LoginForm.css';
import Cookies from 'js-cookie';
import realizarLogin from '@/components/services/auth/login';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    remember: true
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já está logado e redireciona automaticamente
    const token = Cookies.get('authToken');
    if (token) {
      console.log('Token encontrado, redirecionando para área da empresa');
      router.push('/area-da-empresa');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onFinish = async () => {
    setIsLoading(true);
    try {
      // Assumindo que realizarLogin retorna o token
      const token = await realizarLogin(formData);
      
      // Garantir que o token seja armazenado nos cookies
      Cookies.set('authToken', token, { expires: 7, secure: true });
      
      // Verificar se o cookie foi realmente definido
      const storedToken = Cookies.get('authToken');
      console.log('Token armazenado:', storedToken);
      
      if (storedToken) {
        message.success('Login realizado com sucesso!');
        
        // Pequeno delay para garantir que o cookie seja processado
        setTimeout(() => {
          router.push('/area-da-empresa');
        }, 300);
      } else {
        message.error('Erro ao armazenar dados de autenticação');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      message.error('Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      name="basic"
      style={{
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor, insira seu email!' },
          { type: 'email', message: 'Por favor, insira um email válido!' }
        ]}
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
          { min: 8, message: 'A senha deve ter pelo menos 8 caracteres!' }
        ]}
      >
        <Input.Password 
          name="senha"
          onChange={handleInputChange}
          value={formData.senha}
        />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox 
          checked={formData.remember}
          onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
        >
          Me lembre
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" id="BtnLogar">
          Logar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
