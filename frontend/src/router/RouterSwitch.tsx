import React from 'react'
import { Redirect, Switch, Route } from "react-router-dom"
import Navbar from "@/components/navbar/Navbar";
import { INavPaths, ITypeRoutes } from "@/interfaces/IRouter";
import { RenderRoute } from './RenderRoute';
import NotFound from "@/components/404";


interface IRouterSwitchProps {
  typeRoutes: ITypeRoutes[]
  redirect: string
  paths: INavPaths[]
  isPrivateType: boolean
}

const RouterSwitch: React.FC<IRouterSwitchProps> = ({ redirect, typeRoutes, paths, isPrivateType }) => {


  return (
    <>
      <Navbar paths={paths} privateType={isPrivateType} />
      <Switch>
        {
          typeRoutes.map(route =>
            <RenderRoute
              key={route.path}
              exact={route.exact}
              path={route.path}
              children={route.children}
              component={route.component}
            />)
        }
        <Redirect exact from="/" to={redirect} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>

  )
}

export default RouterSwitch;