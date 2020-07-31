import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import IntlCurrencyInput from 'react-intl-currency-input';
import { currencyConfig } from '../../util/currencyInput';
import api from '../../services/api';
import notification from '../../components/Notification';

function CreateProduct({ store_id, getData }) {
  const [price, setPrice] = useState(0);

  const handlePrice = (event) => {
    const { value } = event.target;
    const price = Number(value.replace('R$', '').replace(',', '.')) * 1000;
    setPrice(price);
  }

  const handleSubmit = async ({ name, quantity }) => {
    try {
      await api.post(`/stores/${store_id}/products/`, {
        name,
        quantity,
        price
      });
      getData();
      notification('success', 'Sucesso!', 'Produto cadastrado.');
    } catch (err) {
      notification('error', 'Ops!', 'Houve algum erro, tente novamente mais tarde.')
    }
  }

  return (
    <>
      <h4>Cadastrar Produto</h4>
      <Form layout="vertical" className="form-product" onFinish={handleSubmit}>
        <Form.Item
          label="Nome do Produto"
          name="name"
          rules={[{
            required: true,
            message: 'Informe o nome!'
          }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Valor do Produto"
          name="price"
          rules={[{
            required: true,
            message: 'Informe o preço!'
          }]}>
          <IntlCurrencyInput
            className="inputmask"
            currency="BRL"
            config={currencyConfig}
            onChange={handlePrice}
            value={price / 100}
          />
        </Form.Item>
        <Form.Item
          label="Quantidade do Produto"
          name="quantity"
          rules={[{
            required: true,
            message: 'Informe a quantidade!'
          }]}>
          <Input />
        </Form.Item>
        <Form.Item label=" ">
          <Button htmlType="submit" type="primary">Cadastrar</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateProduct;