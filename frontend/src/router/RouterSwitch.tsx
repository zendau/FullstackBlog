import React from 'react'
import { Redirect, Switch, Route } from "react-router-dom"
import Navbar from "../components/navbar/Navbar";
import { INavPaths, ITypeRoutes } from "../interfaces/router";
import { renderRoute } from "../utils/renderRoute"
import NotFound from "../components/404";


interface IRouterSwitchProps {
  typeRoutes: ITypeRoutes[]
  redirect: string
  paths: INavPaths[]
  privateType: boolean
}

const RouterSwitch: React.FC<IRouterSwitchProps> = ({ redirect, typeRoutes, paths, privateType }) => {


  return (
    <>
      <Navbar paths={paths} privateType={privateType} />
      <Switch>
        {
          typeRoutes.map(route => renderRoute(route))
        }
        <Redirect exact from="/" to={redirect} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>

  )
}

export default RouterSwitch;