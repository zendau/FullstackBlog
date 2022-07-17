import React, { useContext } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Routes";


import { privatePaths, publicPaths } from "./NavPaths"
import RouterSwitch from "./RouterSwitch";
import { AuthContext } from "../context/AuthContext";


const AppRouter: React.FC = () => {

  const { authStatus } = useContext(AuthContext)


  return (
    <Router>

      {authStatus
        ?
        <RouterSwitch privateType={true} typeRoutes={privateRoutes} redirect='/post/all' paths={privatePaths} />
        :
        <RouterSwitch privateType={false} typeRoutes={publicRoutes} redirect='/login' paths={publicPaths} />
      }

    </Router>
  )
}

export default AppRouter;