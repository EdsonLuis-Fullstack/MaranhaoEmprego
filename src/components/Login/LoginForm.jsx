'use client';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message, Alert } from 'antd';
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
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verifica se o usuário já está logado e redireciona automaticamente
    const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
    if (token) {
      router.push('/area-da-empresa');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Limpa o erro quando o usuário começa a digitar novamente
    if (error) setError(null);
  };

  const processErrorResponse = (response) => {
    console.error('Erro de resposta do servidor:', response);
    // Verificando se a resposta tem uma estrutura de erro
    if (response && response.error) {
      // Se tiver detalhes de erro específicos no objeto de resposta
      return {
        message: 'Erro ao realizar login',
        details: response.msg || response.message || 'Verifique suas credenciais e tente novamente.',
        code: response.code || 'unknown'
      };
    } else if (response && response.msg) {
      // Se estiver usando o formato { msg, code }
      return {
        message: "Erro ao realizar login",
        details: response.msg,
        code: response.code || 'unknown'
      };
    }
    
    // Fallback para resposta desconhecida
    return {
      message: 'Falha no login',
      details: response.msg,
      code: response.code
    };
  };

  const onFinish = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Obtém a resposta completa da função realizarLogin
      const response = await realizarLogin(formData);
      console.log(response)

      
      // Verifica se a resposta é um sucesso ou erro
      if (response.code === 200) {
        // Sucesso: Token recebido
        const token = response.User.Token;
        
        // Garantir que o token seja armazenado nos cookies
        Cookies.set(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`, token, { expires: 7, secure: false });
        Cookies.set(`${process.env.NEXT_PUBLIC_NOME_PERFIL}`, response.User.nome, { expires: 7, secure: false });
        Cookies.set(`${process.env.NEXT_PUBLIC_EMAIL_PERFIL}`, response.User.email, { expires: 7, secure: false });


        
        // Verificar se o cookie foi realmente definido
        const storedToken = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
        console.log('Token armazenado:', storedToken);
        
        if (storedToken) {
          message.success('Login realizado com sucesso!');
          
          // Pequeno delay para garantir que o cookie seja processado
          return setTimeout(() => {
            router.push('/area-da-empresa');
          }, 300);
        } else {
          setError({
            message: 'Erro ao armazenar o token',
            details: response.msg,
            code: response.code || 'cookie-error'
          });
        }
      } else {
        // Erro: A resposta não contém token

        setError({
          message: "Erro ao realizar login",
          details: response.msg || 'Verifique suas credenciais e tente novamente.',
          code: response.code || 'unknown'
        });

      }
    } catch (error) {
      console.error('Erro no login:', error);
      
      // Tenta extrair informações de erro
      let errorData;
      if (error.response) {
        // O objeto de erro é uma resposta HTTP
        errorData = processErrorResponse(error.response);
      } else if (typeof error === 'object' && error !== null) {
        // O objeto de erro pode ser a própria resposta do backend
        errorData = processErrorResponse(error);
      } else {
        // Fallback para erro desconhecido
        errorData = {
          message: 'Erro ao conectar ao servidor',
          details: error.message || 'Não foi possível completar a requisição.',
          code: 'connection-error'
        };
      }
      
      setError(errorData);
      message.error(errorData.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert
          message={error.message}
          description={error.details && (
            <div>
              <p>{error.details}</p>
              {error.code === 429 && (
                <p>Você pode tentar novamente após alguns minutos.</p>
              )}
            </div>
          )}
          type="error"
          showIcon
          closable
          style={{ marginBottom: '20px', width: '100%' }}
        />
      )}
      
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
          <Button 
            type="primary" 
            htmlType="submit" 
            id="BtnLogar" 
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Verificando...' : 'Logar'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;