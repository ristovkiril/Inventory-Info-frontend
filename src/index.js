import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';

import App from './App';
import * as serviceWorker from './serviceWorker';
import Messages from './components/Custom/theme/messages';

import { Provider } from 'react-redux';
import store from './redux/store/store';

import './i18next';

ReactDOM.render(
  <ConfigProvider locale={ptBR}>
    <Provider store={store}>
        <Suspense fallback="loading">
      <App />
        </Suspense>
      <Messages/>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
