import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { initialize } from '../actions';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Register from '../containers/Register';
import Login from '../containers/Login';
import Explore from '../containers/Explore';
import Feed from '../containers/Feed';
import Mine from '../containers/Mine';

class App extends Component {
  componentDidMount() {
    const { savedPodcasts, init } = this.props;
    const feedUrl = savedPodcasts[0].feedUrl;
    init('P3', feedUrl);
  }

  render() {
    return (<div>
      <div className="header">
        <Header />
        <Nav />
      </div>
      <div className="wrapper">
        <Route exact path="/" render={() => (<Redirect to="/explore" push />)} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/feed" component={Feed} />
        <Route path="/explore" component={Explore} />
        <Route exact path="/mine" component={Mine} />
      </div>
    </div>
    );
  }
}

App.propTypes = {
  savedPodcasts: PropTypes.array.isRequired,
  init: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { savedPodcasts } = state;
  return { savedPodcasts };
};

const mapDispatchToProps = dispatch => (
  {
    init: (searchTerm, feedUrl) => dispatch(initialize(searchTerm, feedUrl)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
