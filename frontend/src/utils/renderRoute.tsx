import { ITypeRoutes } from "../interfaces/router";
import { Route } from "react-router-dom";
import React from "react";

export function renderRoute(route: ITypeRoutes) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      component={route.component}
      key={route.path}
    />)
}