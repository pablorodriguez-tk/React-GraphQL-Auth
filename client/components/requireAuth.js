import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

export default (wrappedComponent) => {
  class RequireAuth extends Component {
    componentDidUpdate(NextProps) {
      if (!NextProps.data.user && !NextProps.data.loading) {
        hashHistory.push('/login');
      }
    }

    render() {
      return (
        <div>
          <wrappedComponent {...this.props} />
        </div>
      );
    }
  }
  return graphql(query)(RequireAuth);
};
