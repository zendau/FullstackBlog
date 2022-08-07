import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./config/Routes";

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { privatePaths, publicPaths } from "./config/NavPaths"
import RouterSwitch from "./RouterSwitch";
import { useAction } from '@/hooks/useAction';

import InternalServerError from '@/pages/errors/internalServerError';


const AppRouter: React.FC = () => {

  const { isAuth } = useTypedSelector(state => state.userState)

  const { checkAuth } = useAction()
  useEffect(() => {
    checkAuth()
  }, [])

  function checkAuthStatus() {
    if (isAuth === true) {
      return (<RouterSwitch isPrivateType={true} appRoutes={privateRoutes} navbarPaths={privatePaths} redirect='/post/all' />)
    } else if (isAuth === false) {
      return (<RouterSwitch isPrivateType={false} appRoutes={publicRoutes} navbarPaths={publicPaths} redirect='/login' />)
    } else {
      return (<InternalServerError/>)
    }
  }

  return (
    <Router>
      {checkAuthStatus()}
    </Router>
  )
}

export default AppRouter;