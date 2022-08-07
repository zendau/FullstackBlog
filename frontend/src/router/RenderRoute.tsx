import React from 'react'
import { IAppRoutes } from "@/interfaces/IRouter"
import { Route, Switch } from "react-router-dom"

const renderChildren = (childs: IAppRoutes[]) => (
  <Switch>
    {
      childs.map((route) =>
        <RenderRoute
          key={route.path}
          exact={route.exact}
          path={route.path}
          children={route.children}
          component={route.component}
        />)
    }
  </Switch>
)

export const RenderRoute = (route: IAppRoutes) => {
  return (
    <>
      {route.children
        ? renderChildren(route.children)
        :
        <Route
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      }
    </>
  )
}