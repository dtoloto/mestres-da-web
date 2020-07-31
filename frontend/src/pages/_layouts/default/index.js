import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../store/modules/auth/actions';
import Navbar from '../../../components/Navbar';

import { Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function DefaultLayout({ children }) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    dispatch(signOut());
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
            Sair
          </Menu.Item>
        </Menu>
      </Sider >

      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: '0 16px', paddingTop: '60px' }}>
          <div className="container" style={{ height: '100%' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout >
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
