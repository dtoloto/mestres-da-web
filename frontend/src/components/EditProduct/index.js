import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import notification from '../../components/Notification';
import { Modal, Input, Form, Button } from 'antd';
// import { Container } from './styles';

function EditProduct({ setVisible, visible, product, getData }) {
  const [checkout, setCheckout] = useState(0);
  const handleCancel = () => {
    setVisible(false);
  }

  const handleCheckout = ({ target }) => {
    const { value } = target;
    setCheckout(value);
  }

  const handleSubmit = async () => {
    try {
      await api.put(`/stores/${product.store_id}/products/${product.id}`, {
        checkout
      });
      setVisible(false);
      getData();
      notification('success', 'Sucesso!', 'Produto atualizado.');
    } catch (err) {
      if (err.response.data
        && err.response.data.error === 'Checkout quantity is not available') {
        notification('error', 'Ops!', 'Quantidade indisponível');
      } else {
        notification('error', 'Ops!', 'Houve algum erro, tente novamente mais tarde.')
      }
    }
  }

  return (
    <Modal
      visible={visible}
      title={product.name}
      onCancel={handleCancel}
      footer={null}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          initialValue={checkout}
          label="Quantos itens deseja remover do estoque?">
          <p>Disponíveis: {product.quantity}</p>
          <Input
            style={{ width: '100%' }}
            value={checkout}
            onChange={handleCheckout} />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Atualizar Estoque</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditProduct;

EditProduct.propTypes = {
  product: PropTypes.object
}