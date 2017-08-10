import React from 'react';
import Nav from '../components/Nav';

const Header = () => (
  <div className="header">
    <div className="grid">
      <div className="col col-12">
        <h1>Podder</h1>
      </div>
    </div>
    <Nav />
  </div>
);

export default Header;
