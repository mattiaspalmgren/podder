import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions';

function validate(formProps) {
  const errors = {};
  if (!formProps.email) { errors.email = 'Please enter an email'; }
  if (!formProps.password) { errors.password = 'Please enter a password'; }
  return errors;
}

const form = reduxForm({
  form: 'login',
  validate,
});

const renderField = (field) => {
  const inputClasses = classNames(
    'form__field col col-10', {
      'form__field--invalid': field.meta.touched && field.meta.error,
    });
  return (
    <div className="grid grid-center">
      <input
        className={inputClasses}
        {...field.input}
        placeholder={field.placeholder}
        type={field.type}
      />
    </div>
  );
};

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    const { loginUser: handleloginUser } = this.props;
    handleloginUser(formProps);
  }

  render() {
    const {
      anyTouched,
      valid,
      handleSubmit, // redux-form own submit handler
      errorMessage,
    } = this.props;

    const submitClasses = classNames(
    'col col-10 form__submit', {
      'form__submit--disable': anyTouched && !valid,
    });
    return (
      <div className="grid grid-middle grid--column">
        <form className="form col col-6" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <h1>Podder</h1>
          <Field name="email" component={renderField} type="text" placeholder={'Email'} />
          <Field name="password" component={renderField} type="password" placeholder="Password" />
          <div className="grid grid-center">
            <button className={submitClasses} disabled={anyTouched && !valid} type="submit">
                Login
            </button>
          </div>
          { errorMessage &&
            <div className="form__error">
              <span>{errorMessage}</span>
            </div>
          }
        </form>
        <div className="col col-6 opposite-action">
          Not registered yet? <NavLink exact to={'/register'}> Register </NavLink>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  anyTouched: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};


const mapStateToProps = state => (
  {
    errorMessage: state.user.error,
    message: state.user.message,
  }
);

export default connect(mapStateToProps, { loginUser })(form(Login));
