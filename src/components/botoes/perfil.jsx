'use client'
import React from 'react';
import { AntDesignOutlined, FundFilled, UserOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #02539b);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));
const Perfil = () => {
  const { styles } = useStyle();
  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Space>
        <Button type="primary" size="large" style={{
          fontFamily : 'montserrat, poppins',
           fontWeight: '600',
           textTransform: 'uppercase',
           textAlign: 'center',
           }} icon={<UserOutlined />} >
          Perfil
        </Button>
      </Space>
    </ConfigProvider>
  );
};
export default Perfil;