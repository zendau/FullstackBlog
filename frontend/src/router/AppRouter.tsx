import React, { useEffect } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Routes";

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { privatePaths, publicPaths } from "./NavPaths"
import RouterSwitch from "./RouterSwitch";
import { useAction } from '@/hooks/useAction';


import AllPost from '@/pages/post/allPosts'

const AppRouter: React.FC = () => {

  const { isAuth } = useTypedSelector(state => state.userState)


  const { checkAuth } = useAction()
  useEffect(() => {
    checkAuth()
  }, [])


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllPost />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default AppRouter;