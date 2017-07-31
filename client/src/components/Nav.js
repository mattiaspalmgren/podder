import React from 'react';
import { NavLink } from 'react-router-dom';

const navigations = ['feed', 'explore', 'mine'];
const Nav = () => (
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
      </nav>
    </div>
  </div>
);

export default Nav;
