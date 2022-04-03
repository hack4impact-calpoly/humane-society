import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ children, path, exact }) {
  const isAuthenticated = () => {
    const userID = sessionStorage.getItem('userID');
    if (userID === null) {
      return (<Redirect to="/login" />);
    }
    return (children);
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={() => (isAuthenticated())}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  exact: false,
};
