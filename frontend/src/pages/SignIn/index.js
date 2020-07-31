import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { signInRequest, disableLoader } from '../../store/modules/auth/actions';
import { Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;

function SignIn({ auth }) {
  const dispatch = useDispatch();
  const { loading } = auth;

  useEffect(() => {
    dispatch(disableLoader());
  }, []);

  const handleSubmit = ({ email, password }) => {
    if (loading) {
      return;
    }
    dispatch(signInRequest({ email, password }));
  };

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={handleSubmit}
      >
        <Paragraph strong>Acesse sua conta</Paragraph>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Informe seu e-mail!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="E-mail" />

        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Informe sua senha!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <Link className="login-form-forgot" to="/forgot-password">
            Esqueci minha senha
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            block
            htmlType="submit"
            className="login-form-button">
            Entrar
        </Button>
        </Form.Item>
      </Form>

      <div className="align-center">
        <Paragraph>Não possui uma conta? <Link to='/register'>Cadastre-se</Link></Paragraph>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  authLoading: state.auth.loading
});

export default connect(mapStateToProps)(SignIn);