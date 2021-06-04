import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import Header from './Header';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({ variables: { email, password }, refetchQueries: [{ query }] })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className="container">
        <div>
          <Header />
        </div>
        <div>
          <h3>Sign Up</h3>
          <AuthForm
            errors={this.state.errors}
            onSubmit={this.onSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default graphql(mutation)(SignupForm);