import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { fetchPodcasts } from '../actions/podcastActions';
import { getUser, logoutUser } from '../actions/userActions';
import Register from '../containers/Register';
import Login from '../containers/Login';
import Explore from '../containers/Explore';
import Feed from '../containers/Feed';
import Mine from '../containers/Mine';
import RequireAuthentication from '../containers/RequireAuthentication';
import Header from '../components/Header';

class App extends Component {
  componentDidMount() {
    const { initPodcasts, initUser, authenticated } = this.props;
    if (authenticated) {
      initUser();
    }
    initPodcasts('P3');
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
  initPodcasts: PropTypes.func.isRequired,
  initUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { user: { authenticated } } = state;
  return { authenticated };
};

const mapDispatchToProps = dispatch => (
  {
    initPodcasts: searchTerm => dispatch(fetchPodcasts(searchTerm)),
    initUser: () => dispatch(getUser()),
    logout: () => dispatch(logoutUser()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
