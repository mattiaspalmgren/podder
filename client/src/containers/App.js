import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { initialize } from '../actions';
import { logoutUser } from '../actions/authenticationActions';
import Register from '../containers/Register';
import Login from '../containers/Login';
import Explore from '../containers/Explore';
import Feed from '../containers/Feed';
import Mine from '../containers/Mine';
import RequireAuthentication from '../containers/RequireAuthentication';
import Header from '../components/Header';

class App extends Component {
  componentDidMount() {
    const { init } = this.props;
    init('P3', 'http://api.sr.se/api/rss/pod/3966');
  }

  render() {
    const { authenticated, logout } = this.props;
    return (
      <div>
        { authenticated && <Header handleLogout={logout} />}
        <div className="wrapper">
          <Route exact path="/" render={() => (<Redirect to="/explore" push />)} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/feed" component={RequireAuthentication(Feed)} />
          <Route path="/explore" component={RequireAuthentication(Explore)} />
          <Route exact path="/mine" component={RequireAuthentication(Mine)} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  init: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth: { authenticated } } = state;
  return { authenticated };
};

const mapDispatchToProps = dispatch => (
  {
    init: (searchTerm, feedUrl) => dispatch(initialize(searchTerm, feedUrl)),
    logout: () => dispatch(logoutUser()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
