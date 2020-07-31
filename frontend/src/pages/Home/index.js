import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import notification from '../../components/Notification';
import StoreData from '../../components/StoreData';
import CreateStore from '../../components/CreateStore';
import { Typography, Collapse } from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;

function Home() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await api.get('/stores');
      const { stores } = data;
      setStores(stores);
    } catch (err) {
      notification('error', 'Ops!', 'Houve algum erro, tente novamente mais tarde.')
    }
  }

  return (
    <section>
      <br />
      <Title level={1}>Painel Geral</Title>
      <br />
      <CreateStore getData={getData} />
      <Collapse accordion>
        {stores.map((store) => (
          <Panel header={store.name} key={store.id}>
            <StoreData store={store} getStores={getData} />
          </Panel>
        ))}
      </Collapse>
    </section >
  );
}

export default Home;