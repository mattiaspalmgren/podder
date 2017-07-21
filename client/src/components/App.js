import React, { Component } from 'react';
import fetchjsonp from 'fetch-jsonp';

import Header from './Header';
import PodcastListContainer from '../containers/PodcastListContainer';
import { NavLink } from 'react-router-dom'

const App = ({ location, match: { params } }) => (
  <div className="wrapper">
    <Header />
    
    <nav className="nav">
      <ul>
        <li> 
          <NavLink exact to={'/SHOW_ALL'} activeClassName={"nav__link--active"}>
            ALL
          </NavLink>
        </li>
        <li>
          <NavLink exact to={'/SHOW_SAVED'} activeClassName={"nav__link--active"}>
            MINE
          </NavLink>
        </li>
      </ul>
    </nav>

    <PodcastListContainer filter={params.filter || 'SHOW_ALL'} />
  </div>
)

export default App;
