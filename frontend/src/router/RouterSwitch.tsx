import React, { lazy } from 'react'
import { Route, Switch } from "react-router-dom"
import Navbar from "@/components/navbar/Navbar";
import { INavPaths, IAppRoutes } from "@/interfaces/IRouter";
import { RenderRoute } from './RenderRoute';
import { useTypedSelector } from '@/hooks/useTypedSelector';
const ConfirmCode = lazy(() => import('@/pages/confirmAccount/cofirmAccount'))
import PageNotFound from '@/pages/errors/pageNotFound'

interface IRouterSwitchProps {
  appRoutes: IAppRoutes[]
  navbarPaths: INavPaths[]
  isPrivateType: boolean
}

const RouterSwitch: React.FC<IRouterSwitchProps> = ({ appRoutes, navbarPaths, isPrivateType }) => {


  const { isActivated, isAuth } = useTypedSelector(state => state.userState)


  if (!isActivated && isAuth) {
    return (<ConfirmCode/>)
  }
  return (
    <>
      <Navbar paths={navbarPaths} privateType={isPrivateType} />
      <Switch>
        {
          appRoutes.map(route =>
            <RenderRoute
              key={route.path}
              exact={route.exact}
              path={route.path}
              children={route.children}
              component={route.component}
            />)
        }
        <Route path='*' component={PageNotFound} />
      </Switch>
    </>

  )
}

export default RouterSwitch;