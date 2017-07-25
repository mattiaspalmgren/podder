import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Header from './Header';
import PodcastListContainer from '../containers/PodcastListContainer';

const App = ({ match: { params } }) => (
  <div className="wrapper">
    <Header />

    <nav className="nav">
      <ul>
        <li>
          <NavLink exact to={'/feed'} activeClassName={'nav__link--active'}>
            FEED
          </NavLink>
        </li>
        <li>
          <NavLink exact to={'/'} activeClassName={'nav__link--active'}>
            EXPLORE
          </NavLink>
        </li>
        <li>
          <NavLink exact to={'/SHOW_SAVED'} activeClassName={'nav__link--active'}>
            MINE
          </NavLink>
        </li>
      </ul>
    </nav>

    <PodcastListContainer filter={params.filter} />
  </div>
);

App.propTypes = {
  match: PropTypes.object.isRequired,
};

export default App;
