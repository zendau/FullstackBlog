import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Routes";

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { privatePaths, publicPaths } from "./NavPaths"
import RouterSwitch from "./RouterSwitch";
import { useAction } from '@/hooks/useAction';



const AppRouter: React.FC = () => {

  const { isAuth } = useTypedSelector(state => state.userState)


  const { checkAuth } = useAction()
  useEffect(() => {
    checkAuth()
  }, [])


  return (
    <Router>

      {isAuth
        ?
        <RouterSwitch privateType={true} typeRoutes={privateRoutes} redirect='/post/all' paths={privatePaths} />
        :
        <RouterSwitch privateType={false} typeRoutes={publicRoutes} redirect='/login' paths={publicPaths} />
      }

    </Router>
  )
}

export default AppRouter;