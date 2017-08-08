import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import index from './index.scss'; // eslint-disable-line
import icons from './plugins/icons'; // eslint-disable-line
import configureStore from './configureStore';
import App from './containers/App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , document.getElementById('app'),
);
