import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./config/Routes";

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { privatePaths, publicPaths } from "./config/NavPaths"
import RouterSwitch from "./RouterSwitch";
import { useAction } from '@/hooks/useAction';



const AppRouter: React.FC = () => {

  const { isAuth } = useTypedSelector(state => state.userState)
  
  
  const path = useMemo(() => window.location.pathname, [])
  const { checkAuth } = useAction()
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <Router>

      {isAuth
        ?
        <RouterSwitch isPrivateType={true} typeRoutes={privateRoutes} redirect='/post/all' paths={privatePaths} path={path} />
        :
        <RouterSwitch isPrivateType={false} typeRoutes={publicRoutes} redirect='/login' paths={publicPaths} path={path} />
      }

    </Router>
  )
}

export default AppRouter;