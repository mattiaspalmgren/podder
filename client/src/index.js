import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import index from './index.scss'; // eslint-disable-line
import icons from './plugins/icons'; // eslint-disable-line
import podder from './reducers';
import Root from './components/Root';

const store = createStore(
  podder,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Root store={store} />
  , document.getElementById('app'),
);
