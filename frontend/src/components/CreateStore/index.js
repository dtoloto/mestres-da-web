import React from 'react';
import api from '../../services/api';
import notification from '../../components/Notification';
import { Form, Button, Input } from 'antd';

// import { Container } from './styles';

function CreateStore({ getData }) {

  const handleSubmit = async ({ name }) => {
    try {
      await api.post(`/stores/`, {
        name,
      });
      getData();
      notification('success', 'Sucesso!', 'Loja cadastrada.');
    } catch (err) {
      notification('error', 'Ops!', 'Houve algum erro, tente novamente mais tarde.')
    }
  }

  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      className="form-product">
      <Form.Item name="name" label="Nome da Loja"
        rules={[{
          required: true,
          message: 'Informe o nome da Loja!'
        }]}>
        <Input />
      </Form.Item>
      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">Cadastrar Loja</Button>
      </Form.Item>
    </Form>
  );
}

export default CreateStore;