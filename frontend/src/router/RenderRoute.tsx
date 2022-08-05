import React from 'react'
import { ITypeRoutes } from "@/interfaces/IRouter"
import { Route, Switch } from "react-router-dom"

const renderChildren = (childs: ITypeRoutes[]) => (
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

interface Props {
  route: ITypeRoutes
}

export const RenderRoute = (route: ITypeRoutes) => {
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