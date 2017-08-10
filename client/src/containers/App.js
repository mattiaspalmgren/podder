import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { initialize } from '../actions';
import Register from '../containers/Register';
import Login from '../containers/Login';
import Explore from '../containers/Explore';
import Feed from '../containers/Feed';
import Mine from '../containers/Mine';
import RequireAuthentication from '../containers/RequireAuthentication';
import Header from '../components/Header';

class App extends Component {
  componentDidMount() {
    const { savedPodcasts, init } = this.props;
    const feedUrl = savedPodcasts[0].feedUrl;
    init('P3', feedUrl);
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div>
        { authenticated && <Header />}
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
  savedPodcasts: PropTypes.array.isRequired,
  init: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { savedPodcasts, auth: { authenticated } } = state;
  return { savedPodcasts, authenticated };
};

const mapDispatchToProps = dispatch => (
  {
    init: (searchTerm, feedUrl) => dispatch(initialize(searchTerm, feedUrl)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
