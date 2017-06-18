import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const {  } = props;
  
  return (
    <div className="grid">
      <div className="col col-12">
        <h1>Podder</h1>
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Feed</Link></li>
              <li><Link to='/explore'>Explore</Link></li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
