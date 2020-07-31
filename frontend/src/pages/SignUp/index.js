import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { signUpRequest, disableLoader } from '../../store/modules/auth/actions';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { Paragraph, Text } = Typography;

function SignUp({ auth }) {
  const dispatch = useDispatch();
  const { loading } = auth;

  useEffect(() => {
    dispatch(disableLoader());
  }, []);

  const handleSubmit = ({ name, last_name, email, password }) => {
    dispatch(signUpRequest({ name, last_name, email, password }));
  };

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Paragraph strong>Crie sua conta</Paragraph>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Informe seu e-mail!',
            },
          ]}
        >
          <Input type="email" placeholder="E-mail" />

        </Form.Item>
        <Form.Item
          name="password"
          label="Senha"
          rules={[
            {
              required: true,
              message: 'Informe sua senha!',
            },
          ]}
        >
          <Input type="password" placeholder="Senha" />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          label="Confirmar Senha"
          rules={[
            {
              required: true,
              message: 'Confirme sua senha!',
              min: 2
            },
          ]}
        >
          <Input type="password" placeholder="Confirmar Senha" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            block
            htmlType="submit"
            className="login-form-button">
            Cadastrar
        </Button>
        </Form.Item>
      </Form>

      <div className="align-center">
        <Paragraph>Já possui uma conta? <Link to='/login'>Acesse</Link></Paragraph>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  authLoading: state.auth.loading
});

export default connect(mapStateToProps)(SignUp);