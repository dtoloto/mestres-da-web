import React from 'react';
import api from '../../services/api';
import notification from '../../components/Notification';
import { Button } from 'antd';

function DeleteStore({ store_id, getData }) {
  const handleDelete = async () => {
    try {
      await api.delete(`/stores/${store_id}`);
      getData();
      notification('success', 'Sucesso!', 'Loja excluída.');
    } catch (err) {
      notification('error', 'Ops!', 'Houve algum erro, tente novamente mais tarde.')
    }
  }

  return <Button onClick={handleDelete} type="link" danger>Excluir Loja</Button>;
}

export default DeleteStore;