import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './config/ReactotronConfig';

import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';
import './App.less';

import { store, persistor } from './store';

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={ptBR}>
        <Provider store={store} >
          <PersistGate persistor={persistor}>
            <Router history={history}>
              <Routes />
              <GlobalStyle />
            </Router>
          </PersistGate>
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
