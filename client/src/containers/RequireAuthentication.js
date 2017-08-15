import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../plugins/history';

export default function (ComposedComponent) {
  class RequireAuthentication extends Component {

    componentWillMount() {
      const { authenticated } = this.props;
      if (!authenticated) {
        history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  RequireAuthentication.propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };

  function mapStateToProps(state) {
    return { authenticated: state.user.authenticated };
  }

  return connect(mapStateToProps)(RequireAuthentication);
}
