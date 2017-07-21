import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import index from './index.scss';
import icons from './plugins/icons';
import podder from './reducers';
import Root from './components/Root'

let store = createStore(podder, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Root store={store} />
  ,document.getElementById('app')
);
