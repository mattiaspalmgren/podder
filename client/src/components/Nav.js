import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <nav className="nav">
    <ul>
      <li>
        <NavLink exact to={'/explore'} activeClassName={'nav__link--active'}>
          EXPLORE
        </NavLink>
      </li>
      <li>
        <NavLink exact to={'/mine'} activeClassName={'nav__link--active'}>
          MINE
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
