import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import notification from '../../components/Notification';
import DeleteStore from '../../components/DeleteStore';
import EditProduct from '../../components/EditProduct';
import CreateProduct from '../../components/CreateProduct';
import { columns } from '../../util/columns';
import { Table, Button } from 'antd';

function StoreData({ store, getStores }) {
  const [products, setProducts] = useState([]);
  const [columnsAux, setColumnsAux] = useState();
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    getData();
    setColumnsAux([...columns, {
      title: 'Editar',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record, index) => <Button
        onClick={() => { selectProduct({ record }) }}
        type="link">Editar</Button>
    },
    {
      title: 'Deletar',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record, index) => <Button
        onClick={() => { deleteProduct({ record }) }}
        type="link" danger>Deletar</Button>
    }]);
  }, []);

  const getData = async () => {
    try {
      const { data } = await api.get(`/stores/${store.id}/products`);
      const { products } = data;
      products.map((item) => (item.key = item.id));
      setProducts(products);
    } catch (err) {
      notification('error', 'Ops!', 'Houve algum erro, tente novamente mais tarde.')
    }
  }

  const selectProduct = async ({ record }) => {
    setVisible(true);
    setProduct(record);
  }

  const deleteProduct = async ({ record }) => {
    const { id, store_id } = record;
    try {
      await api.delete(`/stores/${store_id}/products/${id}`);
      getData();
    } catch (err) {
      notification('error', 'Ops!', 'Houve algum erro, tente novamente mais tarde.')
    }
  }

  return (
    <>
      <CreateProduct store_id={store.id} getData={getData} />
      <Table dataSource={products} columns={columnsAux} pagination={false} />

      <EditProduct
        setVisible={setVisible}
        visible={visible}
        product={product}
        getData={getData} />
      <br />
      <DeleteStore store_id={store.id} getData={getStores} />
    </>
  );
}

export default StoreData;