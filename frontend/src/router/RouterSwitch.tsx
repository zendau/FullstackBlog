import React, { lazy, useEffect } from 'react'
import { Redirect, Switch, Route, useHistory } from "react-router-dom"
import Navbar from "@/components/navbar/Navbar";
import { INavPaths, ITypeRoutes } from "@/interfaces/IRouter";
import { RenderRoute } from './RenderRoute';
import { useTypedSelector } from '@/hooks/useTypedSelector';
const ConfirmCode = lazy(() => import('@/pages/confirmAccount/cofirmAccount'))

interface IRouterSwitchProps {
  typeRoutes: ITypeRoutes[]
  redirect: string
  paths: INavPaths[]
  isPrivateType: boolean
  path: string
}

const RouterSwitch: React.FC<IRouterSwitchProps> = ({ redirect, typeRoutes, paths, isPrivateType, path }) => {

  const history = useHistory()
  const { isActivated, isAuth } = useTypedSelector(state => state.userState)

  useEffect(() => {
    
    history.push(path)
  }, [])

  
  console.log('test')
  if (!isActivated && isAuth) {
    return (<ConfirmCode/>)
  }
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
        <Redirect from="*" to={redirect} />
      </Switch>
    </>

  )
}

export default RouterSwitch;