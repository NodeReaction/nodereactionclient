import React, { Component } from "react";
import authService from "./AuthService.js";
import { Route, Redirect } from "react-router-dom";

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

const PrivateRoute = ({ component, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return authService.isAuthenticated ? (
          renderMergedProps(component, routeProps, rest)
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export { PropsRoute, PrivateRoute };
