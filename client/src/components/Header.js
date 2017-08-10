import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';

const Header = ({ handleLogout }) => (
  <div className="header">
    <div className="grid">
      <div className="col col-12">
        <h1>Podder</h1>
      </div>
    </div>
    <Nav handleLogout={handleLogout} />
  </div>
);

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
