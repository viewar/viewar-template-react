import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import viewarApi from 'viewar-api';
import { viewarReducers } from './lib/viewar-react';

import App from './containers/App';

import './index.scss';

(async () => {
  // initialize the ViewAR API
  const api = await viewarApi.init({ logToScreen: true });

  // create store with the viewar reducers
  const store = createStore(viewarReducers(), composeWithDevTools());

  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <Component />
      </Provider>,
      document.getElementById('app')
    );
  };

  render(App);

  if (module.hot) {
    module.hot.accept(App, () => {
      render(App);
    });
  }
})();
