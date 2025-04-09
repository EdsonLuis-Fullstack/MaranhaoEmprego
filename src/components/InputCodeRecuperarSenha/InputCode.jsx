'use client';
import React from 'react';
import { Flex, Input, Typography } from 'antd';
const { Title } = Typography;
const InputCode = () => {
  const onChange = text => {
    console.log('onChange:', text);
  };
  const onInput = value => {
    console.log('onInput:', value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };
  return (
    <Flex gap="large" align="center" vertical>
      <Title level={5} style={{fontFamily: 'montserrat, poppins', fontWeight: '600', fontSize: '28px'}}>INSIRA O CODIGO PARA REDIFINIR A SENHA</Title>
      <Input.OTP separator={<span>/</span>} {...sharedProps} />
    </Flex>
  );
};
export default InputCode;