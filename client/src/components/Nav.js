import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Svg from './Svg';

const navigations = ['feed', 'explore', 'mine'];
const Nav = ({ handleLogout }) => (
  <div className="wrapper grid">
    <div className="col col-12 nav__container">
      <nav className="nav">
        <ul>
          {
            navigations.map(n => (
              <li key={n}>
                <NavLink exact to={`/${n}`} activeClassName={'nav__link--active'}>
                  {n.toUpperCase()}
                </NavLink>
              </li>
            ))
          }
        </ul>
        <span onClick={handleLogout}>
          <Svg color={'grey'} type={'exit'} />
        </span>
      </nav>
    </div>
  </div>
);

Nav.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Nav;
