import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import viewarApi from 'viewar-api';
import { viewarReducers } from './lib/viewar-react';

import App from './containers/App';

import './index.css';

const appId = 'com.viewar.template.react';
const version = 1.0;

;(async () => {
  // initialize the ViewAR API
  const api = await viewarApi.init({appId, version, logToScreen: true});

  // create store with the viewar reducers
  const store = createStore(viewarReducers(), composeWithDevTools());

  const render = Component => {
    ReactDOM.render(
      <AppContainer>
          <Provider store={store}>
            <Component />
          </Provider>
      </AppContainer>,
      document.getElementById('app')
    );
  };

  render(App);

  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      render(App);
    });
  }
})();
